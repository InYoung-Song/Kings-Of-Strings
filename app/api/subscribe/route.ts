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

  const email = String(body.email ?? "").trim().toLowerCase();
  const honeypot = String(body.company ?? "").trim();

  // Honeypot tripped: pretend success, store nothing.
  if (honeypot) {
    return NextResponse.json({ ok: true, message: "Thanks for subscribing!" });
  }

  if (!emailRe.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { error: "Subscriptions are not configured yet. Please check back soon." },
      { status: 503 }
    );
  }

  try {
    // Insert, ignoring duplicates. No returned row means the email already
    // existed, so we report a friendly "already subscribed" message.
    const rows = await sql`
      insert into subscribers (email)
      values (${email})
      on conflict (email) do nothing
      returning id
    `;
    if (rows.length === 0) {
      return NextResponse.json({
        ok: true,
        message: "You are already on the list. Thanks for the love!",
      });
    }
  } catch (err) {
    console.error(
      "subscribers insert failed:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: "Thanks for subscribing!" });
}
