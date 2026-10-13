"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setPending(false);
    if (!response.ok) {
      setError("Incorrect username or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-20">
      <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Admin</p>
      <h1 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink">Sign in</h1>
      <form onSubmit={onSubmit} className="mt-8 grid gap-6">
        <label className="block text-[12px] uppercase tracking-[0.16em]">
          Username
          <input
            required
            type="text"
            autoFocus
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
          />
        </label>
        <label className="block text-[12px] uppercase tracking-[0.16em]">
          Password
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
          />
        </label>
        {error ? <p className="text-sm text-ink">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="h-12 border border-ink text-[12px] uppercase tracking-[0.2em] text-ink btn-fill disabled:opacity-40"
        >
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
