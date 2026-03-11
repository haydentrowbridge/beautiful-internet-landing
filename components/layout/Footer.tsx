import Link from "next/link";
import { navLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#0A0A0A", fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Left: Wordmark + tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-baseline gap-0">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#F5F0E8",
                  letterSpacing: "-0.01em",
                }}
              >
                Beautiful
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "#6B4F3A",
                  marginLeft: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Internet
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "#8A8480",
                letterSpacing: "0.06em",
                lineHeight: 1.6,
              }}
            >
              // ancient wisdom.
              <br />
              // modern tools.
            </p>
          </div>

          {/* Center: Nav */}
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label-sm hover:text-warm-white transition-colors duration-200"
                style={{ color: "#8A8480" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Contact */}
          <div className="flex flex-col gap-3">
            <p className="label-sm" style={{ color: "#6B4F3A" }}>
              START A CONVERSATION
            </p>
            <a
              href="mailto:hello@beautifulinternet.com"
              className="hover:text-warm-white transition-colors duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "#8A8480",
                letterSpacing: "0.02em",
              }}
            >
              hello@beautifulinternet.com
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8"
          style={{ borderTop: "1px solid #1E1E1E" }}
        >
          <p className="label-sm" style={{ color: "#3A3632" }}>
            © {new Date().getFullYear()} Beautiful Internet
          </p>
          <p className="label-sm" style={{ color: "#3A3632" }}>
            // formation.isAlwaysHappening
          </p>
        </div>
      </div>
    </footer>
  );
}
