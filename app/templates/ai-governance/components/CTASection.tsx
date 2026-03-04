"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function CTASection() {
  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E5E0",
      }}
    >
      <motion.div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingTop: "clamp(5rem, 7vw, 7rem)",
          paddingBottom: "clamp(5rem, 7vw, 7rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Left-aligned, editorial — not centered */}
        <motion.span
          custom={0}
          variants={fadeUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            color: "#8C8C8C",
            letterSpacing: "0.04em",
            display: "block",
            marginBottom: "1.25rem",
          }}
        >
          Get started
        </motion.span>

        <motion.h2
          custom={1}
          variants={fadeUp}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.15,
            color: "#1A1A1A",
            maxWidth: "36rem",
            margin: "0 0 1.25rem 0",
            letterSpacing: "-0.01em",
          }}
        >
          Ready to bring your AI{" "}
          <em style={{ fontStyle: "italic" }}>under control</em>?
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: "#8C8C8C",
            maxWidth: "28rem",
            margin: "0 0 2rem 0",
          }}
        >
          Join 200+ enterprises that trust Aegis to govern their AI systems.
          Get audit-ready in weeks, not months.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          className="flex flex-wrap items-center"
          style={{ gap: "0.875rem", marginBottom: "2rem" }}
        >
          <Link
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "#FFFFFF",
              backgroundColor: "#1A1A1A",
              padding: "0.6875rem 1.75rem",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "opacity 200ms ease-out",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            Request a Demo
          </Link>
          <Link
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "#8C8C8C",
              backgroundColor: "transparent",
              padding: "0.625rem 1.75rem",
              borderRadius: "2px",
              border: "1px solid #E5E5E0",
              textDecoration: "none",
              transition: "color 200ms ease-out, border-color 200ms ease-out",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#1A1A1A";
              el.style.borderColor = "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#8C8C8C";
              el.style.borderColor = "#E5E5E0";
            }}
          >
            Talk to Sales
          </Link>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            color: "#8C8C8C",
            letterSpacing: "0.01em",
          }}
        >
          No commitment required &middot; 30-minute setup call &middot;
          Enterprise-grade security
        </motion.p>
      </motion.div>
    </section>
  );
}
