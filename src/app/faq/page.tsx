import type { Metadata } from "next";
import Image from "next/image";

import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { faqs, hours, images, locations } from "@/data/home";

export const metadata: Metadata = {
  title: "FAQ — Orielle",
  description: "Answers about booking, artists, cancellations, gift cards, and the Orielle studios.",
};

export default function FaqPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.shop} alt="Orielle studio" fill priority className="object-cover bg-pan" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Answers</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">FAQ</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">You have questions. Here are the ones we hear most — booking, artists, gift cards, and which room holds which work.</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[900px] px-6 pb-24">
        <Reveal>
          <FaqList items={faqs} />
        </Reveal>
      </section>

      <section className="bg-stone">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-6 py-20 md:grid-cols-3">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Studios</p>
            <h2 className="mt-3 font-serif text-3xl uppercase tracking-tight text-ink">Our locations</h2>
            <div className="mt-6 space-y-5 text-sm leading-7">
              {locations.map((location) => (
                <p key={location.slug}>
                  <a href={`/locations#${location.slug}`} className="text-ink hover:text-bronze">
                    {location.name.replace("Visit ", "Orielle ")}
                  </a>
                  <br />
                  {location.address}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Desk</p>
            <h2 className="mt-3 font-serif text-3xl uppercase tracking-tight text-ink">Get in touch</h2>
            <p className="mt-6 text-sm leading-7">
              <a href="tel:3235550148" className="text-ink hover:text-bronze">
                (323) 555-0148
              </a>
              <br />
              <a href="mailto:hello@orielle.studio" className="hover:text-ink">
                hello@orielle.studio
              </a>
              <br />
              <a href="/contact" className="mt-3 inline-block text-ink hover:text-bronze">
                Contact page
              </a>
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The week</p>
            <h2 className="mt-3 font-serif text-3xl uppercase tracking-tight text-ink">Working hours</h2>
            <ul className="mt-6 space-y-2 text-sm">
              {hours.map(([day, time]) => (
                <li key={day} className="flex justify-between gap-4 border-b border-line py-2">
                  <span>{day}</span>
                  <span className="text-ink">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
