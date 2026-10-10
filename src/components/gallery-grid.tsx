"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  tall?: boolean;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => (current === null ? current : (current + 1) % items.length));
      if (event.key === "ArrowLeft") {
        setActive((current) => (current === null ? current : (current - 1 + items.length) % items.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={`${item.caption}-${item.src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={`group relative overflow-hidden bg-stone text-left ${item.tall ? "row-span-2 min-h-72" : "min-h-44"}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-[12px] uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:opacity-100">
              {item.caption}
            </span>
          </button>
        ))}
      </div>
      {active !== null ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/88 p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute right-5 top-5 text-[12px] uppercase tracking-[0.2em] text-white"
            onClick={() => setActive(null)}
          >
            Close
          </button>
          <button
            type="button"
            className="absolute left-4 text-3xl text-white md:left-8"
            aria-label="Previous photograph"
            onClick={() => setActive((current) => (current === null ? current : (current - 1 + items.length) % items.length))}
          >
            ←
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl">
            <Image src={items[active].src} alt={items[active].alt} fill className="object-contain" sizes="90vw" />
          </div>
          <button
            type="button"
            className="absolute right-4 text-3xl text-white md:right-8"
            aria-label="Next photograph"
            onClick={() => setActive((current) => (current === null ? current : (current + 1) % items.length))}
          >
            →
          </button>
          <p className="absolute bottom-6 text-[12px] uppercase tracking-[0.22em] text-white">{items[active].caption}</p>
        </div>
      ) : null}
    </>
  );
}
