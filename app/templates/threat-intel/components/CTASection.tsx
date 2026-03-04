"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (delay: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function CTASection() {
  return (
    <section
      style={{
        backgroundColor: "#13161C",
        borderTop: "1px solid #1E293B",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <motion.div
        className="mx-auto"
        style={{
          maxWidth: "1400px",
          paddingTop: "clamp(4rem, 6vw, 6rem)",
          paddingBottom: "clamp(4rem, 6vw, 6rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Label */}
        <motion.span
          custom={0}
          variants={clipReveal}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "0.6875rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#475569",
            display: "block",
            marginBottom: "1.5rem",
          }}
        >
          GET STARTED
        </motion.span>

        {/* Headline */}
        <motion.h2
          custom={0.06}
          variants={clipReveal}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 1.2,
            color: "#94A3B8",
            margin: "0 0 1.25rem 0",
            maxWidth: "40rem",
          }}
        >
          YOUR NETWORK IS BEING{" "}
          <span style={{ color: "#E0E0E0" }}>WATCHED.</span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          custom={0.12}
          variants={clipReveal}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "#475569",
            maxWidth: "32rem",
            margin: "0 0 2rem 0",
          }}
        >
          Deploy Vigil in under fifteen minutes. Full visibility across your
          attack surface from the first packet. No agents to install, no
          infrastructure to manage, no gaps in coverage.
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={0.18}
          variants={clipReveal}
          className="flex flex-wrap items-center"
          style={{ gap: "0.875rem", marginBottom: "2rem" }}
        >
          {/* Primary */}
          <Link
            href="#"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#0B0D11",
              backgroundColor: "#E0E0E0",
              padding: "0.6875rem 1.75rem",
              borderRadius: "0px",
              border: "1px solid #E0E0E0",
              textDecoration: "none",
              display: "inline-block",
              transition: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0B0D11";
              e.currentTarget.style.color = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
              e.currentTarget.style.color = "#0B0D11";
            }}
          >
            REQUEST ACCESS
          </Link>

          {/* Secondary */}
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
              padding: "0.625rem 1.75rem",
              borderRadius: "0px",
              border: "1px solid #1E293B",
              textDecoration: "none",
              display: "inline-block",
              transition: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#94A3B8";
              e.currentTarget.style.color = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1E293B";
              e.currentTarget.style.color = "#94A3B8";
            }}
          >
            SCHEDULE BRIEFING &rarr;
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          custom={0.24}
          variants={clipReveal}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: "0.625rem",
            letterSpacing: "0.04em",
            color: "#475569",
            margin: 0,
          }}
        >
          SOC 2 Type II &middot; ISO 27001 &middot; FedRAMP Authorized
        </motion.p>
      </motion.div>
    </section>
  );
}
