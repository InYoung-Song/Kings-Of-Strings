"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { ChatIcon, CloseIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/lib/site";

// Floating "Let's Chat" button (mirrors the original Wix chat bubble). Opens a
// small panel containing the booking/contact form. No third-party service.
export function LetsChat() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Not shown in the admin area.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-label="Let's chat"
          className="fixed bottom-24 right-4 z-[90] max-h-[75vh] w-[min(92vw,380px)] overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-2xl sm:right-6"
        >
          <div className="mb-1 flex items-center justify-between">
            <p className="font-display text-lg font-bold uppercase tracking-tight">
              Let&apos;s Chat
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-brand"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="mb-4 text-sm text-muted">
            Booking inquiries or questions? Send us a message and we will get
            back to you. You can also email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
          <ContactForm />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold text-zinc-950 shadow-lg transition-colors hover:bg-brand-300 sm:right-6"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <ChatIcon className="h-5 w-5" />
        )}
        <span>{open ? "Close" : "Let's Chat"}</span>
      </button>
    </>
  );
}
