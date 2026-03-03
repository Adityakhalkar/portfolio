"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const models = [
  {
    name: "GPT-4 Production",
    risk: "Low Risk",
    riskColor: "#2D6A4F",
    compliance: "Compliant",
    complianceColor: "#2D6A4F",
  },
  {
    name: "Claude Classifier",
    risk: "Medium Risk",
    riskColor: "#D4A843",
    compliance: "Review needed",
    complianceColor: "#D4A843",
  },
  {
    name: "Internal NLP v3",
    risk: "High Risk",
    riskColor: "#C4553A",
    compliance: "Non-compliant",
    complianceColor: "#C4553A",
  },
];

function DashboardWidget() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "2px",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        border: "1px solid #E5E5E0",
        padding: "1rem 1.25rem",
        width: "100%",
        maxWidth: "320px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
          paddingBottom: "0.625rem",
          borderBottom: "1px solid #E5E5E0",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.75rem",
            color: "#1A1A1A",
          }}
        >
          Model Registry
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.625rem",
            color: "#8C8C8C",
          }}
        >
          3 models
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {models.map((model, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: "0.5rem",
              alignItems: "center",
              padding: "0.375rem 0",
              borderBottom:
                i < models.length - 1 ? "1px solid #F0F0EC" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', 'SF Mono', monospace",
                fontSize: "0.6875rem",
                fontWeight: 400,
                color: "#1A1A1A",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {model.name}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.5625rem",
                fontWeight: 500,
                color: "#FFFFFF",
                backgroundColor: model.riskColor,
                padding: "0.125rem 0.375rem",
                borderRadius: "2px",
                whiteSpace: "nowrap",
                textAlign: "center",
                minWidth: "56px",
              }}
            >
              {model.risk}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.625rem",
                fontWeight: 400,
                color: model.complianceColor,
                whiteSpace: "nowrap",
                textAlign: "right",
                minWidth: "72px",
              }}
            >
              {model.compliance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

export default function Hero() {
  return (
    <section
      style={{ backgroundColor: "#F7F6F3" }}
      className="py-24 md:py-32 px-8 md:px-16"
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto" }}
        className="flex flex-col lg:flex-row items-start"
      >
        {/* Left Column — 60% */}
        <div
          className="w-full lg:w-[60%]"
          style={{ paddingRight: "clamp(0rem, 3vw, 4rem)" }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 400,
                color: "#8C8C8C",
                border: "1px solid #E5E5E0",
                borderRadius: "100px",
                padding: "0.25rem 0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              AI Governance Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.15,
              color: "#1A1A1A",
              margin: "0 0 1.5rem 0",
              letterSpacing: "-0.02em",
            }}
          >
            Govern every AI system{" "}
            <br className="hidden sm:block" />
            with <span style={{ fontStyle: "italic" }}>confidence.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "#8C8C8C",
              maxWidth: "32rem",
              margin: "0 0 2rem 0",
            }}
          >
            Continuous monitoring, risk scoring, and regulatory compliance for
            enterprise AI &mdash; from model registry to audit-ready reporting.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex items-center flex-wrap"
            style={{ gap: "1.25rem", marginBottom: "2rem" }}
          >
            <Link
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: "#FFFFFF",
                backgroundColor: "#1A1A1A",
                padding: "0.625rem 1.5rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "opacity 200ms ease-out",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              Request a Demo
            </Link>
            <Link
              href="/templates/ai-governance/features"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                color: "#8C8C8C",
                textDecoration: "none",
                transition: "color 200ms ease-out",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#8C8C8C";
              }}
            >
              See how it works
              <span style={{ fontSize: "1rem" }}>&rarr;</span>
            </Link>
          </motion.div>

          {/* Trust Line */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "#8C8C8C",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Trusted by 200+ enterprises &middot; SOC2 &middot; ISO 27001
            &middot; EU AI Act ready
          </motion.p>
        </div>

        {/* Right Column — 40%, widget aligned to start not centered */}
        <motion.div
          className="w-full lg:w-[40%] flex justify-start lg:justify-end mt-12 lg:mt-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          <DashboardWidget />
        </motion.div>
      </div>
    </section>
  );
}
