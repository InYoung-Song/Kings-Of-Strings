import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "@/components/forms/SubscribeForm";

export function SubscribeSection() {
  return (
    <Section
      className="border-t border-line bg-surface"
      aria-labelledby="subscribe-heading"
    >
      <Container className="max-w-2xl text-center">
        <SectionHeading
          eyebrow="Stay in the loop"
          title="Subscribe"
          id="subscribe-heading"
          className="mb-6"
        />
        <p className="mx-auto mb-8 max-w-md text-muted">
          Join the mailing list for new music, show announcements, and more.
        </p>
        <SubscribeForm />
      </Container>
    </Section>
  );
}
