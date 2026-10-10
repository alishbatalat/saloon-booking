import { NextResponse } from "next/server";

import { availableTimes, StoreError } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const slots = await availableTimes({
      locationId: searchParams.get("locationId") || "",
      serviceId: searchParams.get("serviceId") || "",
      stylistId: searchParams.get("stylistId") || "any",
      date: searchParams.get("date") || "",
    });
    return NextResponse.json({ slots });
  } catch (error) {
    if (error instanceof StoreError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not load times." }, { status: 500 });
  }
}
