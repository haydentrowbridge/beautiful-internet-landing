import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { frameworkSections } from "@/lib/content";

export default function MovementSection() {
  return (
    <section
      id="framework"
      className="grain"
      style={{
        backgroundColor: "#F5F0E8",
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(61,82,52,0.06) 0%, transparent 50%), #F5F0E8",
        padding: "8rem 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal>
            <SectionLabel variant="light" className="mb-6">
              THE BEAUTIFUL INTERNET FRAMEWORK
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="display-lg mb-6" style={{ color: "#1C1814" }}>
              Four questions every
              <br />
              <em style={{ fontStyle: "italic", color: "#3D5234" }}>
                digital strategy must answer.
              </em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="prose-lg"
              style={{ color: "#6B4F3A", maxWidth: "38rem" }}
            >
              We built our framework from a simple observation: most Christian
              organizations think about digital backwards. They start with
              content. We start with formation. These four questions reframe the
              whole conversation.
            </p>
          </ScrollReveal>
        </div>

        <OrnamentalDivider variant="vine" className="mb-16" />

        {/* Framework quadrants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-umber/10">
          {frameworkSections.map((item, i) => (
            <ScrollReveal key={item.number} delay={i * 80}>
              <div
                className="p-10 h-full"
                style={{ backgroundColor: "#F5F0E8" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "3.5rem",
                      fontWeight: 400,
                      color: "#EDE8DC",
                      lineHeight: 1,
                      flexShrink: 0,
                      fontStyle: "italic",
                    }}
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
                      fontWeight: 400,
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "#1C1814",
                      paddingTop: "0.6rem",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.75,
                    color: "#6B4F3A",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
