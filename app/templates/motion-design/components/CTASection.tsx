"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="px-8 md:px-16"
      style={{
        backgroundColor: "#FAFAF8",
        borderTop: "1px solid #E8E8E8",
        paddingTop: "clamp(5rem, 8vw, 7rem)",
        paddingBottom: "clamp(5rem, 8vw, 7rem)",
      }}
    >
      <motion.div
        style={{ maxWidth: "1280px", margin: "0 auto" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
        }}
      >
        {/* Section label */}
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "#717171",
            display: "block",
            marginBottom: "1rem",
            letterSpacing: "0.04em",
          }}
        >
          Get started
        </span>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            color: "#1A1A1A",
            maxWidth: "32rem",
            margin: "0 0 1.5rem 0",
            letterSpacing: "-0.03em",
          }}
        >
          Start designing motion today.
        </h2>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "#717171",
            maxWidth: "26rem",
            margin: "0 0 2rem 0",
          }}
        >
          Join thousands of product teams who ship better interactions with
          Motive. Free plan, no credit card, export in minutes.
        </p>

        <div
          className="flex items-center flex-wrap"
          style={{ gap: "1rem", marginBottom: "2rem" }}
        >
          {/* Primary pill button with spring hover */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "#FFFFFF",
                backgroundColor: "#FF3366",
                padding: "0.8125rem 2rem",
                borderRadius: "999px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Start for free
            </Link>
          </motion.div>

          {/* Secondary pill outline button */}
          <Link
            href="#"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "#717171",
              backgroundColor: "transparent",
              padding: "0.75rem 1.75rem",
              borderRadius: "999px",
              border: "1px solid #E8E8E8",
              textDecoration: "none",
              transition: "color 200ms, border-color 200ms",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#1A1A1A";
              el.style.borderColor = "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#717171";
              el.style.borderColor = "#E8E8E8";
            }}
          >
            Talk to sales
          </Link>
        </div>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            color: "#717171",
          }}
        >
          Free for individuals &middot; Team plans from $19/seat &middot;
          Enterprise custom
        </p>
      </motion.div>
    </section>
  );
}
