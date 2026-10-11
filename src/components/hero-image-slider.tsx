"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: HeroSlide[];
  title: string;
  subtitle: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  intervalMs?: number;
};

export function HeroImageSlider({
  slides,
  title,
  subtitle,
  eyebrow = "Fresh, shiny, bright",
  ctaLabel = "Discover more",
  ctaHref = "#studio",
  intervalMs = 5000,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [paused, slides.length, intervalMs]);

  function goTo(next: number) {
    setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  }

  const slide = slides[index] ?? slides[0];

  return (
    <section
      id="top"
      className="bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative min-h-[70vh] overflow-hidden bg-night md:min-h-[78vh]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Nail studio images"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide.src + index}
            className="absolute inset-0"
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: `${dir * 100}%`, opacity: 1 }),
              center: { x: "0%", opacity: 1 },
              exit: (dir: number) => ({ x: `${dir * -100}%`, opacity: 1 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5">
          {slides.map((entry, entryIndex) => (
            <button
              key={entry.src + entry.alt}
              type="button"
              aria-label={`Go to slide ${entryIndex + 1}`}
              aria-current={entryIndex === index ? "true" : undefined}
              onClick={() => goTo(entryIndex)}
              className={`h-2.5 w-2.5 rounded-full border border-white/80 transition ${
                entryIndex === index ? "bg-white" : "bg-transparent hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
        <p className="text-[12px] uppercase tracking-[0.34em] text-muted">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-normal uppercase leading-[1.05] tracking-tight text-ink md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted">{subtitle}</p>
        <a
          href={ctaHref}
          className="mt-8 inline-flex min-h-12 min-w-48 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
