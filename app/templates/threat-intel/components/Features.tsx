"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    num: "01",
    title: "THREAT CORRELATION",
    description:
      "Real-time cross-feed signal correlation across 400+ intelligence sources. Automated enrichment, deduplication, and confidence scoring for every indicator of compromise.",
  },
  {
    num: "02",
    title: "BEHAVIORAL ANALYSIS",
    description:
      "ML-powered anomaly detection that learns your network's baseline patterns. Identifies lateral movement, data exfiltration, and command-and-control activity before damage occurs.",
  },
  {
    num: "03",
    title: "AUTOMATED TRIAGE",
    description:
      "Instant severity classification and response playbook activation. Reduces mean time to respond from hours to seconds with context-aware escalation routing.",
  },
  {
    num: "04",
    title: "FORENSIC TIMELINE",
    description:
      "Full attack chain reconstruction with nanosecond-precision event ordering. Correlates network, endpoint, and identity telemetry into a single investigative view.",
  },
];

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

export default function Features() {
  return (
    <section
      style={{
        backgroundColor: "#0B0D11",
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(4rem, 6vw, 6rem)",
        paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
        paddingRight: "clamp(1.5rem, 4vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section label */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "0.6875rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#475569",
            margin: "0 0 3rem 0",
          }}
        >
          CAPABILITIES
        </p>

        {/* Editorial vertical list */}
        <div className="flex flex-col">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.num}
              variants={clipReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.06}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
              style={{
                borderBottom: "1px solid #1E293B",
                paddingTop: "clamp(1.5rem, 2vw, 2rem)",
                paddingBottom: "clamp(1.5rem, 2vw, 2rem)",
              }}
            >
              {/* Number */}
              <span
                className="md:col-span-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: i === 0 ? "#E0E0E0" : "#475569",
                }}
              >
                {feature.num}
              </span>

              {/* Title */}
              <h3
                className="md:col-span-3"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "#94A3B8",
                  margin: 0,
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="md:col-span-8"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "#475569",
                  margin: 0,
                  maxWidth: "65ch",
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
