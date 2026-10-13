"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="h-11 border border-ink px-6 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill"
    >
      Log out
    </button>
  );
}
