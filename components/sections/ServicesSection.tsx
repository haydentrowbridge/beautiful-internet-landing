import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/lib/content";

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: "#EDE8DC",
        padding: "8rem 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <SectionLabel variant="light" className="mb-6">
              WHAT WE DO
            </SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="display-lg" style={{ color: "#1C1814" }}>
              Strategy rooted in
              <br />
              <em style={{ fontStyle: "italic", color: "#6B4F3A" }}>
                understanding.
              </em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p
              className="prose-base mt-6"
              style={{ color: "#6B4F3A", maxWidth: "36rem" }}
            >
              Before we talk tactics, we talk theology. Every service is built on
              a clear understanding of what digital does to people — and how to
              redirect it.
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.slice(0, 4).map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 80}>
              <ServiceCard {...service} />
            </ScrollReveal>
          ))}
        </div>
        {/* 5th card — centered, half-width on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <ScrollReveal delay={320}>
            <ServiceCard {...services[4]} />
          </ScrollReveal>
          <div
            className="hidden md:flex items-center justify-center p-8"
            style={{
              border: "1px dashed rgba(107,79,58,0.2)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                fontStyle: "italic",
                color: "#9A8E82",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              &ldquo;Most organizations don&apos;t need to post more.
              <br />
              They need to know why they&apos;re posting at all.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
