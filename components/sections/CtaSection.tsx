import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#3D5234",
        background:
          "radial-gradient(ellipse at 70% 120%, rgba(184,134,11,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% -20%, rgba(245,240,232,0.05) 0%, transparent 40%), #3D5234",
        padding: "10rem 0",
      }}
    >
      {/* Large decorative word */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(12rem, 30vw, 28rem)",
            fontWeight: 400,
            color: "#F5F0E8",
            opacity: 0.03,
            fontStyle: "italic",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          tend
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <ScrollReveal>
            <SectionLabel variant="gold" className="mb-8">
              BEGIN
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              className="display-lg mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F5F0E8",
                fontStyle: "italic",
              }}
            >
              Ready to tend
              <br />
              something better?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="prose-lg mb-4"
              style={{ color: "rgba(245,240,232,0.72)", maxWidth: "36rem" }}
            >
              Most organizations don&apos;t need to post more. They need to know
              why they&apos;re posting at all.
            </p>
            <p
              className="prose-lg mb-12"
              style={{ color: "rgba(245,240,232,0.72)", maxWidth: "36rem" }}
            >
              If you&apos;re ready to think seriously about what your digital
              presence is forming your people into — and what it could form them
              toward — start there.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                href="mailto:hello@beautifulinternet.com"
                size="lg"
                external
              >
                Start a Conversation
              </Button>
              <Button href="/about" variant="ghost-light" size="lg">
                Read our story →
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={340}>
            <div className="mt-12">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "rgba(245,240,232,0.35)",
                  letterSpacing: "0.06em",
                }}
              >
                // digital is 1 gigabyte. embodied is 1 terabyte.
                <br />// everything we do is building the bridge.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
