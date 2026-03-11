import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "ghost" | "ghost-light";
  size?: "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center label-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3";

  const variants = {
    primary:
      "bg-terracotta text-warm-white hover:bg-terracotta-dark active:scale-[0.98]",
    ghost:
      "border border-ink text-ink hover:bg-ink hover:text-warm-white active:scale-[0.98]",
    "ghost-light":
      "border border-parchment/30 text-parchment hover:bg-parchment hover:text-ink active:scale-[0.98]",
  };

  const sizes = {
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return external ? (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        style={{ letterSpacing: "0.08em" }}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes} style={{ letterSpacing: "0.08em" }}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      style={{ letterSpacing: "0.08em" }}
    >
      {children}
    </button>
  );
}
