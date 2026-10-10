"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setEmail("");
    setMessage("You are on the list. We write rarely.");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl text-center">
      <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">The list</p>
      <h2 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Join our notes</h2>
      <p className="mt-4">Studio hours, new artists, and the occasional offer. No weekly noise.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="home-email">
          Email
        </label>
        <input
          id="home-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email here"
          className="h-12 flex-1 border-b border-ink/30 bg-transparent px-1 text-ink outline-none placeholder:text-muted focus:border-ink"
        />
        <button
          type="submit"
          className="h-12 border border-ink px-6 text-[12px] uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-white"
        >
          Subscribe
        </button>
      </div>
      {message ? <p className="mt-4 text-sm text-ink">{message}</p> : null}
    </form>
  );
}
