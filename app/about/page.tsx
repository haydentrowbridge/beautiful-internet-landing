import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { convictions } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Beautiful Internet",
  description:
    "The story behind Beautiful Internet — why a YouTube creator became convinced that the church's most urgent discipleship problem lives in a screen.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="grain relative min-h-[70vh] flex flex-col justify-end"
        style={{
          backgroundColor: "#F5F0E8",
          background:
            "radial-gradient(ellipse at 80% 10%, rgba(184,134,11,0.07) 0%, transparent 50%), #F5F0E8",
          paddingTop: "10rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <ScrollReveal>
            <SectionLabel variant="light" className="mb-6">
              ABOUT BEAUTIFUL INTERNET
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              className="display-xl max-w-3xl"
              style={{
                color: "#1C1814",
                fontStyle: "italic",
              }}
            >
              I believe the internet can be tended
              <br />
              like a garden.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="mt-8"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "#9A8E82",
                letterSpacing: "0.08em",
              }}
            >
              — Hayden, Founder
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Story */}
      <section
        style={{
          backgroundColor: "#EDE8DC",
          padding: "8rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Photo placeholder */}
            <ScrollReveal>
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: "#D4CFC5" }}
              >
                <div
                  className="absolute inset-0 flex items-end p-8"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,24,20,0.6) 0%, transparent 60%)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontStyle: "italic",
                      color: "#F5F0E8",
                      opacity: 0.8,
                    }}
                  >
                    Hayden
                  </p>
                </div>
                {/* Decorative overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "8rem",
                      color: "#C4B8A8",
                      opacity: 0.3,
                      fontStyle: "italic",
                      userSelect: "none",
                    }}
                  >
                    H
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Story */}
            <div className="flex flex-col gap-8">
              <ScrollReveal>
                <SectionLabel variant="light" className="mb-4">
                  THE STORY BEHIND THE NAME
                </SectionLabel>
                <h2
                  className="display-md mb-6"
                  style={{ color: "#1C1814" }}
                >
                  From the feed to the flock.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <p className="prose-lg" style={{ color: "#4A3C30" }}>
                  I spent years on YouTube — watching thousands of hours,
                  making content, studying what works, and learning how
                  platforms actually shape the people who use them. Not just
                  what content performs, but what the platforms themselves are
                  doing to human attention, identity, and desire.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <p className="prose-base" style={{ color: "#6B4F3A" }}>
                  What I kept finding was a gap. The church had a rich,
                  two-thousand-year tradition of formation — of shaping people
                  through liturgy, community, story, and practice. And there
                  was this enormous, powerful, globally connected digital
                  infrastructure that was doing the same thing — just without
                  any of the theology.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <p className="prose-base" style={{ color: "#6B4F3A" }}>
                  Beautiful Internet exists at that gap. Not to condemn the
                  internet, but to equip the church to engage it wisely. The
                  tools are powerful. The question has always been: in whose
                  hands?
                </p>
              </ScrollReveal>

              <ScrollReveal delay={320}>
                <div
                  style={{
                    borderLeft: "2px solid #B8860B",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      fontStyle: "italic",
                      color: "#1C1814",
                      lineHeight: 1.4,
                    }}
                  >
                    &ldquo;We lost the university. We lost the media. We cannot
                    afford to lose the internet through apathy.&rdquo;
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Convictions */}
      <section
        className="grain"
        style={{
          backgroundColor: "#F5F0E8",
          padding: "8rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <ScrollReveal>
              <SectionLabel variant="light" className="mb-6">
                WHAT WE BELIEVE
              </SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="display-lg" style={{ color: "#1C1814" }}>
                The convictions behind
                <br />
                <em style={{ fontStyle: "italic", color: "#6B4F3A" }}>
                  every engagement.
                </em>
              </h2>
            </ScrollReveal>
          </div>

          <OrnamentalDivider variant="vine" className="mb-16" />

          <div className="flex flex-col gap-0">
            {convictions.map((conviction, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div
                  className="py-12 grid grid-cols-1 md:grid-cols-[2rem_1fr_2fr] gap-x-10 gap-y-4 items-start"
                  style={{ borderTop: "1px solid rgba(107,79,58,0.15)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "#B8860B",
                      letterSpacing: "0.08em",
                      paddingTop: "0.3rem",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#1C1814",
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {conviction.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.75,
                      color: "#6B4F3A",
                    }}
                  >
                    {conviction.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div style={{ borderTop: "1px solid rgba(107,79,58,0.15)" }} />
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section
        style={{
          backgroundColor: "#EDE8DC",
          padding: "8rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <ScrollReveal>
              <h2
                className="display-lg mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#1C1814",
                  fontStyle: "italic",
                }}
              >
                If any of this resonates — let&apos;s think together.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p
                className="prose-lg mb-8"
                style={{ color: "#6B4F3A" }}
              >
                Beautiful Internet works with a small number of organizations at
                a time. We&apos;d love to hear about yours.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="flex flex-wrap gap-4 items-center">
                <Button
                  href="mailto:hello@beautifulinternet.com"
                  size="lg"
                  external
                >
                  Reach Out
                </Button>
                <a
                  href="mailto:hello@beautifulinternet.com"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "#9A8E82",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                  }}
                >
                  hello@beautifulinternet.com
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
