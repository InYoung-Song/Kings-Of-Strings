import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  "aria-labelledby"?: string;
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  bleed = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", className)}
      {...rest}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
    </div>
  );
}
