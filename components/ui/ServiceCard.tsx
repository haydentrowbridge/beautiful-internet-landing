"use client";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  number,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div
      className="group p-8 flex flex-col gap-4 cursor-default shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300"
      style={{
        backgroundColor: "#F9F6F1",
        borderBottom: "1px solid transparent",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderBottomColor = "#B8860B";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderBottomColor =
          "transparent";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "#B8860B",
          letterSpacing: "0.1em",
        }}
      >
        {number}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "#1C1814",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          lineHeight: 1.7,
          color: "#6B4F3A",
        }}
      >
        {description}
      </p>
    </div>
  );
}
