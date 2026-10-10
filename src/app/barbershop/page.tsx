import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { images, menuGroups } from "@/data/home";

export const metadata: Metadata = {
  title: "Barbershop — Orielle",
  description: "Cuts, fades, hot-towel shaves, and beard work at Orielle Wilshire and Silver Lake.",
};

const barberGroups = menuGroups.filter((group) => group.category === "Barbershop");

const rituals = [
  ["01", "The consultation", "Tell us how you wear it on day three, not only how it looks under the dryer."],
  ["02", "The cut", "Scissors, clippers, or both. The neckline is finished before you leave the chair."],
  ["03", "The towels", "Hot towels for shaves and beards. Steam first, razor second, never the other way around."],
];

export default function BarbershopPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.barber} alt="Barber finishing a cut" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Wilshire & Silver Lake</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">Barbershop</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The chair</p>
          <h2 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-tight text-ink md:text-5xl">
            The gentlemen’s chair, and anyone who wants it
          </h2>
          <p className="mt-6 leading-8">
            Fades, scissor cuts, hot-towel shaves, and beards with a proper outline. Julien keeps the Wilshire chairs. Mateo and Iris keep Silver Lake. You do not need to be anyone in particular to sit down.
          </p>
          <p className="mt-4 leading-8">
            Both rooms keep the same book. If you want a gloss and a clean shave in one visit, ask for Iris at Silver Lake.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative min-h-[480px] overflow-hidden bg-stone">
            <Image src={images.shop} alt="Barbershop interior" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </Reveal>
      </section>

      <section className="bg-night text-white">
        <div className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.28em] text-white/60">How it goes</p>
            <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight md:text-5xl">Three quiet steps</h2>
          </Reveal>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {rituals.map(([index, title, copy]) => (
              <li key={index}>
                <span className="text-[12px] tracking-[0.18em] text-white/50">{index}</span>
                <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                <p className="mt-3 leading-7 text-white/75">{copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] space-y-16 px-6 py-20 md:py-28">
        <Reveal className="text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The book</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Barber services</h2>
        </Reveal>
        {barberGroups.map((group) => (
          <Reveal key={group.title}>
            <h3 className="border-b border-line pb-4 font-serif text-3xl uppercase tracking-tight text-ink">{group.title}</h3>
            <ul>
              {group.items.map(([name, summary, duration, price]) => (
                <li key={name} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <div>
                    <p className="font-serif text-2xl text-ink">{name}</p>
                    <p className="mt-2 max-w-xl text-sm leading-7">{summary}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em]">{duration}</p>
                  </div>
                  <p className="font-serif text-2xl text-ink sm:text-right">{price}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <div className="text-center">
          <a href="/menu" className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white">
            View the full menu
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3">
        {[
          { src: images.fade, alt: "Skin fade", caption: "Skin fade" },
          { src: images.beard, alt: "Beard sculpt", caption: "Beard sculpt" },
          { src: images.finish, alt: "Finished cut", caption: "Scissor cut" },
        ].map((item) => (
          <figure key={item.caption} className="relative min-h-72 overflow-hidden bg-night">
            <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-[12px] uppercase tracking-[0.18em] text-white">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="bg-stone">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
          <h2 className="mt-4 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Take a chair</h2>
          <p className="mx-auto mt-5 max-w-xl leading-8">
            Call the studio you prefer. Saturdays fill early at Silver Lake. Sundays are shorter — a good hour for a real change.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/booking?location=silver-lake" className="inline-flex min-h-12 min-w-52 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white">
              Book online
            </a>
            <a href="tel:3235550194" className="inline-flex min-h-12 min-w-52 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white">
              Silver Lake · 555-0194
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
