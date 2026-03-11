import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "mono" | "mono-dark" | "gold";
  className?: string;
  prefix?: string;
}

export default function SectionLabel({
  children,
  variant = "light",
  className,
  prefix,
}: SectionLabelProps) {
  const base = "label-sm block";

  const variants = {
    light: "text-umber",
    dark: "text-mono-gray",
    mono: "text-umber",
    "mono-dark": "text-mono-gray",
    gold: "text-gold",
  };

  const prefixMap = {
    light: "",
    dark: "",
    mono: "// ",
    "mono-dark": "// ",
    gold: "",
  };

  const fontFamily =
    variant === "mono" || variant === "mono-dark"
      ? "var(--font-mono)"
      : "var(--font-sans)";

  return (
    <span
      className={cn(base, variants[variant], className)}
      style={{ fontFamily }}
    >
      {(prefix ?? prefixMap[variant])}
      {children}
    </span>
  );
}
