"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-sm border-b border-umber/10"
          : "bg-transparent"
      }`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-baseline gap-0 group">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: scrolled ? "#1C1814" : "#1C1814",
              fontStyle: "italic",
            }}
          >
            Beautiful
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "#6B4F3A",
              marginLeft: "0.35rem",
            }}
          >
            Internet
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-sm text-umber hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="label-sm bg-terracotta text-warm-white px-5 py-2.5 hover:bg-terracotta-dark transition-colors duration-200"
            style={{ letterSpacing: "0.08em" }}
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <div className="px-6 pb-8 pt-2 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="label-sm text-umber hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="label-sm bg-terracotta text-warm-white px-5 py-3 text-center hover:bg-terracotta-dark transition-colors duration-200"
            style={{ letterSpacing: "0.08em" }}
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
