"use client";

import { motion } from "framer-motion";

const SECONDARY_STATS = [
  { value: "2.4M", label: "EVENTS PROCESSED / HOUR" },
  { value: "99.97%", label: "CORRELATION ACCURACY" },
  { value: "< 12s", label: "ALERT TO TRIAGE" },
];

const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.4,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function Metrics() {
  return (
    <section
      style={{
        backgroundColor: "#0B0D11",
        padding: "5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section label */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.6875rem",
              color: "#475569",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            PERFORMANCE
          </span>
        </div>

        {/* Asymmetric 7/5 layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="metrics-grid"
        >
          <style>{`
            @media (min-width: 768px) {
              .metrics-grid {
                grid-template-columns: 7fr 5fr !important;
                gap: 4rem !important;
              }
            }
          `}</style>

          {/* Left — dominant stat */}
          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "#E0E0E0",
                lineHeight: 1,
                display: "block",
                letterSpacing: "-0.02em",
              }}
            >
              {"< 800ms"}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                fontSize: "0.75rem",
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginTop: "1rem",
              }}
            >
              MEAN TIME TO DETECT
            </span>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#475569",
                margin: "1.25rem 0 0 0",
                maxWidth: "32rem",
              }}
            >
              From the moment a threat signature enters our ingestion pipeline
              to a fully correlated, triaged alert delivered to your SOC team.
              Sub-second detection powered by streaming correlation across 47
              data sources with zero batch delay.
            </p>
          </motion.div>

          {/* Right — stacked secondary stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {SECONDARY_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={clipReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                style={{
                  borderBottom: "1px solid #1E293B",
                  padding: "1.5rem 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#13161C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#94A3B8",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: "0.625rem",
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginTop: "0.5rem",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
