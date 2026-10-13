"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ApproveMessageButton({ id, approved }: { id: string; approved: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  if (approved) {
    return <span className="text-[11px] uppercase tracking-[0.14em] text-bronze">Approved ✓</span>;
  }

  async function approve() {
    setPending(true);
    setError("");
    const response = await fetch(`/api/admin/messages/${id}/approve`, { method: "POST" });
    setPending(false);
    if (!response.ok) {
      setError("Failed");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={approve}
        disabled={pending}
        className="border border-ink px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink btn-fill disabled:opacity-40"
      >
        {pending ? "Sending…" : "Approve"}
      </button>
      {error ? <span className="text-[11px] text-ink">{error}</span> : null}
    </div>
  );
}
