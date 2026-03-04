"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Map, BarChart3, Shield, BookOpen } from "lucide-react";
import LogoMark from "./LogoMark";

const navItems = [
  { label: "Platform", icon: Map },
  { label: "Results", icon: BarChart3 },
  { label: "Capabilities", icon: Shield },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(12,10,9,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(200,149,108,0.1)"
          : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <Link
          href="/templates/supply-chain"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <LogoMark size={22} />
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "#EDE8E0",
              letterSpacing: "0.02em",
            }}
          >
            Transit
          </span>
        </Link>

        {/* Nav links with icons */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink key={item.label} label={item.label} icon={item.icon} />
          ))}
        </div>

        {/* CTA */}
        <NavCTA />
      </div>
    </nav>
  );
}

function NavLink({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#${label.toLowerCase()}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 400,
        fontSize: "0.8125rem",
        color: hovered ? "#EDE8E0" : "#7A7067",
        textDecoration: "none",
        transition: "color 0.3s ease",
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Icon size={14} strokeWidth={1.5} color={hovered ? "#EDE8E0" : "#4A443D"} />
      {label}
    </a>
  );
}

function NavCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#close"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "0.8125rem",
        color: hovered ? "#0C0A09" : "#C8956C",
        backgroundColor: hovered ? "#C8956C" : "transparent",
        border: "1px solid rgba(200,149,108,0.3)",
        borderColor: hovered ? "#C8956C" : "rgba(200,149,108,0.3)",
        borderRadius: 100,
        padding: "8px 24px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.3s ease",
        letterSpacing: "0.02em",
      }}
    >
      Get started
    </a>
  );
}
