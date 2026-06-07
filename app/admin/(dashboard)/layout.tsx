import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { Container } from "@/components/ui/Container";

// Admin pages are always dynamic (auth + live data, never statically cached).
export const dynamic = "force-dynamic";

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/tour", label: "Tour" },
  { href: "/admin/merch", label: "Merch" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b border-line bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-4">
          <nav aria-label="Admin" className="flex flex-wrap gap-1">
            {adminNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-fg/80 hover:bg-elevated hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LogoutButton />
        </Container>
      </div>
      <Container className="py-10">{children}</Container>
    </div>
  );
}
