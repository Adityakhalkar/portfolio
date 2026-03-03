"use client";

import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import Grain from "../components/Grain";
import Scanline from "../components/Scanline";
import Cursor from "../components/Cursor";

const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (delay: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const CAPABILITIES = [
  {
    num: "01",
    title: "THREAT CORRELATION",
    paragraphs: [
      "Vigil ingests and normalizes indicator data from over 400 discrete intelligence sources in real time. Every IP address, domain, file hash, and behavioral signature is deduplicated, enriched with adversary attribution, and scored for confidence before it enters your analyst queue.",
      "The correlation engine maps relationships between seemingly unrelated indicators using graph-based analysis. A single phishing domain can be linked to its hosting infrastructure, the malware families it distributes, the threat actors who operate it, and the campaigns it supports -- all within seconds of first observation.",
      "Cross-feed validation eliminates the false positive noise that buries real threats. When multiple independent sources corroborate an indicator, confidence scoring rises automatically. When a source contradicts the consensus, the anomaly is flagged for human review rather than silently discarded.",
    ],
    specs: [
      "- 400+ intelligence feeds ingested with sub-second normalization latency",
      "- Graph-based indicator correlation across 12 entity types (IP, domain, hash, CVE, actor, campaign, TTP, tool, infrastructure, identity, vulnerability, malware family)",
      "- Automated STIX 2.1 bundle generation for every correlated threat cluster",
      "- Confidence decay modeling with time-weighted scoring and source reliability tracking",
    ],
  },
  {
    num: "02",
    title: "BEHAVIORAL ANALYSIS",
    paragraphs: [
      "Static signatures catch known threats. Behavioral analysis catches everything else. Vigil builds a continuously updated baseline of normal network activity -- traffic patterns, authentication cadences, data flow volumes, process execution chains -- and flags deviations that match adversary tradecraft.",
      "The detection models are trained on real-world attack telemetry, not synthetic lab data. Lateral movement via pass-the-hash, slow data exfiltration over DNS, living-off-the-land binary abuse, and encrypted C2 channels are all identified by their behavioral fingerprints rather than their payload content.",
      "Every anomaly is contextualized against the MITRE ATT&CK framework automatically. Your analysts receive not just an alert, but a mapped technique ID, historical prevalence data, and recommended containment actions specific to your environment topology.",
    ],
    specs: [
      "- Baseline learning period of 72 hours with continuous model refinement",
      "- Detection coverage mapped to 98% of MITRE ATT&CK techniques (v14)",
      "- Encrypted traffic analysis without TLS interception or key escrow",
      "- Adaptive thresholds that account for business-hour variance, seasonal load, and planned maintenance windows",
    ],
  },
  {
    num: "03",
    title: "AUTOMATED TRIAGE",
    paragraphs: [
      "Alert fatigue is the leading cause of missed breaches. Vigil eliminates it by classifying, prioritizing, and routing every alert before a human touches it. Severity is determined not by static rules but by contextual risk -- the same indicator scores differently depending on what it targeted, when it appeared, and what your environment looks like.",
      "Response playbooks activate automatically based on triage output. A credential stuffing wave triggers account lockout workflows. A ransomware beacon triggers network isolation. A supply chain indicator triggers dependency audits. Each playbook is configurable per environment and fully auditable.",
      "Mean time to respond drops from hours to single-digit seconds. Analysts spend their time investigating confirmed threats instead of dismissing noise, and the triage model improves with every human decision fed back into the system.",
    ],
    specs: [
      "- Context-aware severity scoring using asset criticality, exposure, and blast radius",
      "- 340+ pre-built response playbooks covering ransomware, phishing, insider threat, DDoS, and supply chain attack patterns",
      "- Bi-directional SOAR integration with Splunk SOAR, Palo Alto XSOAR, and Tines",
      "- Human-in-the-loop feedback that retrains triage models within 15-minute cycles",
    ],
  },
  {
    num: "04",
    title: "FORENSIC TIMELINE",
    paragraphs: [
      "When an incident occurs, reconstruction speed determines containment speed. Vigil builds a unified forensic timeline from the moment an indicator first appears in your environment -- correlating network flows, endpoint telemetry, identity events, and cloud audit logs into a single chronological view.",
      "Event ordering uses nanosecond-precision timestamps synchronized across all data sources via NTP-validated clock reconciliation. There are no gaps, no clock drift artifacts, and no ambiguity about what happened before what. Every event links to its raw source record for evidence-grade auditability.",
      "The timeline view supports both forward tracking (initial access to current state) and reverse tracking (known impact back to root cause). Investigators can pivot on any entity -- user, host, process, network connection -- to explore the full scope of compromise without switching tools.",
    ],
    specs: [
      "- Nanosecond-precision event ordering with NTP clock reconciliation across sources",
      "- Unified correlation of network, endpoint, identity, and cloud telemetry",
      "- Chain-of-custody evidence packaging for legal and regulatory proceedings",
      "- Full ATT&CK kill chain visualization from initial access through impact",
    ],
  },
];

const SOURCES_TEXT =
  "MITRE ATT&CK  //  OSINT FEEDS  //  DARK WEB MONITORS  //  YARA RULES  //  SIGMA DETECTIONS  //  STIX/TAXII  //  ABUSE.CH  //  VIRUSTOTAL  //  SHODAN  //  CENSYS  //  GREYNOISE  //  ALIENVAULT OTX  //  MANDIANT  //  RECORDED FUTURE  //  CROWDSTRIKE FALCON  //  ";

export default function FeaturesPage() {
  const doubledSources = SOURCES_TEXT + SOURCES_TEXT;

  return (
    <div
      style={{
        backgroundColor: "#0B0D11",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      <Grain />
      <Scanline />
      <NavBar />

      {/* Hero */}
      <section
        style={{
          backgroundColor: "#0B0D11",
          paddingTop: "64px",
        }}
      >
        <motion.div
          className="mx-auto"
          style={{
            maxWidth: "1400px",
            paddingTop: "clamp(4rem, 6vw, 6rem)",
            paddingBottom: "clamp(3rem, 4vw, 4rem)",
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            custom={0}
            variants={clipReveal}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#475569",
              margin: "0 0 2rem 0",
            }}
          >
            CAPABILITIES
          </motion.p>
          <motion.h1
            custom={0.06}
            variants={clipReveal}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#94A3B8",
              margin: "0 0 1.5rem 0",
              maxWidth: "50rem",
            }}
          >
            BUILT FOR THE THREATS YOU{" "}
            <span style={{ color: "#E0E0E0" }}>HAVEN&apos;T SEEN YET.</span>
          </motion.h1>
          <motion.p
            custom={0.12}
            variants={clipReveal}
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "#475569",
              maxWidth: "36rem",
              margin: 0,
            }}
          >
            Four core capabilities working in concert. Each one eliminates a
            failure mode that traditional SIEMs and threat platforms leave
            exposed. Together, they close the gap between detection and response
            to near zero.
          </motion.p>
        </motion.div>
      </section>

      {/* Deep-Dive Sections */}
      {CAPABILITIES.map((cap, idx) => {
        const isAlt = idx % 2 !== 0;
        const bg = isAlt ? "#13161C" : "#0B0D11";
        const textLeft = idx % 2 === 0;

        const textBlock = (
          <div className="md:col-span-5">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: idx === 0 ? "#E0E0E0" : "#475569",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {cap.num}
            </span>
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: "clamp(1rem, 2vw, 1.375rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#94A3B8",
                margin: "0 0 1.5rem 0",
              }}
            >
              {cap.title}
            </h2>
            {cap.paragraphs.map((p, pi) => (
              <p
                key={pi}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "#475569",
                  margin: pi < cap.paragraphs.length - 1 ? "0 0 1rem 0" : "0 0 1.5rem 0",
                  maxWidth: "50ch",
                }}
              >
                {p}
              </p>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {cap.specs.map((spec, si) => (
                <span
                  key={si}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    lineHeight: 1.6,
                    color: "#475569",
                    maxWidth: "55ch",
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        );

        const panelBlock = (
          <div className="md:col-span-7" style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                border: "1px solid #1E293B",
                borderRadius: "0px",
                position: "relative",
                backgroundColor: isAlt ? "#0B0D11" : "#13161C",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475569";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E293B";
              }}
            >
              {/* Top-left bracket */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  width: "16px",
                  height: "16px",
                  borderLeft: "1px solid #475569",
                  borderTop: "1px solid #475569",
                }}
              />
              {/* Bottom-right bracket */}
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  width: "16px",
                  height: "16px",
                  borderRight: "1px solid #475569",
                  borderBottom: "1px solid #475569",
                }}
              />
              {/* Placeholder label */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 400,
                  fontSize: "0.625rem",
                  color: "#475569",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                [{cap.title} INTERFACE]
              </div>
            </div>
          </div>
        );

        return (
          <motion.section
            key={cap.num}
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0.05}
            style={{
              backgroundColor: bg,
              borderTop: idx === 0 ? "1px solid #1E293B" : "none",
              borderBottom: "1px solid #1E293B",
            }}
          >
            <div
              className="mx-auto grid grid-cols-1 md:grid-cols-12"
              style={{
                maxWidth: "1400px",
                paddingTop: "clamp(3rem, 5vw, 5rem)",
                paddingBottom: "clamp(3rem, 5vw, 5rem)",
                paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
                paddingRight: "clamp(1.5rem, 4vw, 4rem)",
                gap: "clamp(2rem, 3vw, 3rem)",
              }}
            >
              {textLeft ? (
                <>
                  {textBlock}
                  {panelBlock}
                </>
              ) : (
                <>
                  {panelBlock}
                  {textBlock}
                </>
              )}
            </div>
          </motion.section>
        );
      })}

      {/* Integration Strip */}
      <section
        style={{
          backgroundColor: "#0B0D11",
          borderBottom: "1px solid #1E293B",
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "1400px",
            paddingTop: "clamp(2.5rem, 4vw, 4rem)",
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#475569",
              margin: "0 0 1.5rem 0",
            }}
          >
            INTELLIGENCE SOURCES
          </p>
        </div>
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "0.75rem 0",
            borderTop: "1px solid #1E293B",
          }}
        >
          <div
            style={{
              display: "inline-block",
              animation: "sourceScroll 50s linear infinite",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 400,
              fontSize: "0.625rem",
              color: "#475569",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {doubledSources}
          </div>
          <style>{`
            @keyframes sourceScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
