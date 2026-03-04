"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "/templates/ai-governance/features" },
  { label: "Pricing", href: "/templates/ai-governance/pricing" },
  { label: "Documentation", href: "#" },
  { label: "Company", href: "#" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        borderBottom: "1px solid #E5E5E0",
        backgroundColor: "#F7F6F3",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-8 md:px-16"
        style={{
          maxWidth: "1280px",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="/templates/ai-governance"
          className="flex items-center"
          style={{ textDecoration: "none" }}
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

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "2rem" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "#8C8C8C",
                textDecoration: "none",
                transition: "color 200ms ease-out",
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

        {/* Desktop Right Side */}
        <div
          className="hidden md:flex items-center"
          style={{ gap: "1.5rem" }}
        >
          <Link
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.875rem",
              color: "#8C8C8C",
              textDecoration: "none",
              transition: "color 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#8C8C8C";
            }}
          >
            Sign in
          </Link>
          <Link
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "#FFFFFF",
              backgroundColor: "#1A1A1A",
              padding: "0.5rem 1.25rem",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "opacity 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center" style={{ gap: "0.75rem" }}>
          <Link
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.8125rem",
              color: "#FFFFFF",
              backgroundColor: "#1A1A1A",
              padding: "0.4375rem 1rem",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "opacity 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            Request Demo
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#1A1A1A",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
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
            borderTop: "1px solid #E5E5E0",
            backgroundColor: "#F7F6F3",
            padding: "1rem 2rem",
          }}
        >
          <div className="flex flex-col" style={{ gap: "0.75rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  color: "#8C8C8C",
                  textDecoration: "none",
                  padding: "0.25rem 0",
                  transition: "color 200ms ease-out",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                color: "#8C8C8C",
                textDecoration: "none",
                padding: "0.25rem 0",
                transition: "color 200ms ease-out",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
