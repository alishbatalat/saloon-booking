import { NextResponse } from "next/server";

import { createContactMessage, StoreError } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      studio?: string;
      subject?: string;
      message?: string;
    };

    const entry = await createContactMessage({
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      studio: body.studio || "",
      subject: body.subject || "",
      message: body.message || "",
    });

    return NextResponse.json({ id: entry.id });
  } catch (error) {
    if (error instanceof StoreError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not send the message." }, { status: 500 });
  }
}
