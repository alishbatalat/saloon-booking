import { getBookingService, getBookingStylist, stylistsFor } from "@/data/booking";
import { openSlots } from "@/lib/availability";
import { referenceCode } from "@/lib/booking-format";
import { supabase } from "@/lib/supabase";

export type Appointment = {
  id: string;
  reference: string;
  serviceId: string;
  stylistId: string;
  locationId: string;
  date: string;
  time: string;
  guest: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  amount: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  studio: string;
  subject: string;
  message: string;
  createdAt: string;
  approved: boolean;
  approvedAt: string | null;
};

export class StoreError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

type AppointmentRow = {
  id: string;
  reference: string;
  service_id: string;
  stylist_id: string;
  location_id: string;
  date: string;
  time: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_notes: string;
  amount: number;
  status: string;
  created_at: string;
};

type MessageRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  studio: string;
  subject: string;
  message: string;
  created_at: string;
  approved: boolean;
  approved_at: string | null;
};

function rowToMessage(row: MessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    studio: row.studio,
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at,
    approved: row.approved,
    approvedAt: row.approved_at,
  };
}

function rowToAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    reference: row.reference,
    serviceId: row.service_id,
    stylistId: row.stylist_id,
    locationId: row.location_id,
    date: row.date,
    time: row.time,
    guest: {
      name: row.guest_name,
      email: row.guest_email,
      phone: row.guest_phone,
      notes: row.guest_notes,
    },
    amount: Number(row.amount),
    status: row.status as Appointment["status"],
    createdAt: row.created_at,
  };
}

function overlaps(startA: string, durationA: number, startB: string, durationB: number) {
  const [aHour, aMinute] = startA.split(":").map(Number);
  const [bHour, bMinute] = startB.split(":").map(Number);
  const a = aHour * 60 + aMinute;
  const b = bHour * 60 + bMinute;
  return a < b + durationB && b < a + durationA;
}

async function busyAppointments(stylistId: string, date: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("stylist_id", stylistId)
    .eq("date", date)
    .neq("status", "cancelled");
  if (error) throw new StoreError("Could not read the schedule.", 500);
  return (data as AppointmentRow[]).map(rowToAppointment);
}

export async function getAppointmentByReference(reference: string) {
  const { data, error } = await supabase.from("appointments").select("*").eq("reference", reference).maybeSingle();
  if (error) throw new StoreError("Could not read the appointment.", 500);
  return data ? rowToAppointment(data as AppointmentRow) : null;
}

export async function availableTimes(input: {
  locationId: string;
  serviceId: string;
  stylistId: string;
  date: string;
}) {
  const service = getBookingService(input.serviceId);
  if (!service) throw new StoreError("Choose a service.");
  if (!service.locations.includes(input.locationId)) {
    throw new StoreError("That service is not offered at this studio.");
  }

  const candidates =
    input.stylistId === "any"
      ? stylistsFor(input.locationId, input.serviceId)
      : stylistsFor(input.locationId, input.serviceId).filter((stylist) => stylist.id === input.stylistId);

  if (!candidates.length) throw new StoreError("No artist at this studio offers that service.");

  const slots = openSlots(input.locationId, input.date, service.duration);
  const busyByStylist = await Promise.all(
    candidates.map(async (stylist) => ({ stylist, busy: await busyAppointments(stylist.id, input.date) })),
  );

  return slots.filter((slot) =>
    busyByStylist.some(({ busy }) =>
      busy.every((appointment) => {
        const booked = getBookingService(appointment.serviceId);
        if (!booked) return true;
        return !overlaps(slot, service.duration, appointment.time, booked.duration);
      }),
    ),
  );
}

async function assertSlotOpen(stylistId: string, date: string, time: string, duration: number) {
  const busy = await busyAppointments(stylistId, date);
  const conflict = busy.some((appointment) => {
    const booked = getBookingService(appointment.serviceId);
    return booked ? overlaps(time, duration, appointment.time, booked.duration) : false;
  });
  if (conflict) throw new StoreError("That time was just taken. Choose another.", 409);
}

export async function createAppointment(input: {
  serviceId: string;
  stylistId: string;
  locationId: string;
  date: string;
  time: string;
  guest: Appointment["guest"];
}) {
  const service = getBookingService(input.serviceId);
  if (!service) throw new StoreError("Choose a service.");
  if (!service.locations.includes(input.locationId)) {
    throw new StoreError("That service is not offered at this studio.");
  }

  const slots = openSlots(input.locationId, input.date, service.duration);
  if (!slots.includes(input.time)) throw new StoreError("That time is outside studio hours.");

  if (!input.guest.name.trim() || input.guest.name.trim().length < 2) {
    throw new StoreError("Enter your name.");
  }
  if (!input.guest.email.includes("@")) throw new StoreError("Enter a valid email.");
  if (input.guest.phone.trim().length < 7) throw new StoreError("Enter a phone number.");

  // Supabase is a remote API, so unlike the old synchronous SQLite store there's a real (small)
  // network-round-trip gap between this check and the insert below. Acceptable at this app's scale.
  let stylistId = input.stylistId;
  if (stylistId === "any") {
    let match: string | null = null;
    for (const stylist of stylistsFor(input.locationId, input.serviceId)) {
      try {
        await assertSlotOpen(stylist.id, input.date, input.time, service.duration);
        match = stylist.id;
        break;
      } catch {
        continue;
      }
    }
    if (!match) throw new StoreError("That time was just taken. Choose another.", 409);
    stylistId = match;
  } else {
    const stylist = getBookingStylist(stylistId);
    if (!stylist || stylist.locationId !== input.locationId || !stylist.serviceIds.includes(service.id)) {
      throw new StoreError("That artist does not offer this service at the chosen studio.");
    }
    await assertSlotOpen(stylistId, input.date, input.time, service.duration);
  }

  const appointment: Appointment = {
    id: crypto.randomUUID(),
    reference: referenceCode(),
    serviceId: service.id,
    stylistId,
    locationId: input.locationId,
    date: input.date,
    time: input.time,
    guest: {
      name: input.guest.name.trim(),
      email: input.guest.email.trim().toLowerCase(),
      phone: input.guest.phone.trim(),
      notes: input.guest.notes.trim(),
    },
    amount: service.price,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase.from("appointments").insert({
    id: appointment.id,
    reference: appointment.reference,
    service_id: appointment.serviceId,
    stylist_id: appointment.stylistId,
    location_id: appointment.locationId,
    date: appointment.date,
    time: appointment.time,
    guest_name: appointment.guest.name,
    guest_email: appointment.guest.email,
    guest_phone: appointment.guest.phone,
    guest_notes: appointment.guest.notes,
    amount: appointment.amount,
    status: appointment.status,
    created_at: appointment.createdAt,
  });
  if (error) throw new StoreError("Could not save the appointment.", 500);

  return appointment;
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  phone: string;
  studio: string;
  subject: string;
  message: string;
}) {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const studio = input.studio.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (name.length < 2) throw new StoreError("Enter your name.");
  if (!email.includes("@")) throw new StoreError("Enter a valid email.");
  if (message.length < 10) throw new StoreError("Write a little more so we can help.");
  if (!subject) throw new StoreError("Choose a subject.");

  const entry: ContactMessage = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    studio,
    subject,
    message,
    createdAt: new Date().toISOString(),
    approved: false,
    approvedAt: null,
  };

  const { error } = await supabase.from("messages").insert({
    id: entry.id,
    name: entry.name,
    email: entry.email,
    phone: entry.phone,
    studio: entry.studio,
    subject: entry.subject,
    message: entry.message,
    created_at: entry.createdAt,
    approved: false,
    approved_at: null,
  });
  if (error) throw new StoreError("Could not send the message.", 500);

  return entry;
}

export async function listAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
  if (error) throw new StoreError("Could not read appointments.", 500);
  return (data as AppointmentRow[]).map(rowToAppointment);
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  if (error) throw new StoreError("Could not read messages.", 500);
  return (data as MessageRow[]).map(rowToMessage);
}

export async function getContactMessage(id: string): Promise<ContactMessage | null> {
  const { data, error } = await supabase.from("messages").select("*").eq("id", id).maybeSingle();
  if (error) throw new StoreError("Could not read the message.", 500);
  return data ? rowToMessage(data as MessageRow) : null;
}

export async function approveContactMessage(id: string): Promise<ContactMessage> {
  const existing = await getContactMessage(id);
  if (!existing) throw new StoreError("Message not found.", 404);

  const approvedAt = new Date().toISOString();
  const { error } = await supabase.from("messages").update({ approved: true, approved_at: approvedAt }).eq("id", id);
  if (error) throw new StoreError("Could not approve the message.", 500);

  return { ...existing, approved: true, approvedAt };
}
