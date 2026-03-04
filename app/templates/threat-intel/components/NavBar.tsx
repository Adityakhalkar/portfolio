"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Platform", href: "#" },
  { label: "Intelligence", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#0B0D11",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 md:px-12"
        style={{
          maxWidth: "1400px",
          height: "64px",
        }}
      >
        {/* Logo + Red Dot */}
        <Link
          href="/templates/threat-intel"
          className="flex items-center"
          style={{
            textDecoration: "none",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.125rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#E0E0E0",
              letterSpacing: "0.12em",
            }}
          >
            VIGIL
          </span>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#F43F5E",
              display: "inline-block",
              animation: "vigilPulse 2s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes vigilPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `}</style>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "2rem", marginLeft: "3rem" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.875rem",
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

        {/* Spacer */}
        <div className="hidden md:block" style={{ flex: 1 }} />

        {/* Desktop Right Side */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "1.5rem" }}
        >
          <Link
            href="#"
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.875rem",
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
            Sign in
          </Link>
          <Link
            href="#"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94A3B8",
              backgroundColor: "transparent",
              padding: "0.5rem 1.25rem",
              borderRadius: "0px",
              border: "1px solid #1E293B",
              textDecoration: "none",
              transition: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
              e.currentTarget.style.color = "#0B0D11";
              e.currentTarget.style.borderColor = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#94A3B8";
              e.currentTarget.style.borderColor = "#1E293B";
            }}
          >
            Request Access
          </Link>
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center" style={{ gap: "0.75rem" }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#94A3B8",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: "1px solid #1E293B",
            backgroundColor: "#0B0D11",
            padding: "1rem 1.5rem",
          }}
        >
          <div className="flex flex-col" style={{ gap: "0.75rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  color: "#475569",
                  textDecoration: "none",
                  padding: "0.25rem 0",
                  transition: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                color: "#475569",
                textDecoration: "none",
                padding: "0.25rem 0",
                transition: "none",
              }}
            >
              Sign in
            </Link>
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#94A3B8",
                border: "1px solid #1E293B",
                borderRadius: "0px",
                padding: "0.5rem 1.25rem",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "0.5rem",
                display: "block",
                transition: "none",
              }}
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
