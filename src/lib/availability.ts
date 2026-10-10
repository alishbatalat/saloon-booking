import { getBookingLocation } from "@/data/booking";
import { fromMinutes, losAngelesMinutesNow, losAngelesToday, toMinutes, weekdayIndex } from "@/lib/booking-format";

export function openSlots(locationId: string, date: string, duration: number) {
  const location = getBookingLocation(locationId);
  if (!location) return [];
  const hours = location.hours.find((entry) => entry.day === weekdayIndex(date));
  if (!hours) return [];

  const slots: string[] = [];
  let cursor = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  while (cursor + duration <= close) {
    slots.push(fromMinutes(cursor));
    cursor += 30;
  }

  if (date !== losAngelesToday()) return slots;
  const now = losAngelesMinutesNow();
  return slots.filter((slot) => toMinutes(slot) > now + 30);
}
