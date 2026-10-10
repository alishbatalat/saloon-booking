import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { features, hours, images, locations } from "@/data/home";

export const metadata: Metadata = {
  title: "The Studio — Orielle",
  description: "Orielle is a Los Angeles salon and barbershop with rooms in Wilshire and Silver Lake.",
};

const rooms = [
  {
    name: "Wilshire",
    image: images.wilshire,
    alt: "Wilshire salon interior",
    copy: "The original room, opened in 2016. Salon chairs along the window, barber chairs at the back, and a makeup studio behind a linen curtain. Nails are only here.",
  },
  {
    name: "Silver Lake",
    image: images.silverLake,
    alt: "Silver Lake studio",
    copy: "The smaller shop on Sunset. Cuts, color, fades, and the hot-towel chair. It opens an hour earlier on Saturdays, and Sundays stay short on purpose.",
  },
];

export default function StudioPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.salon} alt="The Wilshire salon floor" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Since 2016</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">The studio</h1>
        </div>
      </section>

      <article className="mx-auto grid max-w-[1100px] items-center gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <Reveal>
          <p className="font-serif text-3xl leading-snug text-ink md:text-4xl">
            A salon and a barbershop that share a front door, a standard, and a book.
          </p>
          <div className="mt-8 space-y-5 leading-8">
            <p>
              Amara Cole opened the Wilshire room after ten years of watching guests cross town because their colorist and their barber would not work under the same roof. The second studio, on Sunset, opened when the Saturday book at La Cienega stopped fitting in the day.
            </p>
            <p>
              The work is ordinary in the best sense: a cut that still looks like you, color that survives week twelve, a shave that is not a performance. Seven artists. Two neighborhoods. Makeup and nails stay at Wilshire, where the light is kinder to a face.
            </p>
            <p>
              New guests are welcome. Mention “first visit” when you call and the desk takes twenty percent off the starting price of that service.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative min-h-[520px] overflow-hidden bg-stone">
            <Image src={images.cut} alt="A cut in progress" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </Reveal>
      </article>

      <section className="border-y border-line bg-stone">
        <dl className="mx-auto grid max-w-[1100px] grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {[
            ["2016", "Opened"],
            ["2", "Studios"],
            ["7", "Artists"],
            ["19", "Services"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-serif text-5xl text-ink">{value}</dt>
              <dd className="mt-2 text-[12px] uppercase tracking-[0.2em]">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">How we work</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">The same standard, both chairs</h2>
        </Reveal>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {features.map(([index, title, copy]) => (
            <li key={index}>
              <span className="text-[12px] tracking-[0.18em] text-bronze">{index}</span>
              <h3 className="mt-3 font-serif text-2xl text-ink">{title}</h3>
              <p className="mt-3 leading-7">{copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-night text-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 py-20 md:grid-cols-2 md:py-24">
          {rooms.map((room) => (
            <article key={room.name} className="group relative min-h-[480px] overflow-hidden">
              <Image src={room.image} alt={room.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h2 className="font-serif text-4xl uppercase">{room.name}</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/85">{room.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
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
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Visit</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Call the room you want</h2>
          <div className="mt-8 space-y-8">
            {locations.map((location) => (
              <p key={location.name} className="leading-7">
                <span className="block font-serif text-2xl text-ink">{location.name.replace("Visit ", "")}</span>
                {location.address}
                <a href={`tel:${location.phone.replace(/\D/g, "")}`} className="mt-2 block text-ink hover:text-bronze">
                  {location.phone}
                </a>
              </p>
            ))}
          </div>
          <a href="/booking" className="mt-10 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white">
            Book an appointment
          </a>
        </div>
      </section>
    </>
  );
}
