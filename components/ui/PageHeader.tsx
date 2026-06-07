import { Container } from "./Container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="py-14 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-xl text-muted">{subtitle}</p>
        ) : null}
      </Container>
    </div>
  );
}
