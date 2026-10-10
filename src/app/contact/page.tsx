import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { hours, images, locations } from "@/data/home";

export const metadata: Metadata = {
  title: "Contact — Orielle",
  description: "Reach Orielle at Wilshire or Silver Lake, or write the desk with a question.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.salon} alt="Orielle salon floor" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">The desk</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">Contact</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            Call the room you want, write the desk, or book online. Same-day changes are easiest by phone — the book moves quickly after ten.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-16 px-6 pb-24 md:grid-cols-[0.95fr_1.05fr] md:gap-20">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reach us</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Studios & desk</h2>

          <div className="mt-10 space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-bronze">General</p>
              <a href="mailto:hello@orielle.studio" className="mt-2 block font-serif text-2xl text-ink hover:text-bronze">
                hello@orielle.studio
              </a>
              <p className="mt-2 text-sm leading-7">
                Press, careers, and questions that are not for a specific chair.
              </p>
            </div>

            {locations.map((location) => (
              <div key={location.slug}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-bronze">{location.neighborhood}</p>
                <h3 className="mt-2 font-serif text-2xl uppercase text-ink">{location.name.replace("Visit ", "")}</h3>
                <p className="mt-3 text-sm leading-7">
                  {location.address}
                  <br />
                  <a href={`tel:${location.phone.replace(/\D/g, "")}`} className="text-ink hover:text-bronze">
                    {location.phone}
                  </a>
                  <br />
                  <a href={`mailto:${location.email}`} className="hover:text-ink">
                    {location.email}
                  </a>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.18em] text-bronze">Working hours</p>
            <ul className="mt-4">
              {hours.map(([day, time]) => (
                <li key={day} className="grid grid-cols-[1fr_auto] gap-6 border-b border-line py-3 text-sm">
                  <span>{day}</span>
                  <span className="text-ink">{time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">Silver Lake opens at 9:00 AM on Saturdays.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Write</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Send a message</h2>
          <p className="mt-4 leading-8">
            For a new appointment,{" "}
            <a href="/booking" className="text-ink underline decoration-line underline-offset-4 hover:text-bronze">
              book online
            </a>
            . Use the form for questions the desk can answer by email.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-stone">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Visit</p>
            <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Find the room</h2>
            <p className="mt-5 leading-8">
              Maps, parking, and what each studio offers are on the locations page.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
              href="/locations"
              className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
            >
              Locations
            </a>
            <a
              href="/booking"
              className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
            >
              Book now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
