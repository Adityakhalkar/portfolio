"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "BROWSE THE VAULT",
    description:
      "Search 2,800+ agents by category, stack, or use case. Every agent includes live metrics, deployment logs, and user reviews.",
  },
  {
    number: "02",
    title: "TEST IN SANDBOX",
    description:
      "Spin up any agent in an isolated sandbox environment. Send test payloads, inspect outputs, validate before you commit.",
  },
  {
    number: "03",
    title: "DEPLOY IN SECONDS",
    description:
      "One command. Your agent runs in our managed infrastructure or deploys to your own stack via Docker. Zero config.",
  },
] as const;

export default function Features() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <section
      className="w-full px-6 md:px-10 py-20"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Section title */}
      <h2
        className="text-sm tracking-[0.2em] uppercase mb-16"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          color: "#6B6B6B",
        }}
      >
        HOW IT WORKS
      </h2>

      {/* Steps */}
      <div className="w-full">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
          >
            <div
              onMouseEnter={() => setHoveredStep(step.number)}
              onMouseLeave={() => setHoveredStep(null)}
              className="group"
              style={{
                borderTop: "1px solid #2A2A2A",
                borderBottom:
                  index === STEPS.length - 1 ? "1px solid #2A2A2A" : "none",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start py-10 md:py-14">
                {/* Step number — bleeds into left margin */}
                <motion.div
                  className="shrink-0 md:-ml-2 mb-4 md:mb-0 md:w-[200px] lg:w-[280px]"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    lineHeight: 0.85,
                    color:
                      hoveredStep === step.number ? "#E8FF47" : "#2A2A2A",
                    transition: "color 100ms ease",
                    userSelect: "none",
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <div className="md:pl-8 lg:pl-16 pt-1">
                  <h3
                    className="text-xl uppercase mb-3 leading-tight"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700,
                      color: "#E8E8E8",
                      transition: "color 100ms ease",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-md"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 400,
                      color: "#6B6B6B",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
