import { NextResponse } from "next/server";

import { createAppointment, StoreError } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      serviceId?: string;
      stylistId?: string;
      locationId?: string;
      date?: string;
      time?: string;
      guest?: {
        name?: string;
        email?: string;
        phone?: string;
        notes?: string;
      };
    };

    if (!body.serviceId || !body.stylistId || !body.locationId || !body.date || !body.time) {
      return NextResponse.json({ error: "Complete each booking step." }, { status: 400 });
    }

    const appointment = await createAppointment({
      serviceId: body.serviceId,
      stylistId: body.stylistId,
      locationId: body.locationId,
      date: body.date,
      time: body.time,
      guest: {
        name: body.guest?.name || "",
        email: body.guest?.email || "",
        phone: body.guest?.phone || "",
        notes: body.guest?.notes || "",
      },
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    if (error instanceof StoreError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not save the appointment." }, { status: 500 });
  }
}
