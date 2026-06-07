// Tiny class-name joiner (avoids pulling in clsx for this small site).
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
