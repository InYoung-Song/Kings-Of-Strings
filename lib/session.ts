// Stateless admin session: an HMAC-signed cookie value `${exp}.${sig}`.
// Pure Web Crypto so it runs in both the Node and Edge (middleware) runtimes.
// No next/* imports here so middleware stays edge-safe.

export const COOKIE_NAME = "kos_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function getSecret(): string | undefined {
  return process.env.AUTH_SECRET;
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return toBase64Url(new Uint8Array(sig));
}

/** Create a signed session token that expires in 7 days. Returns null if AUTH_SECRET is unset. */
export async function createSession(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const sig = await sign(String(exp), secret);
  return `${exp}.${sig}`;
}

/** Verify a session token's signature and expiry. */
export async function verifySession(token: string | undefined): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const expPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);
  const exp = Number(expPart);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await sign(expPart, secret);
  // Length-aware constant-ish comparison.
  if (expected.length !== sigPart.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sigPart.charCodeAt(i);
  }
  return diff === 0;
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
