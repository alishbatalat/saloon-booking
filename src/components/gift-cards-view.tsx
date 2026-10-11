"use client";

import Image from "next/image";
import { useState } from "react";

import { GiftCardForm } from "@/components/gift-card-form";
import { Reveal } from "@/components/reveal";
import { features, giftCards, images } from "@/data/home";

export function GiftCardsView() {
  const [amount, setAmount] = useState(giftCards[1].amount);

  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-night">
        <Image src={images.nails} alt="Gift-worthy finish" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 text-center text-white">
          <p className="mb-4 text-[12px] uppercase tracking-[0.34em]">Certificates</p>
          <h1 className="font-serif text-5xl font-normal uppercase leading-none tracking-tight md:text-7xl">Gift cards</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="leading-8">
            A card for a cut, a color sitting, or a quiet hour in the chair. Redeemable at Wilshire or Silver Lake — request online and the desk confirms.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-10">
        <ul className="grid gap-8 md:grid-cols-3">
          {features.map(([index, title, copy]) => (
            <li key={index}>
              <span className="text-[12px] tracking-[0.18em] text-bronze">{index}</span>
              <h2 className="mt-3 font-serif text-2xl text-ink">{title}</h2>
              <p className="mt-3 leading-7">{copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-16 px-6 pb-24 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Amounts</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Choose a card</h2>
          <ul className="mt-10 space-y-4">
            {giftCards.map((card) => {
              const selected = amount === card.amount;
              return (
                <li key={card.id}>
                  <button
                    type="button"
                    onClick={() => setAmount(card.amount)}
                    className={`w-full border px-6 py-6 text-left transition ${
                      selected ? "border-ink bg-stone" : "border-line hover:border-ink"
                    }`}
                  >
                    <span className="font-serif text-4xl text-ink">{card.label}</span>
                    <p className="mt-2 leading-7">{card.blurb}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Request</p>
          <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Send to the desk</h2>
          <p className="mt-4 leading-8">
            No online checkout yet — this request reaches the desk the same way as a contact note. They reply with how to pay and deliver the card.
          </p>
          <div className="mt-10">
            <GiftCardForm key={amount} initialAmount={amount} />
          </div>
        </div>
      </section>
    </>
  );
}
