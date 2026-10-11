import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { bookingLocations, bookingStylists } from "@/data/booking";
import { images } from "@/data/home";

export const metadata: Metadata = {
  title: "Team — Orielle",
  description: "Meet the artists at Orielle Wilshire and Silver Lake.",
};

const groups = [
  {
    title: "Wilshire",
    locationId: "wilshire",
  },
  {
    title: "Silver Lake",
    locationId: "silver-lake",
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.portrait} alt="Orielle artist" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Artists + staff</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">The team</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            Seven people, two rooms. Everyone on the book has a craft — not a rotation. Choose an artist when you book, or leave it open.
          </p>
        </Reveal>
      </section>

      {groups.map((group) => {
        const location = bookingLocations.find((item) => item.id === group.locationId);
        const artists = bookingStylists.filter((stylist) => stylist.locationId === group.locationId);
        return (
          <section key={group.locationId} className="mx-auto max-w-[1200px] px-6 pb-24">
            <Reveal>
              <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">{location?.neighborhood}</p>
              <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">{group.title}</h2>
              <p className="mt-4 max-w-2xl leading-8">{location?.blurb}</p>
            </Reveal>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {artists.map((artist, index) => (
                <li key={artist.id}>
                  <Reveal delay={0.04 * index}>
                    <Link href={`/team/${artist.id}`} className="group block">
                      <div className="relative min-h-[360px] overflow-hidden bg-stone">
                        <Image
                          src={artist.image}
                          alt={artist.alt}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-bronze">{artist.role}</p>
                      <h3 className="mt-2 font-serif text-3xl uppercase tracking-tight text-ink group-hover:text-bronze">
                        {artist.name}
                      </h3>
                      <p className="mt-2 text-sm">{artist.experience}</p>
                      <span className="mt-4 inline-block text-[12px] uppercase tracking-[0.18em] text-ink">View profile</span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="bg-stone">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
          <h2 className="mt-4 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Book with someone you trust</h2>
          <p className="mt-5 leading-8">Pick the artist in the booking flow, or let the desk place you with the next open chair.</p>
          <a
            href="/booking"
            className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
          >
            Book an appointment
          </a>
        </div>
      </section>
    </>
  );
}
