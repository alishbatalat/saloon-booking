"use client";

import { FormEvent, useState } from "react";

import { sendWeb3FormsEmail } from "@/lib/web3forms";

const subjects = ["General inquiry", "Booking help", "Bridal & events", "Press", "Careers", "Other"];

const studios = [
  ["", "Either studio"],
  ["wilshire", "Wilshire"],
  ["silver-lake", "Silver Lake"],
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studio: "",
    subject: subjects[0],
    message: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Could not send the message.");
        return;
      }
      void sendWeb3FormsEmail(`New contact message — ${form.subject}`, {
        name: form.name,
        email: form.email,
        phone: form.phone || "—",
        studio: form.studio || "Either studio",
        subject: form.subject,
        message: form.message,
      });

      setSent(true);
      setForm({ name: "", email: "", phone: "", studio: "", subject: subjects[0], message: "" });
    } catch {
      setError("Could not send the message.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-line bg-stone px-8 py-12 text-center md:px-12">
        <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Received</p>
        <h2 className="mt-3 font-serif text-3xl uppercase tracking-tight text-ink md:text-4xl">We have your note</h2>
        <p className="mx-auto mt-4 max-w-md leading-8">
          The desk usually replies within one business day. For same-day changes, call the studio you booked.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 inline-flex min-h-12 items-center justify-center border border-ink px-8 text-[12px] uppercase tracking-[0.22em] text-ink btn-fill"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {(
        [
          ["name", "Name", "text"],
          ["email", "Email", "email"],
          ["phone", "Phone", "tel"],
        ] as const
      ).map(([key, label, type]) => (
        <label key={key} className="block text-[12px] uppercase tracking-[0.16em]">
          {label}
          <input
            required={key !== "phone"}
            type={type}
            value={form[key]}
            onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
            className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
          />
        </label>
      ))}

      <label className="block text-[12px] uppercase tracking-[0.16em]">
        Studio
        <select
          value={form.studio}
          onChange={(event) => setForm((current) => ({ ...current, studio: event.target.value }))}
          className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
        >
          {studios.map(([value, label]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-[12px] uppercase tracking-[0.16em]">
        Subject
        <select
          required
          value={form.subject}
          onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-[12px] uppercase tracking-[0.16em]">
        Message
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          placeholder="A question about a service, an event date, or how we can help…"
          className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
        />
      </label>

      {error ? <p className="text-sm text-ink">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="h-12 border border-ink text-[12px] uppercase tracking-[0.2em] text-ink btn-fill disabled:opacity-40"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
