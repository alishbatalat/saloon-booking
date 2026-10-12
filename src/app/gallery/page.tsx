import type { Metadata } from "next";
import Image from "next/image";

import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { galleryFull, images } from "@/data/home";

export const metadata: Metadata = {
  title: "Gallery — Orielle",
  description: "Photographs from the Orielle salon and barbershop rooms in Wilshire and Silver Lake.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.cut} alt="A cut in the Wilshire studio" fill priority className="object-cover bg-pan" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">The rooms</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">Gallery</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            Work from both studios — cuts, color, shaves, makeup, and the rooms themselves. Click a photograph to open it.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-24">
        <GalleryGrid items={galleryFull} />
      </section>

      <section className="bg-stone">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
          <h2 className="mt-4 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Book the chair</h2>
          <p className="mx-auto mt-5 max-w-xl leading-8">
            See the full price list, then call Wilshire or Silver Lake for the hour that fits.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/menu" className="inline-flex min-h-12 min-w-44 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill">
              The menu
            </a>
            <a href="/booking" className="inline-flex min-h-12 min-w-44 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill">
              Book now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
