import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getBookingLocation, getBookingService } from "@/data/booking";
import { formatDate, formatTime, money } from "@/lib/booking-format";
import { ADMIN_SESSION_COOKIE, adminDisplayName, isValidAdminSession } from "@/lib/admin-auth";
import { listAppointments, listContactMessages } from "@/lib/store";
import { AdminLogoutButton } from "@/components/admin-logout-button";

export const metadata: Metadata = {
  title: "Admin — Orielle",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSession(session)) {
    redirect("/admin/login");
  }

  const [appointments, messages] = await Promise.all([listAppointments(), listContactMessages()]);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Welcome, {adminDisplayName()}</p>
          <h1 className="mt-3 font-serif text-4xl uppercase tracking-tight text-ink md:text-5xl">Dashboard</h1>
        </div>
        <AdminLogoutButton />
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-2xl uppercase tracking-tight text-ink">Contact messages</h2>
        <p className="mt-1 text-sm text-muted">{messages.length} total</p>
        <div className="mt-5 overflow-x-auto border border-line">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-stone text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Studio</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((entry) => (
                <tr key={entry.id} className="border-b border-line last:border-b-0 align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{new Date(entry.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-ink">{entry.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${entry.email}`} className="footer-link">
                      {entry.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">{entry.phone || "—"}</td>
                  <td className="px-4 py-3">{entry.studio || "—"}</td>
                  <td className="px-4 py-3">{entry.subject}</td>
                  <td className="max-w-xs px-4 py-3 whitespace-pre-line">{entry.message}</td>
                </tr>
              ))}
              {!messages.length ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-muted">
                    No messages yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl uppercase tracking-tight text-ink">Appointments</h2>
        <p className="mt-1 text-sm text-muted">{appointments.length} total</p>
        <div className="mt-5 overflow-x-auto border border-line">
          <table className="w-full min-w-[920px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-stone text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                <th className="px-4 py-3">Booked</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Studio</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                const location = getBookingLocation(appointment.locationId);
                const service = getBookingService(appointment.serviceId);
                return (
                  <tr key={appointment.id} className="border-b border-line last:border-b-0 align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {new Date(appointment.createdAt).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink">{appointment.reference}</td>
                    <td className="px-4 py-3 text-ink">{appointment.guest.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${appointment.guest.email}`} className="footer-link block">
                        {appointment.guest.email}
                      </a>
                      <span className="block text-muted">{appointment.guest.phone}</span>
                    </td>
                    <td className="px-4 py-3">{location?.name ?? appointment.locationId}</td>
                    <td className="px-4 py-3">{service?.name ?? appointment.serviceId}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {formatDate(appointment.date)} · {formatTime(appointment.time)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{money(appointment.amount)}</td>
                    <td className="px-4 py-3 capitalize">{appointment.status}</td>
                  </tr>
                );
              })}
              {!appointments.length ? (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-muted">
                    No appointments yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
