"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    num: "01",
    title: "Keyframe Editor",
    description:
      "A timeline that thinks like a designer. Drag keyframes, adjust easing curves with direct manipulation, preview at any speed. No code, no compromises.",
  },
  {
    num: "02",
    title: "Interactive Prototypes",
    description:
      "Connect animations to real user input — hover states, scroll triggers, gesture responses, state transitions. Build the actual interaction, not a mockup of one.",
  },
  {
    num: "03",
    title: "Ship Anywhere",
    description:
      "Export production-ready code in React, CSS, Lottie, or GIF. One animation, every platform. Your engineers get copy-paste code, not a handoff document.",
  },
];

export default function Features() {
  return (
    <section
      className="px-8 md:px-16"
      style={{
        backgroundColor: "#FAFAF8",
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
          }}
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
          What you can do
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            delay: 0.06,
          }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
            lineHeight: 1.1,
            color: "#1A1A1A",
            maxWidth: "28rem",
            margin: "0 0 4rem 0",
            letterSpacing: "-0.03em",
          }}
        >
          Three things. Done right.
        </motion.h2>

        {/* Feature rows */}
        <div className="flex flex-col">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: i * 0.06,
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              style={{
                borderTop: "1px solid #E8E8E8",
                paddingTop: "2.5rem",
                paddingBottom: "2.5rem",
              }}
            >
              {/* Number */}
              <span
                className="md:col-span-1"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.875rem",
                  color: "#FF3366",
                }}
              >
                {feature.num}
              </span>

              {/* Title */}
              <h3
                className="md:col-span-3"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#1A1A1A",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="md:col-span-8"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "#717171",
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
