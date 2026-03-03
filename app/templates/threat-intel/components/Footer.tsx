"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Platform", href: "#" },
  { label: "Intelligence", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Status", href: "#" },
  { label: "Security", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0B0D11",
        borderTop: "1px solid #1E293B",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1400px",
          paddingTop: "3rem",
          paddingBottom: "3rem",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        {/* Top section: asymmetric 5/7 split */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
          style={{ marginBottom: "3rem" }}
        >
          {/* Brand — left 5 cols */}
          <div className="md:col-span-5">
            <Link
              href="/templates/threat-intel"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#E0E0E0",
                }}
              >
                VIGIL
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "#475569",
                margin: 0,
                maxWidth: "20rem",
              }}
            >
              Threat intelligence that never sleeps.
            </p>
          </div>

          {/* Links — right 7 cols, single horizontal row */}
          <div
            className="md:col-span-7 flex flex-wrap items-start"
            style={{ gap: "1.25rem 2rem" }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.8125rem",
                  color: "#475569",
                  textDecoration: "none",
                  transition: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#94A3B8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#475569";
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
            borderTop: "1px solid #1E293B",
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
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: "0.625rem",
              letterSpacing: "0.02em",
              color: "#475569",
            }}
          >
            &copy; 2026 Vigil Security Inc.
          </span>

          <div
            className="flex items-center"
            style={{ gap: "0.5rem" }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                fontSize: "0.625rem",
                letterSpacing: "0.02em",
                color: "#475569",
              }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
