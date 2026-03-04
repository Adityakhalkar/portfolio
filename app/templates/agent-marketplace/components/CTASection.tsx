"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid #2A2A2A",
        borderBottom: "1px solid #2A2A2A",
      }}
    >
      <div className="flex items-start justify-between px-6 md:px-10 py-24 md:py-32">
        {/* Left content — dominant */}
        <div className="flex-1 max-w-[900px]">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="uppercase leading-[0.95] mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              color: "#E8E8E8",
            }}
          >
            STOP BUILDING FROM SCRATCH
            <span style={{ color: "#E8FF47" }}>.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-sm md:text-base mb-10"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              color: "#6B6B6B",
            }}
          >
            Join 4,200+ developers shipping faster with production-ready agents.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-3"
          >
            {/* Primary CTA */}
            <a
              href="#"
              onMouseEnter={() => setHoveredBtn("primary")}
              onMouseLeave={() => setHoveredBtn(null)}
              className="inline-flex items-center px-6 py-3 text-xs tracking-wider uppercase"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                backgroundColor:
                  hoveredBtn === "primary" ? "#d4eb3f" : "#E8FF47",
                color: "#0A0A0A",
                border: "1px solid #E8FF47",
                borderRadius: 0,
                textDecoration: "none",
                cursor: "pointer",
                transition: "background-color 100ms ease",
              }}
            >
              GET STARTED FREE&nbsp;&nbsp;&rarr;
            </a>

            {/* Secondary CTA */}
            <a
              href="#"
              onMouseEnter={() => setHoveredBtn("secondary")}
              onMouseLeave={() => setHoveredBtn(null)}
              className="inline-flex items-center px-6 py-3 text-xs tracking-wider uppercase"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                backgroundColor: "transparent",
                color:
                  hoveredBtn === "secondary" ? "#E8E8E8" : "#6B6B6B",
                border: `1px solid ${
                  hoveredBtn === "secondary" ? "#E8FF47" : "#2A2A2A"
                }`,
                borderRadius: 0,
                textDecoration: "none",
                cursor: "pointer",
                transition:
                  "color 100ms ease, border-color 100ms ease",
              }}
            >
              READ THE DOCS
            </a>
          </motion.div>
        </div>

        {/* Right — build version stamp */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="hidden md:flex flex-col items-end shrink-0 ml-10 pt-2"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 400,
            fontSize: "10px",
            color: "#6B6B6B",
            letterSpacing: "0.05em",
            lineHeight: 1.8,
            textAlign: "right",
          }}
        >
          <span>v2.4.1</span>
          <span>2026.02.25</span>
        </motion.div>
      </div>
    </section>
  );
}
