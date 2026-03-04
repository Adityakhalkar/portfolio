"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    num: "01",
    title: "Model Registry",
    description:
      "Catalog every AI model, dataset, and deployment across your organization. Automatic discovery, lineage tracking, and ownership mapping.",
  },
  {
    num: "02",
    title: "Risk Scoring",
    description:
      "Continuous risk assessment against regulatory frameworks. Real-time scoring for bias, fairness, transparency, and security vulnerabilities.",
  },
  {
    num: "03",
    title: "Compliance Mapping",
    description:
      "Auto-map your AI systems to EU AI Act, SOC2, ISO 42001, and NIST AI RMF. Gap analysis with prioritized remediation paths.",
  },
  {
    num: "04",
    title: "Audit Trail",
    description:
      "Immutable record of every model change, deployment decision, and risk assessment. Audit-ready reports generated in seconds, not weeks.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
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
      className="py-24 md:py-32 px-8 md:px-16"
      style={{ backgroundColor: "#F7F6F3" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <p
          className="mb-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#8C8C8C",
            letterSpacing: "0.04em",
          }}
        >
          Capabilities
        </p>
        <h2
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            lineHeight: 1.15,
            color: "#1A1A1A",
            maxWidth: "42rem",
            margin: "0 0 4rem 0",
            letterSpacing: "-0.01em",
          }}
        >
          Everything you need to govern AI{" "}
          <em style={{ fontStyle: "italic" }}>at scale.</em>
        </h2>

        {/* Vertical editorial list — not a card grid */}
        <div className="flex flex-col">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.08}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              style={{
                borderTop: "1px solid #E5E5E0",
                paddingTop: "2rem",
                paddingBottom: "2rem",
              }}
            >
              {/* Number — narrow left column */}
              <span
                className="md:col-span-1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "#8C8C8C",
                }}
              >
                {feature.num}
              </span>

              {/* Title — 3 cols */}
              <h3
                className="md:col-span-3"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  color: "#1A1A1A",
                  margin: 0,
                }}
              >
                {feature.title}
              </h3>

              {/* Description — 8 cols, wider right */}
              <p
                className="md:col-span-8"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "#8C8C8C",
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
