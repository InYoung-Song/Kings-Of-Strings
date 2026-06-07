"use client";

import { useState, type FormEvent } from "react";
import { Honeypot } from "./Honeypot";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? ""); // honeypot

    if (!emailRe.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      setMessage(body.message ?? "Thanks for subscribing!");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-full border border-brand/40 bg-brand/10 px-5 py-3 text-center text-sm font-semibold text-fg"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot />
      <div
        className={
          compact
            ? "flex flex-col gap-3 sm:flex-row"
            : "flex flex-col gap-3 sm:flex-row sm:items-center"
        }
      >
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full flex-1 rounded-full border border-line bg-surface px-5 py-3 text-fg placeholder:text-muted transition-colors focus-visible:border-brand"
        />
        <Button type="submit" disabled={status === "submitting"} className="shrink-0">
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {status === "error" && message ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red-500">
          {message}
        </p>
      ) : null}
    </form>
  );
}
