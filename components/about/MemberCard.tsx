import type { Member } from "@/lib/content";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand/60">
      <div className="mb-5 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/15 font-display text-xl font-bold text-brand"
        >
          {initials(member.name)}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-brand">{member.role}</p>
        </div>
      </div>
      <p className="text-muted">{member.bio}</p>
    </article>
  );
}
