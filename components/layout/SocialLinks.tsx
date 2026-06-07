import { socialLinks } from "@/lib/site";
import { socialIconMap } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((s) => {
        const Icon = socialIconMap[s.icon];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg/80 transition-colors hover:border-brand hover:text-brand"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
