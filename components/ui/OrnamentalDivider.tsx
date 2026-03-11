interface OrnamentalDividerProps {
  variant?: "vine" | "line" | "terminal";
  className?: string;
}

export default function OrnamentalDivider({
  variant = "line",
  className = "",
}: OrnamentalDividerProps) {
  if (variant === "terminal") {
    return (
      <div
        className={`flex items-center gap-3 ${className}`}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "#2A2A2A",
          letterSpacing: "0.05em",
          userSelect: "none",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i}>—</span>
        ))}
      </div>
    );
  }

  if (variant === "vine") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 12 Q30 4 60 12 Q90 20 110 12"
            stroke="#B8860B"
            strokeWidth="0.75"
            strokeOpacity="0.6"
            fill="none"
          />
          <circle cx="10" cy="12" r="2" fill="#B8860B" fillOpacity="0.4" />
          <circle cx="60" cy="12" r="2.5" fill="#B8860B" fillOpacity="0.5" />
          <circle cx="110" cy="12" r="2" fill="#B8860B" fillOpacity="0.4" />
          <path
            d="M40 12 Q45 6 50 12 Q55 18 60 12"
            stroke="#B8860B"
            strokeWidth="0.5"
            strokeOpacity="0.35"
            fill="none"
          />
          <path
            d="M70 12 Q75 6 80 12 Q85 18 90 12"
            stroke="#B8860B"
            strokeWidth="0.5"
            strokeOpacity="0.35"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // Default: line
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "#B8860B", opacity: 0.25 }}
      />
      <span
        style={{
          color: "#B8860B",
          opacity: 0.6,
          fontSize: "0.5rem",
        }}
      >
        ◆
      </span>
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "#B8860B", opacity: 0.25 }}
      />
    </div>
  );
}
