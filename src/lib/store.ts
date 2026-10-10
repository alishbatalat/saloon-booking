import { promises as fs } from "fs";
import path from "path";

import { getBookingService, getBookingStylist, stylistsFor } from "@/data/booking";
import { openSlots } from "@/lib/availability";
import { referenceCode } from "@/lib/booking-format";

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
};

export class StoreError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

type StoreData = {
  appointments: Appointment[];
  messages: ContactMessage[];
};

const filePath = path.join(process.cwd(), "data", "store.json");

async function readStore(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return { appointments: [], messages: [], ...JSON.parse(raw) };
  } catch {
    return { appointments: [], messages: [] };
  }
}

async function writeStore(data: StoreData) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

let chain: Promise<unknown> = Promise.resolve();

function updateStore<T>(mutator: (data: StoreData) => T | Promise<T>) {
  const run = chain.then(async () => {
    const data = await readStore();
    const result = await mutator(data);
    await writeStore(data);
    return result;
  });
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function overlaps(startA: string, durationA: number, startB: string, durationB: number) {
  const [aHour, aMinute] = startA.split(":").map(Number);
  const [bHour, bMinute] = startB.split(":").map(Number);
  const a = aHour * 60 + aMinute;
  const b = bHour * 60 + bMinute;
  return a < b + durationB && b < a + durationA;
}

function busyAppointments(data: StoreData, stylistId: string, date: string) {
  return data.appointments.filter(
    (appointment) =>
      appointment.stylistId === stylistId &&
      appointment.date === date &&
      appointment.status !== "cancelled",
  );
}

export async function getAppointmentByReference(reference: string) {
  const data = await readStore();
  return data.appointments.find((appointment) => appointment.reference === reference) ?? null;
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

  const data = await readStore();
  const slots = openSlots(input.locationId, input.date, service.duration);
  return slots.filter((slot) =>
    candidates.some((stylist) =>
      busyAppointments(data, stylist.id, input.date).every((appointment) => {
        const booked = getBookingService(appointment.serviceId);
        if (!booked) return true;
        return !overlaps(slot, service.duration, appointment.time, booked.duration);
      }),
    ),
  );
}

function assertSlotOpen(data: StoreData, stylistId: string, date: string, time: string, duration: number) {
  const conflict = busyAppointments(data, stylistId, date).some((appointment) => {
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

  return updateStore((data) => {
    let stylistId = input.stylistId;
    if (stylistId === "any") {
      const match = stylistsFor(input.locationId, input.serviceId).find((stylist) => {
        try {
          assertSlotOpen(data, stylist.id, input.date, input.time, service.duration);
          return true;
        } catch {
          return false;
        }
      });
      if (!match) throw new StoreError("That time was just taken. Choose another.", 409);
      stylistId = match.id;
    } else {
      const stylist = getBookingStylist(stylistId);
      if (!stylist || stylist.locationId !== input.locationId || !stylist.serviceIds.includes(service.id)) {
        throw new StoreError("That artist does not offer this service at the chosen studio.");
      }
      assertSlotOpen(data, stylistId, input.date, input.time, service.duration);
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
    data.appointments.push(appointment);
    return appointment;
  });
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

  return updateStore((data) => {
    if (!data.messages) data.messages = [];
    const entry: ContactMessage = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      studio,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };
    data.messages.push(entry);
    return entry;
  });
}
