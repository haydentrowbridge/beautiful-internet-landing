import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

const realities = [
  "Social media is not a neutral tool — it has a logic, an incentive structure, and a design philosophy built around attention extraction.",
  "Every platform actively forms the imaginations of your people with every scroll, swipe, and notification.",
  "Most churches are behind. But not helplessly so. The question is whether you'll lead this conversation or be shaped by it.",
];

export default function DiagnosisSection() {
  return (
    <section
      id="diagnosis"
      className="grid-pattern relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(74,92,63,0.06) 0%, transparent 55%), #0A0A0A",
        padding: "7rem 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <ScrollReveal>
            <SectionLabel variant="mono-dark" className="mb-8">
              THE DIAGNOSIS
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              className="display-lg mb-10"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F5F0E8",
              }}
            >
              Your congregation&apos;s faith is being discipled by the
              algorithm.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="prose-lg mb-12"
              style={{ color: "#8A8480", maxWidth: "42rem" }}
            >
              The question is not whether social media will form your people. It
              will. The question is what it will form them into.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-8 mb-16">
            {realities.map((text, i) => (
              <ScrollReveal key={i} delay={200 + i * 100}>
                <div className="flex gap-6 items-start">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "#3D5234",
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                      marginTop: "0.2rem",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      lineHeight: 1.75,
                      color: "#9A9490",
                    }}
                  >
                    {text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Rhetorical closer */}
          <ScrollReveal delay={500}>
            <div
              style={{
                borderLeft: "2px solid #3D5234",
                paddingLeft: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  fontStyle: "italic",
                  color: "#C0BAB2",
                  lineHeight: 1.4,
                }}
              >
                What would it look like if the church led this conversation?
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
