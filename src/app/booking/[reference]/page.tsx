import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBookingLocation, getBookingService, getBookingStylist } from "@/data/booking";
import { durationLabel, formatDate, formatTime, money } from "@/lib/booking-format";
import { getAppointmentByReference } from "@/lib/store";

type Props = {
  params: Promise<{ reference: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reference } = await params;
  return { title: `Booking ${reference.toUpperCase()} — Orielle` };
}

export default async function BookingConfirmationPage({ params }: Props) {
  const { reference } = await params;
  const appointment = await getAppointmentByReference(reference.toUpperCase());
  if (!appointment) notFound();

  const service = getBookingService(appointment.serviceId);
  const stylist = getBookingStylist(appointment.stylistId);
  const location = getBookingLocation(appointment.locationId);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
      <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Confirmed</p>
      <h1 className="mt-4 font-serif text-5xl uppercase tracking-tight text-ink md:text-6xl">You are on the book</h1>
      <p className="mx-auto mt-5 max-w-xl leading-8">
        Keep this reference for the desk. Pay for the visit when you arrive.
      </p>

      <div className="mt-12 border border-line bg-stone px-6 py-10 text-left">
        <p className="text-[12px] uppercase tracking-[0.22em] text-bronze">Reference</p>
        <p className="mt-2 font-serif text-4xl text-ink">{appointment.reference}</p>
        <dl className="mt-8 space-y-4 text-sm">
          <div className="flex justify-between gap-6 border-b border-line py-3">
            <dt>Studio</dt>
            <dd className="text-ink">{location?.name}</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-line py-3">
            <dt>Service</dt>
            <dd className="text-right text-ink">
              {service?.name}
              {service ? (
                <span className="mt-1 block text-muted">
                  {durationLabel(service.duration)} · {money(service.price, service.priceMax)}
                </span>
              ) : null}
            </dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-line py-3">
            <dt>Artist</dt>
            <dd className="text-ink">{stylist?.name}</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-line py-3">
            <dt>When</dt>
            <dd className="text-right text-ink">
              {formatDate(appointment.date)}
              <span className="mt-1 block">{formatTime(appointment.time)}</span>
            </dd>
          </div>
          <div className="flex justify-between gap-6 py-3">
            <dt>Guest</dt>
            <dd className="text-right text-ink">
              {appointment.guest.name}
              <span className="mt-1 block text-muted">{appointment.guest.email}</span>
              <span className="mt-1 block text-muted">{appointment.guest.phone}</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 min-w-44 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
        >
          Back home
        </Link>
        <a
          href={location ? `tel:${location.phone.replace(/\D/g, "")}` : "/locations"}
          className="inline-flex min-h-12 min-w-44 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white"
        >
          Call the studio
        </a>
      </div>
    </section>
  );
}
