import nodemailer from "nodemailer";

import { greetingEmailHtml, greetingEmailText } from "@/lib/email-template";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}

/** Sends the approval/greeting email through the studio's own Gmail account — works for any recipient, no domain needed. */
export async function sendGreetingEmail(to: string, name: string, subject: string) {
  const transport = getTransporter();
  if (!transport) {
    return { ok: false, error: "GMAIL_USER / GMAIL_APP_PASSWORD is not set." };
  }

  try {
    await transport.sendMail({
      from: `Orielle <${process.env.GMAIL_USER}>`,
      to,
      replyTo: process.env.GMAIL_USER,
      subject: "We received your message — Orielle",
      text: greetingEmailText({ name, subject }),
      html: greetingEmailHtml({ name, subject }),
    });
    return { ok: true as const };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Could not send the email." };
  }
}
