"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  bookingLocations,
  bookingServices,
  bookingStylists,
  servicesFor,
  stylistsFor,
} from "@/data/booking";
import {
  addDays,
  durationLabel,
  formatShortDate,
  formatTime,
  losAngelesToday,
  money,
  weekdayName,
} from "@/lib/booking-format";

const steps = ["Studio", "Service", "Artist", "Time", "Details"];

type Props = {
  initialLocationId?: string;
  initialServiceId?: string;
  initialStylistId?: string;
};

export function BookingWizard({
  initialLocationId = "",
  initialServiceId = "",
  initialStylistId = "",
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [locationId, setLocationId] = useState(initialLocationId);
  const [category, setCategory] = useState<"salon" | "barbershop">("salon");
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [stylistId, setStylistId] = useState(initialStylistId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", notes: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const dates = useMemo(() => Array.from({ length: 18 }, (_, index) => addDays(losAngelesToday(), index)), []);
  const visibleServices = servicesFor(locationId, category);
  const service = bookingServices.find((item) => item.id === serviceId);
  const artists = stylistsFor(locationId, serviceId);
  const location = bookingLocations.find((item) => item.id === locationId);
  const artist = bookingStylists.find((item) => item.id === stylistId);

  useEffect(() => {
    if (initialServiceId) {
      const found = bookingServices.find((item) => item.id === initialServiceId);
      if (found) setCategory(found.category);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (!date || !serviceId || !locationId || !stylistId) return;
    const controller = new AbortController();
    const params = new URLSearchParams({ date, serviceId, locationId, stylistId });
    setLoadingSlots(true);
    fetch(`/api/availability?${params.toString()}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((payload: { slots?: string[]; error?: string }) => {
        setSlots(payload.slots ?? []);
        setError(payload.error || "");
      })
      .catch((fetchError: Error) => {
        if (fetchError.name !== "AbortError") setError("Could not load times.");
      })
      .finally(() => setLoadingSlots(false));
    return () => controller.abort();
  }, [date, serviceId, locationId, stylistId]);

  function chooseLocation(id: string) {
    setLocationId(id);
    setServiceId("");
    setStylistId("");
    setTime("");
    setError("");
  }

  function chooseService(id: string) {
    setServiceId(id);
    setStylistId("");
    setTime("");
    setError("");
  }

  function canContinue() {
    if (step === 0) return Boolean(locationId);
    if (step === 1) return Boolean(serviceId);
    if (step === 2) return Boolean(stylistId);
    if (step === 3) return Boolean(date && time);
    return guest.name.trim().length > 1 && guest.email.includes("@") && guest.phone.trim().length > 6;
  }

  async function confirm() {
    setPending(true);
    setError("");
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locationId,
        serviceId,
        stylistId,
        date,
        time,
        guest,
      }),
    });
    const payload = (await response.json()) as {
      error?: string;
      appointment?: { reference: string };
    };
    setPending(false);
    if (!response.ok || !payload.appointment) {
      setError(payload.error || "Could not save the appointment.");
      return;
    }
    router.push(`/booking/${payload.appointment.reference}`);
  }

  return (
    <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 lg:grid-cols-[1fr_320px] lg:py-20">
      <div>
        <p className="text-[12px] uppercase tracking-[0.28em] text-bronze">Reservations</p>
        <h1 className="mt-3 font-serif text-5xl uppercase tracking-tight text-ink md:text-6xl">Book an appointment</h1>
        <p className="mt-4 max-w-xl leading-7">
          Choose a studio, a service, and a time. You will leave with a reference code. Pay when you arrive.
        </p>

        <ol className="mt-8 flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                disabled={index > step}
                onClick={() => index < step && setStep(index)}
                className={`px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${
                  index === step ? "bg-ink text-white" : index < step ? "text-ink" : "text-muted"
                }`}
              >
                0{index + 1} {label}
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          {step === 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {bookingLocations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseLocation(item.id)}
                  className={`border p-6 text-left transition ${locationId === item.id ? "border-ink bg-stone" : "border-line hover:border-ink"}`}
                >
                  <span className="block font-serif text-3xl uppercase text-ink">{item.name}</span>
                  <span className="mt-2 block text-sm">{item.neighborhood}</span>
                  <span className="mt-4 block text-sm leading-6">{item.blurb}</span>
                </button>
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <div className="mb-6 flex gap-3">
                {(["salon", "barbershop"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    className={`border px-4 py-2 text-[12px] uppercase tracking-[0.16em] ${
                      category === value ? "border-ink bg-ink text-white" : "border-line text-ink"
                    }`}
                  >
                    {value === "salon" ? "Salon" : "Barbershop"}
                  </button>
                ))}
              </div>
              <div className="grid gap-3">
                {visibleServices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseService(item.id)}
                    className={`grid gap-2 border px-5 py-4 text-left sm:grid-cols-[1fr_auto] ${
                      serviceId === item.id ? "border-ink bg-stone" : "border-line hover:border-ink"
                    }`}
                  >
                    <span>
                      <span className="block font-serif text-2xl text-ink">{item.name}</span>
                      <span className="mt-1 block text-sm">{item.summary}</span>
                    </span>
                    <span className="text-sm text-ink">
                      {money(item.price, item.priceMax)}
                      <span className="mt-1 block text-muted">{durationLabel(item.duration)}</span>
                    </span>
                  </button>
                ))}
                {!visibleServices.length ? <p>This studio does not offer that menu. Try the other list.</p> : null}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setStylistId("any")}
                className={`border p-5 text-left ${stylistId === "any" ? "border-ink bg-stone" : "border-line hover:border-ink"}`}
              >
                <span className="block font-serif text-2xl text-ink">First available</span>
                <span className="mt-2 block text-sm">We will seat you with an artist who performs this service.</span>
              </button>
              {artists.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStylistId(item.id)}
                  className={`border p-5 text-left ${stylistId === item.id ? "border-ink bg-stone" : "border-line hover:border-ink"}`}
                >
                  <span className="block font-serif text-2xl text-ink">{item.name}</span>
                  <span className="mt-1 block text-[12px] uppercase tracking-[0.16em]">{item.role}</span>
                </button>
              ))}
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <div className="flex gap-2 overflow-x-auto pb-3">
                {dates.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setDate(value);
                      setTime("");
                    }}
                    className={`min-w-20 shrink-0 border px-3 py-3 text-center ${date === value ? "border-ink bg-ink text-white" : "border-line text-ink"}`}
                  >
                    <span className="block text-[11px] uppercase tracking-[0.14em]">{weekdayName(value)}</span>
                    <span className="mt-1 block font-serif text-xl">{formatShortDate(value).split(" ")[1]}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {loadingSlots ? <p className="col-span-full text-sm">Checking the book…</p> : null}
                {!loadingSlots && date && !slots.length ? (
                  <p className="col-span-full text-sm">That day has no open sitting long enough for this service.</p>
                ) : null}
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`border py-3 text-sm ${time === slot ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"}`}
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <form
              className="grid gap-6"
              onSubmit={(event) => {
                event.preventDefault();
                void confirm();
              }}
            >
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
                    required
                    type={type}
                    value={guest[key]}
                    onChange={(event) => setGuest((current) => ({ ...current, [key]: event.target.value }))}
                    className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
                  />
                </label>
              ))}
              <label className="block text-[12px] uppercase tracking-[0.16em]">
                Notes
                <textarea
                  value={guest.notes}
                  onChange={(event) => setGuest((current) => ({ ...current, notes: event.target.value }))}
                  rows={3}
                  placeholder="First visit, a photograph, a sensitive scalp…"
                  className="mt-2 w-full border-b border-line bg-transparent py-3 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-ink"
                />
              </label>
              {service?.priceMax ? (
                <p className="text-sm">Color is booked at the starting price. Your artist confirms the final quote before mixing.</p>
              ) : null}
              <p className="text-sm">Payment is at the studio when you arrive. Card payments can be added later.</p>
              <button
                type="submit"
                disabled={pending || !canContinue()}
                className="h-12 border border-ink text-[12px] uppercase tracking-[0.2em] text-ink btn-fill disabled:opacity-40"
              >
                {pending ? "Saving…" : "Confirm appointment"}
              </button>
            </form>
          ) : null}
        </div>

        {error ? <p className="mt-4 text-sm text-ink">{error}</p> : null}

        {step < 4 ? (
          <div className="mt-8 flex gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="h-12 border border-line px-6 text-[12px] uppercase tracking-[0.18em] text-ink"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep((value) => value + 1)}
              className="h-12 border border-ink px-8 text-[12px] uppercase tracking-[0.18em] text-ink btn-fill disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>

      <aside className="h-fit border border-line bg-stone p-6 lg:sticky lg:top-28">
        <p className="text-[12px] uppercase tracking-[0.22em] text-bronze">Your visit</p>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="uppercase tracking-[0.16em]">Studio</dt>
            <dd className="mt-1 font-serif text-2xl text-ink">{location?.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em]">Service</dt>
            <dd className="mt-1 text-ink">{service?.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em]">Artist</dt>
            <dd className="mt-1 text-ink">{stylistId === "any" ? "First available" : artist?.name ?? "—"}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em]">When</dt>
            <dd className="mt-1 text-ink">{date && time ? `${date} · ${formatTime(time)}` : "—"}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em]">Starting at</dt>
            <dd className="mt-1 font-serif text-3xl text-ink">{service ? money(service.price) : "—"}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
