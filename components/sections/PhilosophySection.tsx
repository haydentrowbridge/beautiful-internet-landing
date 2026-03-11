import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";

const egyptItems = [
  "Slaves to digital identity — creating from lack, performing for validation",
  "Passive consumption that forms people into something less than God intends",
  "Platforms as primary community — disembodied, shallow, and untethered",
  "Metrics as the measure of worth — impressions, reach, engagement counts",
];

const gardenItems = [
  "Sons and daughters creating from abundance — secure in being fully seen by God",
  "Intentional formation — content that nourishes rather than numbs",
  "Digital as a bridge — leading people back to embodied, in-person community",
  "Formation as the measure — did this move someone closer to Christ and others?",
];

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="grain"
      style={{
        backgroundColor: "#F5F0E8",
        background:
          "radial-gradient(ellipse at 80% 80%, rgba(74,92,63,0.07) 0%, transparent 50%), #F5F0E8",
        padding: "8rem 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal>
            <SectionLabel variant="light" className="mb-6">
              OUR FRAMEWORK
            </SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="display-lg mb-6" style={{ color: "#1C1814" }}>
              From digital Egypt
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "#3D5234",
                }}
              >
                to the promised land.
              </em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              className="prose-lg"
              style={{ color: "#6B4F3A", maxWidth: "38rem" }}
            >
              The Israelites didn&apos;t leave Egypt to wander. They were headed
              somewhere. Your people&apos;s digital life is either keeping them
              in bondage — forming them toward anxiety, performance, and
              consumption — or it&apos;s part of the journey toward something
              better. Beautiful Internet helps you build the latter.
            </p>
          </ScrollReveal>
        </div>

        <OrnamentalDivider variant="vine" className="mb-16" />

        {/* Two-column callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Digital Egypt */}
          <ScrollReveal delay={0}>
            <div
              className="p-8 h-full"
              style={{
                backgroundColor: "#141414",
                borderTop: "2px solid #2A2A2A",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "#6B4F3A",
                    letterSpacing: "0.12em",
                  }}
                >
                  // DIGITAL EGYPT
                </span>
              </div>
              <ul className="flex flex-col gap-4">
                {egyptItems.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span
                      style={{
                        color: "#3A3632",
                        flexShrink: 0,
                        marginTop: "0.35rem",
                      }}
                    >
                      ×
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "#6B6560",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Digital Garden */}
          <ScrollReveal delay={120}>
            <div
              className="p-8 h-full"
              style={{
                backgroundColor: "#F9F6F1",
                borderTop: "2px solid #3D5234",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "#3D5234",
                    letterSpacing: "0.12em",
                  }}
                >
                  // DIGITAL GARDEN
                </span>
              </div>
              <ul className="flex flex-col gap-4">
                {gardenItems.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span
                      style={{
                        color: "#3D5234",
                        flexShrink: 0,
                        marginTop: "0.2rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      ✦
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "#4A3C30",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
