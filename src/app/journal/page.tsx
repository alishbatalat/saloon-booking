import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { images, notes } from "@/data/home";

export const metadata: Metadata = {
  title: "Journal — Orielle",
  description: "Notes from Orielle on color, the barbershop chair, and studio hours.",
};

export default function JournalPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.salon} alt="Orielle salon" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">From the desk</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">Journal</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            Short notes on color that lasts, the hot towel chair, and the quieter hours in both studios. We write rarely.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="grid gap-12 md:grid-cols-3">
          {notes.map((note, index) => (
            <Reveal key={note.slug} delay={index * 0.06}>
              <Link href={`/journal/${note.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={note.image}
                    alt={note.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.2em]">
                  {note.category}
                  <span className="mx-2">/</span>
                  {note.date}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-ink transition group-hover:text-bronze">
                  {note.title}
                </h2>
                <p className="mt-3 text-sm leading-7">{note.excerpt}</p>
                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.18em] text-ink">Read</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-stone">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
          <h2 className="mt-4 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Book from the note</h2>
          <p className="mx-auto mt-5 max-w-xl leading-8">
            Ready for a gloss, a shave, or a quieter Sunday hour? Book online or call the studio that fits.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/booking" className="inline-flex min-h-12 min-w-52 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white">
              Book online
            </a>
            <a href="tel:3235550148" className="inline-flex min-h-12 min-w-52 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white">
              Wilshire · 555-0148
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
