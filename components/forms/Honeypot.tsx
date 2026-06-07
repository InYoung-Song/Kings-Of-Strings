// Off-screen honeypot field. Real users never see or fill it; bots that fill
// every input will populate it, letting the server silently reject the
// submission. Kept out of the tab order and hidden from assistive tech.
export function Honeypot({ name = "company" }: { name?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
    >
      <label>
        Do not fill this out if you are human
        <input
          type="text"
          name={name}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}
