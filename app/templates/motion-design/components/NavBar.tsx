"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
];

const COLORS = {
  bg: "#FAFAF8",
  accent: "#FF3366",
  dark: "#1A1A1A",
  muted: "#717171",
  white: "#FFFFFF",
  border: "#E8E8E8",
} as const;

const FONT = {
  syne: "'Syne', sans-serif",
  manrope: "'Manrope', sans-serif",
} as const;

const springTransition = { type: "spring", stiffness: 400, damping: 17 } as const;

const dropdownVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, height: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } },
};

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkHover = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = COLORS.dark;
  }, []);

  const handleLinkLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = COLORS.muted;
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav
      style={{ backgroundColor: COLORS.bg }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="mx-auto flex items-center justify-between px-6 md:px-12 lg:px-16"
        style={{ maxWidth: "1280px", height: "72px" }}
      >
        {/* Logo — left-dominant */}
        <Link
          href="/templates/motion-design"
          style={{
            fontFamily: FONT.syne,
            fontWeight: 800,
            fontSize: "1.3rem",
            color: COLORS.dark,
            textDecoration: "none",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          motive
        </Link>

        {/* Desktop nav links — center-left bias */}
        <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: FONT.manrope,
                fontWeight: 400,
                fontSize: "0.875rem",
                color: COLORS.muted,
                textDecoration: "none",
                transition: "color 200ms ease",
              }}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right CTA group */}
        <div className="hidden md:flex items-center" style={{ gap: "1.5rem" }}>
          <Link
            href="#"
            style={{
              fontFamily: FONT.manrope,
              fontWeight: 500,
              fontSize: "0.875rem",
              color: COLORS.muted,
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            Sign in
          </Link>
          <motion.a
            href="#"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
            style={{
              fontFamily: FONT.manrope,
              fontWeight: 600,
              fontSize: "0.8125rem",
              color: COLORS.white,
              backgroundColor: COLORS.accent,
              padding: "0.5rem 1.375rem",
              borderRadius: "999px",
              textDecoration: "none",
              display: "inline-block",
              lineHeight: 1.5,
              cursor: "pointer",
            }}
          >
            Start free
          </motion.a>
        </div>

        {/* Mobile right group: pill CTA + hamburger */}
        <div className="flex md:hidden items-center" style={{ gap: "0.75rem" }}>
          <motion.a
            href="#"
            whileTap={{ scale: 0.95 }}
            transition={springTransition}
            style={{
              fontFamily: FONT.manrope,
              fontWeight: 600,
              fontSize: "0.8125rem",
              color: COLORS.white,
              backgroundColor: COLORS.accent,
              padding: "0.4375rem 1rem",
              borderRadius: "999px",
              textDecoration: "none",
              display: "inline-block",
              lineHeight: 1.5,
            }}
          >
            Start free
          </motion.a>
          <button
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: COLORS.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="5" y1="5" x2="17" y2="17" />
                  <line x1="17" y1="5" x2="5" y2="17" />
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

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: COLORS.bg }}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="flex flex-col px-6 pb-6 pt-2"
              style={{ gap: "0.25rem" }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  style={{
                    fontFamily: FONT.manrope,
                    fontWeight: 400,
                    fontSize: "1rem",
                    color: COLORS.muted,
                    textDecoration: "none",
                    padding: "0.625rem 0",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#"
                onClick={closeMobile}
                style={{
                  fontFamily: FONT.manrope,
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: COLORS.muted,
                  textDecoration: "none",
                  padding: "0.625rem 0",
                  transition: "color 200ms ease",
                  borderTop: `1px solid ${COLORS.border}`,
                  marginTop: "0.25rem",
                  paddingTop: "0.875rem",
                }}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
