"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const threatEvents = [
  "CVE-2026-4481 DETECTED // SEVERITY: HIGH",
  "BRUTE FORCE ATTEMPT // 192.168.1.0/24",
  "EXFIL PATTERN MATCHED // OUTBOUND 443",
  "RANSOMWARE SIGNATURE // SHA256:9f3a...",
  "DNS TUNNELING // ns1.suspect-domain.io",
  "LATERAL MOVEMENT // KERBEROASTING",
  "C2 BEACON INTERVAL // 45s HEARTBEAT",
  "ZERO-DAY EXPLOIT // KERNEL PRIV ESC",
];

const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (delay: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0,
      delay,
    },
  }),
};

function LiveTimestamp() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const y = now.getUTCFullYear();
      const mo = String(now.getUTCMonth() + 1).padStart(2, "0");
      const d = String(now.getUTCDate()).padStart(2, "0");
      const h = String(now.getUTCHours()).padStart(2, "0");
      const mi = String(now.getUTCMinutes()).padStart(2, "0");
      const s = String(now.getUTCSeconds()).padStart(2, "0");
      return `[${y}.${mo}.${d} // ${h}:${mi}:${s} UTC]`;
    };
    setTime(format());
    const interval = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 400,
        fontSize: "0.6875rem",
        color: "#475569",
        textAlign: "right",
      }}
    >
      {time}
    </div>
  );
}

export default function Hero() {
  const feedText = threatEvents.join("     ///     ");
  const doubledFeed = feedText + "     ///     " + feedText;

  return (
    <section
      style={{
        backgroundColor: "#0B0D11",
        paddingTop: "64px",
      }}
    >
      <div
        className="mx-auto px-6 md:px-12"
        style={{
          maxWidth: "1400px",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Live Timestamp — top right */}
        <motion.div
          variants={clipReveal}
          initial="hidden"
          animate="visible"
          custom={0}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "3rem",
          }}
        >
          <LiveTimestamp />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={clipReveal}
          initial="hidden"
          animate="visible"
          custom={0.08}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1.1,
            margin: "0 0 2rem 0",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#94A3B8" }}>
            REAL-TIME THREAT INTELLIGENCE
          </span>
          <br />
          <span style={{ color: "#94A3B8" }}>THAT </span>
          <span style={{ color: "#E0E0E0" }}>NEVER</span>
          <span style={{ color: "#94A3B8" }}> SLEEPS.</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          variants={clipReveal}
          initial="hidden"
          animate="visible"
          custom={0.16}
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#475569",
            maxWidth: "32rem",
            margin: "0 0 2.5rem 0",
          }}
        >
          Vigil correlates threat feeds from 140+ sources in real time,
          mapping indicators of compromise against your attack surface.
          Automated triage. Zero analyst fatigue. Every alert enriched
          with adversary context before it reaches your SOC.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={clipReveal}
          initial="hidden"
          animate="visible"
          custom={0.24}
          className="flex items-center flex-wrap"
          style={{ gap: "1rem", marginBottom: "4rem" }}
        >
          <button
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: "0.8125rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#0B0D11",
              backgroundColor: "#E0E0E0",
              padding: "0.75rem 1.75rem",
              borderRadius: "0px",
              border: "1px solid #E0E0E0",
              cursor: "pointer",
              textDecoration: "none",
              transition: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0B0D11";
              e.currentTarget.style.color = "#E0E0E0";
              e.currentTarget.style.borderColor = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
              e.currentTarget.style.color = "#0B0D11";
              e.currentTarget.style.borderColor = "#E0E0E0";
            }}
          >
            Request Access
          </button>
          <button
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: "0.8125rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94A3B8",
              backgroundColor: "transparent",
              padding: "0.75rem 1.75rem",
              borderRadius: "0px",
              border: "1px solid #1E293B",
              cursor: "pointer",
              textDecoration: "none",
              transition: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E0E0E0";
              e.currentTarget.style.color = "#0B0D11";
              e.currentTarget.style.borderColor = "#E0E0E0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#94A3B8";
              e.currentTarget.style.borderColor = "#1E293B";
            }}
          >
            {"VIEW LIVE DEMO \u2192"}
          </button>
        </motion.div>
      </div>

      {/* Threat Feed Strip */}
      <motion.div
        variants={clipReveal}
        initial="hidden"
        animate="visible"
        custom={0.32}
        style={{
          borderTop: "1px solid #1E293B",
          borderBottom: "1px solid #1E293B",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "0.625rem 0",
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "threatScroll 40s linear infinite",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: "0.625rem",
            color: "#475569",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {doubledFeed}
        </div>
        <style>{`
          @keyframes threatScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
