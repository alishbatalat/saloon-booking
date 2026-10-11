"use client";

import { useState } from "react";

type Faq = {
  question: string;
  answer: string[];
};

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-2xl text-ink md:text-3xl">{item.question}</span>
              <span className="mt-2 text-[12px] uppercase tracking-[0.18em] text-bronze">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <div className="space-y-4 pb-6 leading-8">
                {item.answer.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
