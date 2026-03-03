"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Product", href: "/templates/ai-governance/features" },
  { label: "Pricing", href: "/templates/ai-governance/pricing" },
  { label: "Documentation", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#F7F6F3",
        borderTop: "1px solid #E5E5E0",
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
          {/* Brand — left column */}
          <div className="md:col-span-5">
            <Link
              href="/templates/ai-governance"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#1A1A1A",
                  letterSpacing: "-0.01em",
                }}
              >
                aegis
              </span>
              <span
                style={{
                  color: "#2D6A4F",
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  marginLeft: "1px",
                  fontWeight: 700,
                }}
              >
                &middot;
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "#8C8C8C",
                margin: 0,
                maxWidth: "20rem",
              }}
            >
              AI governance for enterprises that take compliance seriously.
            </p>
          </div>

          {/* Links — right side, single row */}
          <div className="md:col-span-7 flex flex-wrap items-start" style={{ gap: "1.5rem 2.5rem" }}>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: "#8C8C8C",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#8C8C8C";
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
            borderTop: "1px solid #E5E5E0",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "#8C8C8C",
            }}
          >
            &copy; 2026 Aegis Technologies, Inc.
          </span>
          <div
            className="flex items-center"
            style={{ gap: "1.25rem" }}
          >
            {["LinkedIn", "Twitter", "GitHub"].map((label, idx) => (
              <span key={label} className="flex items-center" style={{ gap: "1.25rem" }}>
                <Link
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    color: "#8C8C8C",
                    textDecoration: "none",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#8C8C8C";
                  }}
                >
                  {label}
                </Link>
                {idx < 2 && (
                  <span style={{ color: "#E5E5E0", fontSize: "0.75rem" }}>
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
