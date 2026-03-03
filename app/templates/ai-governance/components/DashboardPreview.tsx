"use client";

import { motion } from "framer-motion";

const TABS = ["Overview", "Models", "Risks", "Compliance"];

const RISK_BARS = [
  { label: "Low Risk", percent: 68, color: "#2D6A4F" },
  { label: "Medium Risk", percent: 24, color: "#D4A843" },
  { label: "High Risk", percent: 8, color: "#C4553A" },
];

const ACTIVITY = [
  { text: "GPT-4 Production — risk score updated", time: "2m ago", color: "#2D6A4F" },
  { text: "Claude Classifier — compliance verified", time: "12m ago", color: "#2D6A4F" },
  { text: "Internal NLP v3 — flagged for review", time: "1h ago", color: "#D4A843" },
];

export default function DashboardPreview() {
  return (
    <section
      className="py-24 md:py-32 px-8 md:px-16"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E5E0",
        borderBottom: "1px solid #E5E5E0",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left text — editorial weight, 5 cols */}
          <div className="md:col-span-5">
            <p
              className="mb-4"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "#8C8C8C",
                letterSpacing: "0.04em",
              }}
            >
              Product
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.2,
                color: "#1A1A1A",
                maxWidth: "20rem",
                margin: "0 0 1.25rem 0",
                letterSpacing: "-0.01em",
              }}
            >
              Built for the way compliance teams{" "}
              <em style={{ fontStyle: "italic" }}>actually</em> work.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#8C8C8C",
                margin: 0,
                maxWidth: "24rem",
              }}
            >
              One view across every model, risk score, and compliance requirement. No spreadsheets. No manual audits.
            </p>
          </div>

          {/* Right widget — 7 cols, smaller and subordinate */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              style={{
                border: "1px solid #E5E5E0",
                borderRadius: "2px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                maxWidth: "520px",
              }}
            >
              {/* Tab bar */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid #E5E5E0" }}
              >
                <div className="flex items-center gap-5">
                  {TABS.map((tab, i) => (
                    <span
                      key={tab}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6875rem",
                        fontWeight: i === 0 ? 500 : 400,
                        color: i === 0 ? "#1A1A1A" : "#8C8C8C",
                        borderBottom: i === 0 ? "1px solid #1A1A1A" : "none",
                        paddingBottom: "2px",
                      }}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.625rem",
                    color: "#8C8C8C",
                  }}
                >
                  Last synced: 2 min ago
                </span>
              </div>

              {/* Body: Risk distribution + Activity */}
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Risk distribution — 3 cols */}
                <div
                  className="md:col-span-3 px-4 py-4"
                  style={{ borderRight: "1px solid #E5E5E0" }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      color: "#8C8C8C",
                      display: "block",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Risk Distribution
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {RISK_BARS.map((bar) => (
                      <div key={bar.label} className="flex items-center gap-2.5">
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.6875rem",
                            color: "#8C8C8C",
                            width: "68px",
                            flexShrink: 0,
                          }}
                        >
                          {bar.label}
                        </span>
                        <div
                          className="flex-1 h-4 relative"
                          style={{
                            backgroundColor: "#F7F6F3",
                            borderRadius: "1px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${bar.percent}%`,
                              height: "100%",
                              backgroundColor: bar.color,
                              borderRadius: "1px",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.6875rem",
                            fontWeight: 500,
                            color: "#1A1A1A",
                            width: "28px",
                            textAlign: "right",
                            flexShrink: 0,
                          }}
                        >
                          {bar.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity — 2 cols */}
                <div className="md:col-span-2 px-4 py-4">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      color: "#8C8C8C",
                      display: "block",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Recent Activity
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {ACTIVITY.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            flexShrink: 0,
                            marginTop: "5px",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <span
                            className="block truncate"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.6875rem",
                              color: "#1A1A1A",
                              lineHeight: 1.4,
                            }}
                          >
                            {item.text}
                          </span>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.5625rem",
                              color: "#8C8C8C",
                            }}
                          >
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
