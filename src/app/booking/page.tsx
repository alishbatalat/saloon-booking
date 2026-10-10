import type { Metadata } from "next";

import { BookingWizard } from "@/components/booking-wizard";

export const metadata: Metadata = {
  title: "Book — Orielle",
  description: "Book a salon or barbershop appointment at Orielle Wilshire or Silver Lake.",
};

type Props = {
  searchParams: Promise<{ location?: string; service?: string }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const params = await searchParams;
  return <BookingWizard initialLocationId={params.location || ""} initialServiceId={params.service || ""} />;
}
