import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import {
  bookingLocations,
  bookingServices,
  bookingStylists,
  getBookingStylist,
} from "@/data/booking";
import { money } from "@/lib/booking-format";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return bookingStylists.map((stylist) => ({ id: stylist.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artist = getBookingStylist(id);
  if (!artist) return { title: "Team — Orielle" };
  return {
    title: `${artist.name} — Orielle`,
    description: `${artist.role} at Orielle ${artist.locationId === "wilshire" ? "Wilshire" : "Silver Lake"}.`,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { id } = await params;
  const artist = getBookingStylist(id);
  if (!artist) notFound();

  const location = bookingLocations.find((item) => item.id === artist.locationId);
  const services = bookingServices.filter((service) => artist.serviceIds.includes(service.id));

  return (
    <>
      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24">
        <Reveal>
          <div className="relative min-h-[480px] overflow-hidden bg-stone md:min-h-[620px]">
            <Image src={artist.image} alt={artist.alt} fill priority className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">{artist.role}</p>
          <h1 className="mt-3 font-serif text-5xl uppercase tracking-tight text-ink md:text-6xl">{artist.name}</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ink">
            {location?.name} · {artist.experience}
          </p>
          <div className="mt-8 space-y-5 leading-8">
            {artist.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/booking?location=${artist.locationId}&stylist=${artist.id}`}
              className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill"
            >
              Book with {artist.name.split(" ")[0]}
            </a>
            <Link
              href="/team"
              className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill"
            >
              All artists
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-stone">
        <div className="mx-auto max-w-[900px] px-6 py-20">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">On their book</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Services & starting prices</h2>
          <ul className="mt-10">
            {services.map((service) => (
              <li key={service.id} className="grid gap-2 border-b border-line py-5 md:grid-cols-[1fr_auto_auto] md:items-end md:gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-ink">{service.name}</h3>
                  <p className="mt-1 text-sm">{service.summary}</p>
                </div>
                <span className="text-sm uppercase tracking-[0.14em]">{service.duration} min</span>
                <span className="text-ink">{money(service.price, service.priceMax)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
