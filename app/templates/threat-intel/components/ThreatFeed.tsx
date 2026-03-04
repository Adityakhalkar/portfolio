"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const THREATS = [
  {
    id: "TF-4821",
    severity: "CRITICAL" as const,
    name: "RANSOMWARE C2 CALLBACK",
    source: "185.220.101.34",
    description:
      "Outbound beacon detected to known LockBit 3.0 command-and-control infrastructure. Payload staging observed on port 8443.",
    timestamp: "14:32:07",
  },
  {
    id: "TF-4822",
    severity: "HIGH" as const,
    name: "CREDENTIAL STUFFING WAVE",
    source: "Multiple rotating IPs (Tor exit nodes)",
    description:
      "Distributed authentication attempts against /api/v2/auth endpoint. 14,200 unique credential pairs in last 90 seconds.",
    timestamp: "14:31:44",
  },
  {
    id: "TF-4823",
    severity: "MEDIUM" as const,
    name: "SUSPICIOUS DNS EXFILTRATION",
    source: "10.0.12.87 (internal host)",
    description:
      "Anomalous TXT record queries to *.data.exfil-cdn[.]net. Encoded payload fragments detected in subdomain labels.",
    timestamp: "14:29:18",
  },
  {
    id: "TF-4824",
    severity: "LOW" as const,
    name: "DEPRECATED TLS HANDSHAKE",
    source: "legacy-payments.internal:443",
    description:
      "TLS 1.0 negotiation from legacy payment gateway. Cipher suite TLS_RSA_WITH_RC4_128_SHA flagged for deprecation.",
    timestamp: "14:27:53",
  },
];

const SEVERITY_STYLES: Record<
  "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  React.CSSProperties
> = {
  CRITICAL: {
    backgroundColor: "#F43F5E",
    color: "#0B0D11",
    padding: "2px 6px",
  },
  HIGH: {
    backgroundColor: "transparent",
    color: "#F43F5E",
    border: "1px solid #F43F5E",
    padding: "2px 6px",
  },
  MEDIUM: {
    backgroundColor: "transparent",
    color: "#94A3B8",
    border: "1px solid #94A3B8",
    padding: "2px 6px",
  },
  LOW: {
    backgroundColor: "transparent",
    color: "#475569",
    border: "1px solid #475569",
    padding: "2px 6px",
  },
};

const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function ThreatFeed() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      style={{
        backgroundColor: "#0B0D11",
        padding: "5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "2.5rem",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
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
            LIVE FEED
          </span>
          <style>{`
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
              50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(34,197,94,0); }
            }
          `}</style>
        </div>

        {/* 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
          }}
          className="md:!grid-cols-2"
        >
          <style>{`
            @media (min-width: 768px) {
              .md\\:!grid-cols-2 {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
          `}</style>
          {THREATS.map((threat, i) => (
            <motion.div
              key={threat.id}
              variants={clipReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              style={{
                border: "1px solid #1E293B",
                borderRadius: "0px",
                padding: "1.5rem",
                backgroundColor:
                  hoveredCard === threat.id ? "#13161C" : "transparent",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#13161C";
                setHoveredCard(threat.id);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                setHoveredCard(null);
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    color: "#475569",
                  }}
                >
                  {"[ "}
                  {threat.id}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: "0.625rem",
                    color: "#475569",
                  }}
                >
                  {threat.timestamp}
                </span>
              </div>

              {/* Severity + Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: "0.5625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: "0px",
                    lineHeight: 1,
                    display: "inline-block",
                    ...SEVERITY_STYLES[threat.severity],
                  }}
                >
                  {threat.severity}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    color: "#E0E0E0",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {threat.name}
                </span>
              </div>

              {/* Source */}
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: "0.625rem",
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  SRC:{" "}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: "0.6875rem",
                    color: "#94A3B8",
                  }}
                >
                  {threat.source}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.8125rem",
                  lineHeight: 1.6,
                  color: "#94A3B8",
                  margin: 0,
                }}
              >
                {threat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
