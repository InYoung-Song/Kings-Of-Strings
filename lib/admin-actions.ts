"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { getSql } from "@/lib/db";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}
function orNull(v: string): string | null {
  return v.length ? v : null;
}

function db() {
  const sql = getSql();
  if (!sql) throw new Error("Database is not configured (DATABASE_URL missing).");
  return sql;
}

// ---- Tour dates ----

export async function addTourDate(formData: FormData) {
  await requireAdmin();
  const sql = db();
  const date = str(formData, "date");
  if (!date) throw new Error("Date is required.");
  const title = orNull(str(formData, "title"));
  const venue = orNull(str(formData, "venue"));
  const city = orNull(str(formData, "city"));
  const state = orNull(str(formData, "state"));
  const ticketUrl = orNull(str(formData, "ticket_url"));
  const isPublished = formData.get("is_published") != null;

  await sql`
    insert into tour_dates (title, venue, city, state, date, ticket_url, is_published)
    values (${title}, ${venue}, ${city}, ${state}, ${date}, ${ticketUrl}, ${isPublished})
  `;
  revalidatePath("/admin/tour");
  revalidatePath("/tour");
}

export async function deleteTourDate(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  await db()`delete from tour_dates where id = ${id}`;
  revalidatePath("/admin/tour");
  revalidatePath("/tour");
}

export async function toggleTourPublished(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  await db()`update tour_dates set is_published = not is_published where id = ${id}`;
  revalidatePath("/admin/tour");
  revalidatePath("/tour");
}

// ---- Merch ----

export async function addMerch(formData: FormData) {
  await requireAdmin();
  const sql = db();
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required.");
  const description = orNull(str(formData, "description"));
  const price = orNull(str(formData, "price"));
  const imagePath = orNull(str(formData, "image_path"));
  const buyUrl = orNull(str(formData, "buy_url"));
  const isPublished = formData.get("is_published") != null;

  await sql`
    insert into merch (name, description, price, image_path, buy_url, is_published)
    values (${name}, ${description}, ${price}, ${imagePath}, ${buyUrl}, ${isPublished})
  `;
  revalidatePath("/admin/merch");
  revalidatePath("/merch");
}

export async function deleteMerch(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  await db()`delete from merch where id = ${id}`;
  revalidatePath("/admin/merch");
  revalidatePath("/merch");
}

export async function toggleMerchPublished(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  await db()`update merch set is_published = not is_published where id = ${id}`;
  revalidatePath("/admin/merch");
  revalidatePath("/merch");
}
