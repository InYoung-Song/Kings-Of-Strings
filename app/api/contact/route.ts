import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  // Honeypot tripped: pretend success so bots move on, but store nothing.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  try {
    await sql`
      insert into contact_messages (name, email, message)
      values (${name}, ${email}, ${message})
    `;
  } catch (err) {
    console.error(
      "contact_messages insert failed:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
