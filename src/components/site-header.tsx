"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/"],
  ["The Studio", "/studio"],
  ["The Menu", "/menu"],
  ["Gallery", "/gallery"],
  ["Barbershop", "/barbershop"],
  ["Locations", "/locations"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white">
      <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a href="/" className="block text-ink" onClick={() => setOpen(false)}>
          <span className="block font-serif text-[28px] leading-none tracking-[0.14em]">ORIELLE</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.32em]">Salon & Barbershop</span>
        </a>
        <button
          type="button"
          className="relative h-10 w-10"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`absolute left-2 right-2 h-px bg-ink transition ${open ? "top-1/2 rotate-45" : "top-[14px]"}`} />
          <span className={`absolute left-2 right-2 top-1/2 h-px bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-2 right-2 h-px bg-ink transition ${open ? "top-1/2 -rotate-45" : "bottom-[14px]"}`} />
        </button>
      </div>
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-5 md:px-8">
              <a href="/" onClick={() => setOpen(false)} className="text-ink">
                <span className="block font-serif text-[28px] leading-none tracking-[0.14em]">ORIELLE</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.32em]">Salon & Barbershop</span>
              </a>
              <button type="button" className="relative h-10 w-10" aria-label="Close menu" onClick={() => setOpen(false)}>
                <span className="absolute left-2 right-2 top-1/2 h-px rotate-45 bg-ink" />
                <span className="absolute left-2 right-2 top-1/2 h-px -rotate-45 bg-ink" />
              </button>
            </div>
            <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-16 md:grid-cols-[1.2fr_0.8fr] md:px-10">
              <nav className="flex flex-col">
                {links.map(([label, href], index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                  >
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block py-1 font-serif text-4xl uppercase leading-tight tracking-tight text-ink transition hover:text-bronze md:text-5xl"
                    >
                      {label}
                    </a>
                  </motion.div>
                ))}
                <a
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex w-fit border border-ink px-8 py-3 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
                >
                  Book an appointment
                </a>
              </nav>
              <aside className="hidden border-l border-line pl-10 md:block">
                <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Visit</p>
                <p className="mt-6 font-serif text-3xl uppercase leading-tight text-ink">Two studios, one book</p>
                <div className="mt-8 space-y-6 text-sm leading-7">
                  <p>
                    <span className="block text-ink">Wilshire</span>
                    418 N La Cienega Blvd
                    <br />
                    Los Angeles, CA 90048
                    <br />
                    (323) 555-0148
                  </p>
                  <p>
                    <span className="block text-ink">Silver Lake</span>
                    2912 Sunset Blvd
                    <br />
                    Los Angeles, CA 90026
                    <br />
                    (323) 555-0194
                  </p>
                </div>
              </aside>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
