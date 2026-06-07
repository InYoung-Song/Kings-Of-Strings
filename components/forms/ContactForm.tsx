"use client";

import { useState, type FormEvent } from "react";
import { Honeypot } from "./Honeypot";
import { Button } from "@/components/ui/Button";
import { forms } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-fg placeholder:text-muted transition-colors focus-visible:border-brand";
const labelClass = "mb-1.5 block text-sm font-semibold text-fg";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? ""); // honeypot

    if (!name || !email || !message) {
      setError("Please fill out your name, email, and message.");
      return;
    }
    if (!emailRe.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-brand/40 bg-brand/10 p-6 text-center"
      >
        <p className="text-lg font-semibold text-fg">{forms.successMessage}</p>
        <p className="mt-1 text-sm text-muted">
          We will get back to you as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <Honeypot />

      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={fieldClass}
          placeholder="Booking inquiry, question, or just say hello"
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm font-medium text-red-500">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
