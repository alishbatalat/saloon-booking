"use client";

import { FormEvent, useState } from "react";

import { giftCards } from "@/data/home";

type Props = {
  initialAmount?: number;
};

export function GiftCardForm({ initialAmount = giftCards[1].amount }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: String(initialAmount),
    recipient: "",
    message: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    const note = [
      `Gift card amount: $${form.amount}`,
      form.recipient.trim() ? `Recipient: ${form.recipient.trim()}` : "",
      form.message.trim() || "Please confirm availability and how to pay.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          studio: "",
          subject: "Gift card",
          message: note,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Could not send the request.");
        return;
      }
      setSent(true);
      setForm({ name: "", email: "", phone: "", amount: String(initialAmount), recipient: "", message: "" });
    } catch {
      setError("Could not send the request.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-line bg-stone px-8 py-12 text-center">
        <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Received</p>
        <h2 className="mt-3 font-serif text-3xl uppercase tracking-tight text-ink">Gift card requested</h2>
        <p className="mx-auto mt-4 max-w-md leading-8">
          The desk will confirm by email with payment instructions. Cards are redeemable at Wilshire or Silver Lake.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-white"
        >
          Request another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="block text-[12px] uppercase tracking-[0.16em]">
        Amount
        <select
          required
          value={form.amount}
          onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
          className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
        >
          {giftCards.map((card) => (
            <option key={card.id} value={card.amount}>
              {card.label}
            </option>
          ))}
        </select>
      </label>

      {(
        [
          ["name", "Your name", "text"],
          ["email", "Email", "email"],
          ["phone", "Phone", "tel"],
          ["recipient", "Recipient name", "text"],
        ] as const
      ).map(([key, label, type]) => (
        <label key={key} className="block text-[12px] uppercase tracking-[0.16em]">
          {label}
          <input
            required={key !== "phone" && key !== "recipient"}
            type={type}
            value={form[key]}
            onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
            className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
          />
        </label>
      ))}

      <label className="block text-[12px] uppercase tracking-[0.16em]">
        Note for the desk
        <textarea
          rows={3}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          placeholder="Occasion, delivery email for the recipient, or pickup at a studio…"
          className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
        />
      </label>

      <p className="text-sm leading-7">
        Online card payments are not connected yet. The desk confirms the card and how to pay — then it is ready to redeem in either room.
      </p>

      {error ? <p className="text-sm text-ink">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="h-12 border border-ink text-[12px] uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-white disabled:opacity-40"
      >
        {pending ? "Sending…" : "Request gift card"}
      </button>
    </form>
  );
}
