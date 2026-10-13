import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";
import { sendGreetingEmail } from "@/lib/mailer";
import { approveContactMessage, StoreError } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSession(session)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const message = await approveContactMessage(id);
    const emailResult = await sendGreetingEmail(message.email, message.name, message.subject);
    return NextResponse.json({ message, email: emailResult });
  } catch (error) {
    if (error instanceof StoreError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Could not approve the message." }, { status: 500 });
  }
}
