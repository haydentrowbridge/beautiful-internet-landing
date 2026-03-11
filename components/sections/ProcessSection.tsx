import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { processSteps } from "@/lib/content";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="grid-pattern relative"
      style={{
        backgroundColor: "#0A0A0A",
        padding: "8rem 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <SectionLabel variant="mono-dark" className="mb-6">
              THE PROCESS
            </SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2
              className="display-lg"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F5F0E8",
              }}
            >
              Clarity before content.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p
              className="prose-base mt-6"
              style={{ color: "#8A8480", maxWidth: "32rem" }}
            >
              Every engagement begins with listening. We don&apos;t arrive with
              a playbook — we arrive with questions. Strategy that doesn&apos;t
              come from deep understanding is just noise with a budget.
            </p>
          </ScrollReveal>
        </div>

        {/* Process Steps — vertical on mobile, grid on desktop */}
        <div className="flex flex-col gap-0">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 80}>
              <div
                className="flex gap-8 py-8 items-start"
                style={{
                  borderTop: "1px solid #1E1E1E",
                }}
              >
                {/* Number */}
                <div className="flex-shrink-0 w-24">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "#3A3632",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "#3D5234",
                      letterSpacing: "0.12em",
                      display: "block",
                    }}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "#8A8480",
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Right: step indicator */}
                <div
                  className="hidden md:flex items-center justify-end flex-shrink-0 w-16"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 4rem)",
                    color: "#1A1A1A",
                    fontWeight: 400,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
              </div>
            </ScrollReveal>
          ))}
          <div style={{ borderTop: "1px solid #1E1E1E" }} />
        </div>
      </div>
    </section>
  );
}
