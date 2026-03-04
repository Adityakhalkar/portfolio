"use client";

import { motion } from "framer-motion";

export default function Quote() {
  return (
    <section
      className="px-8 md:px-16"
      style={{
        backgroundColor: "#F7F6F3",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        borderTop: "1px solid #E5E5E0",
        borderBottom: "1px solid #E5E5E0",
      }}
    >
      <motion.div
        style={{ maxWidth: "1280px", margin: "0 auto" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <blockquote
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              lineHeight: 1.5,
              color: "#1A1A1A",
              maxWidth: "48rem",
              margin: "0 0 1.5rem 0",
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;We went from a 6-week manual audit cycle to generating
            board-ready compliance reports in under 4 hours. Aegis didn&apos;t
            just save us time — it changed how we think about AI risk.&rdquo;
          </p>
          <footer
            className="flex items-center"
            style={{ gap: "0.75rem" }}
          >
            <div
              style={{
                width: "1.5rem",
                height: "1px",
                backgroundColor: "#E5E5E0",
              }}
            />
            <cite
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.8125rem",
                fontStyle: "normal",
                color: "#8C8C8C",
              }}
            >
              Head of AI Governance, European Banking Group
            </cite>
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}
