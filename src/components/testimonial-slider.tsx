"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { reviews } from "@/data/home";

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const item = reviews[index];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Comments & reviews</p>
      <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">From the chair</h2>
      <div className="relative mt-10 min-h-52">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">“{item.quote}”</p>
            <footer className="mt-6 text-[12px] uppercase tracking-[0.22em]">
              {item.name}
              <span className="mx-2 text-bronze">/</span>
              {item.service}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous review"
          className="h-10 w-10 border border-line text-ink hover:border-ink"
          onClick={() => setIndex((current) => (current - 1 + reviews.length) % reviews.length)}
        >
          ←
        </button>
        {reviews.map((entry, entryIndex) => (
          <button
            key={entry.id}
            type="button"
            aria-label={`Show review ${entryIndex + 1}`}
            onClick={() => setIndex(entryIndex)}
            className={`h-1.5 w-6 ${entryIndex === index ? "bg-ink" : "bg-line"}`}
          />
        ))}
        <button
          type="button"
          aria-label="Next review"
          className="h-10 w-10 border border-line text-ink hover:border-ink"
          onClick={() => setIndex((current) => (current + 1) % reviews.length)}
        >
          →
        </button>
      </div>
    </div>
  );
}
