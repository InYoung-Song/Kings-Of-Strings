import { NextResponse } from "next/server";
import { COOKIE_NAME, createSession, SESSION_MAX_AGE } from "@/lib/session";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = String(body.password ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PASSWORD and AUTH_SECRET." },
      { status: 503 }
    );
  }
  if (password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSession();
  if (!token) {
    return NextResponse.json(
      { error: "Could not create session." },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
