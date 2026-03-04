"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const FEATURES = [
  {
    num: "01",
    title: "Model Registry",
    headline: "Know every AI system in your organization.",
    description:
      "Automatically discover and catalog every model, dataset, and deployment across your enterprise. Track lineage from training data to production endpoint with full ownership mapping.",
    details: [
      "Auto-discovery across cloud providers and on-premise infrastructure",
      "Model lineage tracking from data source to deployment",
      "Ownership and responsibility assignment with RACI matrix",
      "Version control integration for model artifacts",
      "Custom metadata fields and tagging taxonomy",
    ],
  },
  {
    num: "02",
    title: "Risk Scoring",
    headline: "Continuous, multi-dimensional risk assessment.",
    description:
      "Go beyond static checklists. Aegis evaluates your AI systems in real-time against bias, fairness, transparency, security, and operational risk — scored against the regulatory frameworks that matter to your industry.",
    details: [
      "Real-time risk scoring across 6 dimensions",
      "Bias and fairness detection with demographic parity analysis",
      "Transparency scoring based on model explainability",
      "Security vulnerability assessment for model endpoints",
      "Drift detection and automated re-scoring triggers",
    ],
  },
  {
    num: "03",
    title: "Compliance Mapping",
    headline: "Auto-map to every framework that matters.",
    description:
      "Aegis maps your AI systems to EU AI Act, SOC2, ISO 42001, NIST AI RMF, and industry-specific frameworks. Get gap analysis with prioritized remediation paths — not just a checklist, but a plan.",
    details: [
      "Pre-built mappings for EU AI Act, SOC2, ISO 42001, NIST AI RMF",
      "Automated gap analysis with severity scoring",
      "Prioritized remediation paths with effort estimation",
      "Cross-framework correlation to avoid duplicate work",
      "Custom framework support for internal policies",
    ],
  },
  {
    num: "04",
    title: "Audit Trail",
    headline: "Audit-ready in seconds, not weeks.",
    description:
      "Every model change, deployment decision, risk assessment, and compliance update is recorded in an immutable audit log. Generate regulator-ready reports with a single click.",
    details: [
      "Immutable, append-only audit log with cryptographic verification",
      "One-click report generation for regulators and auditors",
      "Full event timeline with user attribution",
      "Automated evidence collection for compliance reviews",
      "Export in PDF, CSV, and XBRL formats",
    ],
  },
  {
    num: "05",
    title: "Integrations",
    headline: "Fits into the tools you already use.",
    description:
      "Aegis connects to your existing ML platforms, CI/CD pipelines, and cloud infrastructure. No rip-and-replace — just governance that works alongside your engineering workflows.",
    details: [
      "Native integrations with AWS SageMaker, Azure ML, GCP Vertex AI",
      "CI/CD hooks for GitHub Actions, GitLab CI, Jenkins",
      "SIEM integration for security event correlation",
      "Slack and Teams notifications for risk alerts",
      "REST API and webhooks for custom integrations",
    ],
  },
  {
    num: "06",
    title: "Reporting & Analytics",
    headline: "Board-ready insights, always current.",
    description:
      "Transform raw governance data into executive dashboards, trend analysis, and compliance scorecards. Give stakeholders at every level the visibility they need.",
    details: [
      "Executive dashboards with real-time compliance posture",
      "Trend analysis for risk score evolution over time",
      "Team and department-level governance scorecards",
      "Scheduled report delivery to stakeholders",
      "Custom report builder with drag-and-drop widgets",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div
      style={{
        backgroundColor: "#F7F6F3",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      <NavBar />

      {/* Header */}
      <section
        className="px-8 md:px-16"
        style={{
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "#8C8C8C",
              letterSpacing: "0.04em",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Platform
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.15,
              color: "#1A1A1A",
              margin: "0 0 1rem 0",
              letterSpacing: "-0.01em",
            }}
          >
            Everything you need to govern AI{" "}
            <em style={{ fontStyle: "italic" }}>responsibly.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.16,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: "#8C8C8C",
              margin: 0,
              maxWidth: "36rem",
            }}
          >
            Six core capabilities that take you from ungoverned AI sprawl to
            audit-ready compliance.
          </motion.p>
        </div>
      </section>

      {/* Features list */}
      <section
        className="px-8 md:px-16"
        style={{ paddingBottom: "5rem" }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto" }}
          className="flex flex-col"
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                borderTop: "1px solid #E5E5E0",
                paddingTop: "3rem",
                paddingBottom: "3rem",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                {/* Left: number + title */}
                <div className="md:col-span-4">
                  <motion.span
                    custom={0}
                    variants={fadeUp}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#8C8C8C",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {feature.num}
                  </motion.span>
                  <motion.h2
                    custom={0.5}
                    variants={fadeUp}
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.2,
                      color: "#1A1A1A",
                      margin: "0 0 0.75rem 0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </motion.h2>
                  <motion.p
                    custom={1}
                    variants={fadeUp}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "#1A1A1A",
                      margin: 0,
                    }}
                  >
                    {feature.headline}
                  </motion.p>
                </div>

                {/* Right: description + details */}
                <div className="md:col-span-8">
                  <motion.p
                    custom={1}
                    variants={fadeUp}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "#8C8C8C",
                      margin: "0 0 1.5rem 0",
                    }}
                  >
                    {feature.description}
                  </motion.p>
                  <motion.ul
                    custom={2}
                    variants={fadeUp}
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {feature.details.map((detail) => (
                      <li
                        key={detail}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: "0.875rem",
                          color: "#1A1A1A",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: "#2D6A4F",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            lineHeight: 1.5,
                            flexShrink: 0,
                          }}
                        >
                          &#10003;
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E5E5E0",
        }}
      >
        <motion.div
          className="mx-auto flex flex-col items-center text-center"
          style={{
            maxWidth: "1280px",
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            custom={0}
            variants={fadeUp}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              lineHeight: 1.15,
              color: "#1A1A1A",
              maxWidth: "36rem",
              margin: "0 0 1.25rem 0",
              letterSpacing: "-0.01em",
            }}
          >
            See Aegis in action.
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#8C8C8C",
              maxWidth: "28rem",
              margin: "0 0 2rem 0",
            }}
          >
            Book a 30-minute walkthrough tailored to your compliance needs.
          </motion.p>
          <motion.div
            custom={2}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center"
            style={{ gap: "0.875rem" }}
          >
            <Link
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: "#FFFFFF",
                backgroundColor: "#1A1A1A",
                padding: "0.6875rem 1.75rem",
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
              href="/templates/ai-governance/pricing"
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
              View pricing
              <span style={{ fontSize: "1rem" }}>&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
