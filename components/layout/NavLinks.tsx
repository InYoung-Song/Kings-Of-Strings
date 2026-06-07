"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NavLinks({
  orientation = "horizontal",
  onNavigate,
}: {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-1"
      )}
    >
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                isActive
                  ? "text-brand"
                  : "text-fg/80 hover:text-brand",
                orientation === "vertical" && "text-base"
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
