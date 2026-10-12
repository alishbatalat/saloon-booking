import type { Metadata } from "next";
import Image from "next/image";

import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { images, menuGroups, menuHighlights } from "@/data/home";

export const metadata: Metadata = {
  title: "The Menu — Orielle",
  description: "Salon and barbershop services at Orielle, with prices for cuts, color, shaves, makeup, and nails.",
};

export default function MenuPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.portrait} alt="Portrait from the Wilshire studio" fill priority className="object-cover object-[center_20%] bg-pan" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Salon & barbershop</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">The menu</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            Prices below are the starting point. Color for longer or denser hair is confirmed before mixing. Makeup and nails are Wilshire only. Book online or call the studio.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1000px] space-y-20 px-6 pb-24">
        {menuGroups.map((group) => (
          <Reveal key={group.title}>
            <div
              id={group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="flex scroll-mt-28 flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <h2 className="font-serif text-4xl uppercase tracking-tight text-ink">{group.title}</h2>
              <p className="text-[12px] uppercase tracking-[0.22em] text-bronze">{group.category}</p>
            </div>
            <ul>
              {group.items.map(([name, summary, duration, price]) => (
                <li key={name} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                  <div>
                    <h3 className="font-serif text-2xl text-ink">{name}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-7">{summary}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em]">{duration}</p>
                  </div>
                  <p className="font-serif text-2xl text-ink sm:text-right">{price}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-24">
        <Reveal className="mb-10 text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">A closer look</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-6xl">From the chair</h2>
        </Reveal>
        <GalleryGrid items={menuHighlights} />
      </section>

      <section className="bg-stone">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-6 py-20 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={images.barber} alt="Barber at work" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
            <h2 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-tight text-ink md:text-5xl">Ready to sit down?</h2>
            <p className="mt-6 max-w-md leading-8">
              Choose the studio that fits the service. Wilshire keeps makeup and nails. Silver Lake is cuts, color, and the barber chairs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/booking" className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill">
                Book online
              </a>
              <a href="tel:3235550148" className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill">
                Wilshire · 555-0148
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
