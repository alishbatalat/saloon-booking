import Image from "next/image";

import { BrandLogoMarquee } from "@/components/brand-logo-marquee";
import { GalleryGrid } from "@/components/gallery-grid";
import { HeroImageSlider } from "@/components/hero-image-slider";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { getHomeDemo, type HomeDemo } from "@/data/home-demos";
import { gallery, hours, images, locations, menu, notes, strip } from "@/data/home";

type Props = {
  demo?: HomeDemo;
};

export function HomeView({ demo = getHomeDemo("beauty-center")! }: Props) {
  const useHeroSlider = Boolean(demo.heroSlides?.length);

  return (
    <>
      {useHeroSlider ? (
        <HeroImageSlider
          slides={demo.heroSlides!}
          title={demo.title}
          subtitle={demo.subtitle}
          eyebrow={demo.heroEyebrow}
        />
      ) : (
        <section id="top" className="relative min-h-[82vh] overflow-hidden bg-night">
          <Image src={demo.heroImage} alt={demo.heroAlt} fill priority className="object-cover object-[center_20%] bg-pan" sizes="100vw" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 flex min-h-[82vh] flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="max-w-4xl font-serif text-5xl font-normal uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              {demo.title}
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.34em] md:text-base">{demo.subtitle}</p>
            <a href="#studio" className="mt-10 inline-flex min-h-12 min-w-48 items-center justify-center border border-white px-8 text-[12px] uppercase tracking-[0.22em] btn-fill-light">
              Discover more
            </a>
          </div>
        </section>
      )}

      <section id="studio" className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <Image src={images.portrait} alt="Close portrait from the Wilshire studio" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">{demo.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-tight text-ink md:text-5xl">{demo.aboutTitle}</h2>
          <p className="mt-6 max-w-md text-base leading-8">{demo.aboutCopy}</p>
          <a href="/studio" className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
            The studio
          </a>
          <ul className="mt-8 space-y-6">
            {demo.focusItems.map(([index, title, copy]) => (
              <li key={index} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="pt-1 text-[12px] tracking-[0.18em] text-bronze">{index}</span>
                <span>
                  <span className="block font-serif text-2xl text-ink">{title}</span>
                  <span className="mt-1 block leading-7">{copy}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-stone bg-pattern-dots">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:py-28">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The week</p>
            <h2 className="mt-4 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Working hours</h2>
            <p className="mt-6 max-w-md leading-8">
              Both studios keep the same rhythm, with Silver Lake opening an hour earlier on Saturdays. Sundays are shorter on purpose — the right hour for a real change.
            </p>
            <a href="/booking" className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
              Book an appointment
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <ul>
              {hours.map(([day, time]) => (
                <li key={day} className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-4 border-b border-line py-5">
                  <span className="font-serif text-2xl text-ink">{day}</span>
                  <span className="text-bronze">—</span>
                  <span className="text-right text-ink">{time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">Silver Lake opens at 9:00 AM on Saturdays. Nails and makeup are Wilshire only.</p>
          </Reveal>
        </div>
      </section>

      {demo.portfolio ? (
        <section id="portfolio" className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">{demo.portfolio.eyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-6xl">{demo.portfolio.title}</h2>
            </div>
            <a href="/gallery" className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
              Open the gallery
            </a>
          </Reveal>
          <GalleryGrid items={demo.portfolio.items} />
        </section>
      ) : null}

      {demo.quoteGallery ? (
        <section className="bg-stone bg-pattern-dots">
          <div className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">{demo.quoteGallery.eyebrow}</p>
              <p className="mt-5 font-serif text-3xl italic leading-snug text-ink md:text-4xl">“{demo.quoteGallery.quote}”</p>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {demo.quoteGallery.items.map((item, index) => (
                <Reveal key={item.src} delay={index * 0.08}>
                  <div className="group relative aspect-[4/5] overflow-hidden bg-white">
                    <Image src={item.src} alt={item.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
                    {item.caption ? (
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 text-[12px] uppercase tracking-[0.18em] text-white">
                        {item.caption}
                      </span>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="menu" className="mx-auto max-w-[1100px] px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Salon & barbershop</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-6xl">Our service menu</h2>
        </Reveal>
        <div className="mt-12 grid gap-x-16 md:grid-cols-2">
          {menu.map(([name, detail, price]) => (
            <div key={name} className="border-b border-line py-5">
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-2xl text-ink">{name}</span>
                <span className="font-serif text-xl text-ink">{price}</span>
              </span>
              <span className="mt-1 block text-sm">{detail}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="/menu" className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
            View the full menu
          </a>
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden bg-night">
        <Image src={images.salon} alt="The Wilshire salon floor" fill className="object-cover bg-pan" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="font-serif text-4xl uppercase leading-tight tracking-tight md:text-6xl">Place where you will feel peaceful</h2>
          <p className="mt-6 max-w-xl leading-8 text-white/85">
            Phones stay in the pocket unless you need them. The bowls are quiet. If you want to talk, the artist will. If you do not, that is also a complete appointment.
          </p>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The rooms</p>
            <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-6xl">Redefine your look</h2>
          </div>
          <a href="/gallery" className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
            Open the gallery
          </a>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((item) => (
            <figure key={item.caption} className={`group relative overflow-hidden bg-stone ${item.tall ? "row-span-2 min-h-72" : "min-h-44"}`}>
              <Image src={item.src} alt={item.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 25vw, 50vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-[12px] uppercase tracking-[0.18em] text-white">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <BrandLogoMarquee />

      <section id="barbershop" className="bg-night text-white">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image src={images.barber} alt="A barber finishing a cut" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-white/70">Barbershop</p>
            <h2 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-tight md:text-5xl">The gentlemen’s chair, and anyone who wants it</h2>
            <p className="mt-6 leading-8 text-white/75">
              Fades, scissor cuts, hot-towel shaves, and beards with a proper outline. The Wilshire chairs and the Sunset shop keep the same standard. You do not need to be anyone in particular to sit down.
            </p>
            <a href="/barbershop" className="mt-8 inline-flex min-h-12 items-center justify-center border border-white px-8 text-[12px] uppercase tracking-[0.22em] btn-fill-light">
              Barber services
            </a>
          </div>
        </div>
      </section>

      <section className="bg-stone">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">New guests</p>
            <h2 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-tight text-ink md:text-6xl">Twenty percent off the first visit</h2>
            <p className="mt-6 max-w-lg leading-8">
              Mention “first visit” when you call. The desk takes the offer off the starting price of the service. It is once per person, and it does not cover product.
            </p>
            <a href="/booking" className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
              Book now
            </a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={images.makeup} alt="Makeup brushes at the Wilshire studio" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <TestimonialSlider />
      </section>

      <section id="locations" className="mx-auto max-w-[1240px] px-6 pb-24">
        <Reveal className="mb-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Los Angeles</p>
            <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-6xl">Welcome to Orielle</h2>
          </div>
          <a href="/locations" className="inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill">
            All locations
          </a>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {locations.map((location) => (
            <article key={location.name} className="group relative min-h-[460px] overflow-hidden bg-night">
              <Image src={location.image} alt={location.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <p className="text-[12px] uppercase tracking-[0.22em]">Est. 2016</p>
                <h3 className="mt-2 font-serif text-4xl uppercase">{location.name}</h3>
                <p className="mt-2 text-sm text-white/80">{location.address}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={`/locations#${location.slug}`} className="inline-flex border border-white px-5 py-2 text-[11px] uppercase tracking-[0.18em] btn-fill-light">
                    Learn more
                  </a>
                  <a href={`tel:${location.phone.replace(/\D/g, "")}`} className="inline-flex border border-white px-5 py-2 text-[11px] uppercase tracking-[0.18em] btn-fill-light">
                    {location.phone}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="journal" className="bg-stone">
        <div className="mx-auto max-w-[1240px] px-6 py-24">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Our latest notes</h2>
            <a href="/journal" className="text-[12px] uppercase tracking-[0.2em] text-ink hover:text-bronze">
              All notes
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {notes.map((note) => (
              <a key={note.slug} href={`/journal/${note.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image src={note.image} alt={note.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em]">
                  {note.category}
                  <span className="mx-2">/</span>
                  {note.date}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-snug text-ink group-hover:text-bronze">{note.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-6xl">Book an appointment</h2>
          <p className="mx-auto mt-5 max-w-xl leading-8">
            Choose a studio, a service, and a time online. Wilshire keeps the makeup room and the nail table. Silver Lake is cuts, color, and the barber chairs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/booking" className="inline-flex min-h-12 min-w-52 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill">
              Book online
            </a>
            <a href="/booking?location=wilshire" className="inline-flex min-h-12 min-w-52 items-center justify-center border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill">
              Start at Wilshire
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <NewsletterForm />
      </section>

      <section aria-label="Studio photographs" className="overflow-hidden">
        <div className="flex w-max animate-logo-marquee items-center hover:[animation-play-state:paused]">
          {[...strip, ...strip].map((src, index) => (
            <div key={`${src}-${index}`} className="relative h-36 w-36 shrink-0 overflow-hidden sm:h-44 sm:w-44 md:h-52 md:w-52">
              <Image src={src} alt="" fill className="object-cover" sizes="208px" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
