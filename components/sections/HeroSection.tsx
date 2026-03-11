import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function HeroSection() {
  return (
    <section
      className="grain relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundColor: "#F5F0E8",
        background:
          "radial-gradient(ellipse at 15% 60%, rgba(74,92,63,0.09) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(184,134,11,0.07) 0%, transparent 50%), #F5F0E8",
        paddingTop: "7rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          <ScrollReveal delay={0}>
            <SectionLabel variant="mono" className="mb-8">
              DIGITAL FORMATION STRATEGY
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              className="display-xl mb-8"
              style={{ color: "#1C1814" }}
            >
              Ancient wisdom.
              <br />
              <em style={{ fontStyle: "italic", color: "#6B4F3A" }}>
                Modern tools.
              </em>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="prose-lg mb-10 max-w-2xl"
              style={{ color: "#6B4F3A" }}
            >
              The church has always known how to form people. The internet is the
              most powerful discipleship platform ever built. Beautiful Internet
              helps churches and Christian organizations claim that ground — before
              the algorithm does it for them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="flex flex-wrap gap-4 items-center mb-16">
              <Button href="/#contact" size="lg">
                Start a Conversation
              </Button>
              <Button href="/#philosophy" variant="ghost" size="lg">
                See how it works
              </Button>
            </div>
          </ScrollReveal>

          {/* Threshold element — the "internet" voice breaking through */}
          <ScrollReveal delay={360}>
            <div
              className="flex items-center gap-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "#9A8E82",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "#B8860B" }}>{">"}</span>
              <span>formation.isAlreadyHappening</span>
              <span
                className="animate-cursor-blink"
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "1em",
                  backgroundColor: "#B8860B",
                  opacity: 0.6,
                  verticalAlign: "middle",
                }}
              />
              <span style={{ color: "#6B4F3A", marginLeft: "0.5rem" }}>
                // the question is: toward what?
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Decorative large letter — very subtle background element */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(20rem, 28vw, 36rem)",
          fontWeight: 400,
          color: "#1C1814",
          opacity: 0.025,
          lineHeight: 1,
          right: "-4rem",
          userSelect: "none",
        }}
      >
        B
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            color: "#9A8E82",
            letterSpacing: "0.12em",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #B8860B60, transparent)",
          }}
        />
      </div>
    </section>
  );
}
