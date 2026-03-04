"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Privacy", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#FAFAF8",
        borderTop: "1px solid #E8E8E8",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingTop: "3rem",
          paddingBottom: "3rem",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
          style={{ marginBottom: "3rem" }}
        >
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/templates/motion-design"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1.125rem",
                color: "#1A1A1A",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              motive
            </Link>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "#717171",
                margin: 0,
                maxWidth: "18rem",
              }}
            >
              Motion design for product teams that ship.
            </p>
          </div>

          {/* Links — flat single row, not columns */}
          <div
            className="md:col-span-8 flex flex-wrap items-start"
            style={{ gap: "1.25rem 2.5rem" }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: "#717171",
                  textDecoration: "none",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#717171";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #E8E8E8",
            paddingTop: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "#717171",
            }}
          >
            &copy; 2026 Motive Labs, Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
