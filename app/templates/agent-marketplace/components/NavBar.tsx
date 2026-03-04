"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "EXPLORE", href: "/templates/agent-marketplace/explore" },
  { label: "PUBLISH", href: "#" },
  { label: "DOCS", href: "#" },
  { label: "PRICING", href: "#" },
] as const;

export default function NavBar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "#0A0A0A",
        borderBottom: "1px solid #2A2A2A",
      }}
    >
      <div className="flex items-center justify-between w-full px-6 md:px-10 h-14">
        {/* Logo */}
        <Link
          href="/templates/agent-marketplace"
          className="flex items-center gap-0 shrink-0"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          <span
            className="text-sm tracking-widest uppercase"
            style={{ color: "#E8E8E8", letterSpacing: "0.15em" }}
          >
            AGENTVAULT
          </span>
          <span
            className="inline-block w-[8px] h-[14px] ml-[2px] relative -top-[1px]"
            style={{
              backgroundColor: "#E8FF47",
              animation: "cursorBlink 1s step-end infinite",
            }}
          />
        </Link>

        {/* Nav Links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 ml-16">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="text-xs tracking-wider uppercase"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                color: hoveredLink === link.label ? "#E8FF47" : "#6B6B6B",
                transition: "color 100ms ease",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button */}
        <CTAButton />
      </div>

      <style jsx global>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </nav>
  );
}

function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/templates/agent-marketplace/explore"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center px-5 py-2 text-xs tracking-wider uppercase shrink-0"
      style={{
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        border: "1px solid #2A2A2A",
        borderRadius: 0,
        backgroundColor: hovered ? "#E8FF47" : "transparent",
        color: hovered ? "#0A0A0A" : "#E8E8E8",
        transition: "background-color 100ms ease, color 100ms ease, border-color 100ms ease",
        borderColor: hovered ? "#E8FF47" : "#2A2A2A",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      LAUNCH AGENT&nbsp;&nbsp;→
    </Link>
  );
}
