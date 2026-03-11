import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

const clientTypes = [
  "Churches & local congregations",
  "Christian nonprofits",
  "Para-church ministries",
  "Christian schools & universities",
  "Faith-based media organizations",
];

export default function ForWhomSection() {
  return (
    <section
      id="for-whom"
      className="grain"
      style={{
        backgroundColor: "#F5F0E8",
        padding: "8rem 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <ScrollReveal>
            <SectionLabel variant="light" className="mb-6">
              WHO THIS IS FOR
            </SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="display-lg" style={{ color: "#1C1814" }}>
              For ministries ready
              <br />
              <em style={{ fontStyle: "italic", color: "#6B4F3A" }}>
                to think before they post.
              </em>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Who it's for */}
          <ScrollReveal>
            <ul className="flex flex-col gap-4">
              {clientTypes.map((type, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span
                    style={{
                      color: "#B8860B",
                      fontSize: "0.625rem",
                      flexShrink: 0,
                    }}
                  >
                    ›
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.1rem, 1.8vw, 1.375rem)",
                      fontWeight: 400,
                      color: "#1C1814",
                      lineHeight: 1.2,
                    }}
                  >
                    {type}
                  </span>
                </li>
              ))}
            </ul>

            {/* Budget signal */}
            <div
              className="mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(107,79,58,0.15)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "#9A8E82",
                  letterSpacing: "0.06em",
                  lineHeight: 1.8,
                }}
              >
                // engagements typically $3,000–$10,000 / month
                <br />
                // based on scope, duration, and organizational size
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Who it's NOT for */}
          <ScrollReveal delay={120}>
            <div
              className="p-8"
              style={{
                backgroundColor: "#EDE8DC",
                borderLeft: "3px solid #B8860B",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "#9A8E82",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                // NOT THE RIGHT FIT
              </p>
              <p
                className="prose-base mb-6"
                style={{ color: "#4A3C30" }}
              >
                Beautiful Internet is not a social media management agency. We
                don&apos;t post for you. We don&apos;t run your Instagram. We
                don&apos;t write your captions.
              </p>
              <p
                className="prose-base mb-6"
                style={{ color: "#4A3C30" }}
              >
                We help you develop the thinking, strategy, and editorial clarity
                that makes everything you create intentional — so that when
                you&apos;re making content, it&apos;s moving people somewhere.
              </p>
              <p
                className="prose-base"
                style={{ color: "#4A3C30" }}
              >
                If you&apos;re looking for someone to fill your feed, we&apos;re
                not the right fit. If you&apos;re trying to understand what
                digital discipleship could actually look like for your
                people — let&apos;s talk.
              </p>
            </div>

            <div className="mt-8">
              <Button href="/#contact" size="lg">
                Start a Conversation
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
