import Link from "next/link";
import { SocialLinks } from "./SocialLinks";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold uppercase tracking-tight">
              <span className="text-brand">The Kings</span> of Strings
            </p>
            <p className="mt-3 text-sm text-muted">
              {siteConfig.shortDescription}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm font-semibold text-fg hover:text-brand"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-fg/80 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Follow + Listen
            </p>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          <p>
            &copy; {year} The Kings of Strings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
