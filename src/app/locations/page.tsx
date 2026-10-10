import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { hours, images, locations } from "@/data/home";

export const metadata: Metadata = {
  title: "Locations — Orielle",
  description: "Visit Orielle at Wilshire in Beverly Grove or Silver Lake on Sunset Boulevard.",
};

export default function LocationsPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.wilshire} alt="Orielle Wilshire" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Los Angeles</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">Locations</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            Two studios, one book. Wilshire is the full room — salon, barber, makeup, and nails. Silver Lake is cuts, color, and the gentlemen’s chairs on Sunset.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1200px] space-y-24 px-6 pb-24">
        {locations.map((location, index) => (
          <article key={location.slug} id={location.slug} className="scroll-mt-28">
            <div className={`grid items-center gap-12 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <div className="relative min-h-[420px] overflow-hidden bg-stone md:min-h-[520px]">
                  <Image src={location.image} alt={location.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">{location.neighborhood}</p>
                <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">
                  {location.name.replace("Visit ", "")}
                </h2>
                <p className="mt-5 leading-8">{location.blurb}</p>
                <dl className="mt-8 space-y-5 text-sm leading-7">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-bronze">Address</dt>
                    <dd className="mt-1 text-ink">{location.address}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-bronze">Phone</dt>
                    <dd className="mt-1">
                      <a href={`tel:${location.phone.replace(/\D/g, "")}`} className="text-ink hover:text-bronze">
                        {location.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-bronze">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${location.email}`} className="text-ink hover:text-bronze">
                        {location.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-bronze">In this room</dt>
                    <dd className="mt-1 text-ink">{location.services.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-bronze">Parking</dt>
                    <dd className="mt-1 text-ink">{location.parking}</dd>
                  </div>
                </dl>
                <a
                  href={`tel:${location.phone.replace(/\D/g, "")}`}
                  className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
                >
                  Call this studio
                </a>
              </Reveal>
            </div>
            <div className="mt-10 overflow-hidden border border-line">
              <iframe
                title={`Map of Orielle ${location.name.replace("Visit ", "")}`}
                src={location.mapEmbed}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </section>

      <section className="bg-stone">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The week</p>
            <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Working hours</h2>
            <ul className="mt-8">
              {hours.map(([day, time]) => (
                <li key={day} className="grid grid-cols-[1fr_auto] gap-6 border-b border-line py-4">
                  <span className="font-serif text-2xl text-ink">{day}</span>
                  <span className="text-ink">{time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">Silver Lake opens at 9:00 AM on Saturdays.</p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
            <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Book the room you want</h2>
            <p className="mt-5 leading-8">
              Makeup and nails stay at Wilshire. Silver Lake is cuts, color, and the barber chairs. Mention “first visit” when you call for twenty percent off the starting price.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/menu" className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white">
                The menu
              </a>
              <a href="/booking" className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white">
                Book now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
