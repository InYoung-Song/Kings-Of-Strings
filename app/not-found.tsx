import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-bold text-brand">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8">
        <Button href="/">Back to Home</Button>
      </div>
    </Container>
  );
}
