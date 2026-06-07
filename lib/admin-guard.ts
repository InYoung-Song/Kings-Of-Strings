import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifySession } from "@/lib/session";

// Defense in depth on top of middleware: every protected admin page and every
// server action calls this. Redirects to the login page if the session is
// missing or invalid.
export async function requireAdmin(): Promise<void> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!(await verifySession(token))) {
    redirect("/admin/login");
  }
}
