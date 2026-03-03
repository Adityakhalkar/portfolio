"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import LogoMark from "./LogoMark";

export default function Footer() {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer>
      {/* Main footer */}
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          borderTop: "1px solid rgba(200,149,108,0.08)",
          paddingTop: 56,
          paddingBottom: 56,
          display: "flex",
          flexDirection: isMd ? "row" : "column",
          justifyContent: "space-between",
          alignItems: isMd ? "flex-start" : "stretch",
          gap: isMd ? 64 : 40,
        }}
      >
        {/* Brand */}
        <div style={{ flex: isMd ? "0 0 240px" : "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <LogoMark size={20} />
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1rem",
                color: "#EDE8E0",
              }}
            >
              Transit
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "0.8125rem",
              lineHeight: 1.7,
              color: "#4A443D",
              maxWidth: 220,
              margin: 0,
              marginBottom: 20,
            }}
          >
            Supply chain visibility for enterprises
            that move physical goods at scale.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { icon: Github, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <SocialIcon key={i} icon={Icon} href={social.href} />
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        <div
          style={{
            display: "flex",
            gap: isMd ? 64 : 40,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              heading: "Product",
              links: ["Tracking", "Alerts", "Intelligence", "API"],
            },
            {
              heading: "Company",
              links: ["About", "Careers", "Press", "Contact"],
            },
            {
              heading: "Resources",
              links: ["Docs", "Status", "Changelog", "Security"],
            },
          ].map((col) => (
            <div key={col.heading} style={{ minWidth: 100 }}>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  color: "#7A7067",
                  display: "block",
                  marginBottom: 16,
                  letterSpacing: "0.04em",
                }}
              >
                {col.heading}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {col.links.map((link) => (
                  <FooterLink key={link} label={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          borderTop: "1px solid rgba(200,149,108,0.06)",
          paddingTop: 20,
          paddingBottom: 20,
          display: "flex",
          flexDirection: isMd ? "row" : "column",
          justifyContent: "space-between",
          alignItems: isMd ? "center" : "flex-start",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.625rem",
              color: "#4A443D",
              letterSpacing: "0.06em",
            }}
          >
            2026 Transit Inc.
          </span>
          {/* Live status indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#6B9E8A",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5625rem",
                color: "#4A443D",
                letterSpacing: "0.04em",
              }}
            >
              All systems operational
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "SOC 2"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.625rem",
                color: "#4A443D",
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Back to portfolio */}
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          borderTop: "1px solid rgba(200,149,108,0.06)",
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Link
          href="/templates"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            color: "#4A443D",
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}
        >
          &larr; Back to templates
        </Link>
      </div>
    </footer>
  );
}

function SocialIcon({
  icon: Icon,
  href,
}: {
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none", display: "flex" }}
    >
      <Icon
        size={16}
        strokeWidth={1.5}
        color={hovered ? "#C8956C" : "#4A443D"}
      />
    </a>
  );
}

function FooterLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 400,
        fontSize: "0.8125rem",
        color: hovered ? "#C8956C" : "#4A443D",
        textDecoration: "none",
        transition: "color 0.25s ease",
      }}
    >
      {label}
    </a>
  );
}
