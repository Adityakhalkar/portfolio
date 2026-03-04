"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Bell,
  Route,
  FileCheck,
  Network,
  DollarSign,
  Check,
  ArrowRight,
} from "lucide-react";

const capabilityIcons = [MapPin, Bell, Route, FileCheck, Network, DollarSign];
const capabilityColors = ["#6B9E8A", "#D4845A", "#C8956C", "#7B8FA8", "#6B9E8A", "#8BC4A0"];

const capabilities = [
  {
    num: "01",
    title: "Carrier-agnostic tracking",
    description:
      "Unified tracking across 200+ carriers. FTL, LTL, ocean, air, and rail on one protocol. Real-time status updates aggregated into a single operations view. Live within 48 hours.",
    specs: [
      "EDI 214/990 + API + scraping fallback",
      "Sub-5-minute polling intervals",
      "Multimodal shipment support",
      "Carrier onboarding in < 48hrs",
    ],
  },
  {
    num: "02",
    title: "Predictive disruption alerts",
    description:
      "ML models trained on 8 years of logistics data flag disruptions 4-6 hours before carrier notification. Weather, port congestion, customs holds, capacity shifts scored by probability and shipment impact.",
    specs: [
      "14 disruption categories",
      "4-6 hour advance warning",
      "Impact scoring per shipment value",
      "Automated escalation workflows",
    ],
  },
  {
    num: "03",
    title: "Route intelligence",
    description:
      "Historical lane performance scored across 14 dimensions. Transit time reliability, damage rate, cost variance, customs clearance speed. Alternatives surface automatically when your primary route degrades.",
    specs: [
      "14-dimension lane scoring",
      "3-year rolling performance data",
      "Cost-vs-reliability optimizer",
      "Alternative route suggestions",
    ],
  },
  {
    num: "04",
    title: "Customs & compliance",
    description:
      "Automated HS code classification with 96.8% accuracy. Pre-filing for 142 countries. Document generation, duty calculation, and restricted party screening before shipments hit the border.",
    specs: [
      "142 countries supported",
      "96.8% HS classification accuracy",
      "Restricted party screening",
      "Automated document generation",
    ],
  },
  {
    num: "05",
    title: "Network mapping",
    description:
      "Every node in your supply chain mapped, scored for risk, and monitored continuously. Visualize dependencies, identify single points of failure, and simulate disruption scenarios across your entire network.",
    specs: [
      "Full network topology view",
      "Risk scoring per node",
      "Dependency chain analysis",
      "Disruption simulation engine",
    ],
  },
  {
    num: "06",
    title: "Financial reconciliation",
    description:
      "Automated freight audit and payment reconciliation. Invoices matched against contracted rates, discrepancies flagged, dispute documentation generated. Average 4.2% recovery on freight spend in the first quarter.",
    specs: [
      "Automated invoice matching",
      "Rate compliance checking",
      "Dispute documentation",
      "4.2% avg. spend recovery",
    ],
  },
];

export default function FeaturesPage() {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0C0A09",
        color: "#EDE8E0",
        minHeight: "100vh",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="px-6 md:px-16 lg:px-24"
        style={{
          borderBottom: "1px solid rgba(200,149,108,0.08)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/templates/supply-chain"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            color: "#7A7067",
            letterSpacing: "0.1em",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          &larr; Transit
        </Link>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.625rem",
            color: "#4A443D",
            letterSpacing: "0.1em",
          }}
        >
          {capabilities.length} capabilities
        </span>
      </header>

      {/* Page Title */}
      <section
        className="px-6 md:px-16 lg:px-24"
        style={{
          paddingTop: isMd ? 100 : 60,
          paddingBottom: isMd ? 72 : 48,
          borderBottom: "1px solid rgba(200,149,108,0.08)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 24,
              height: 1,
              backgroundColor: "#C8956C",
              opacity: 0.4,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#4A443D",
              letterSpacing: "0.15em",
            }}
          >
            Capabilities
          </span>
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{
              type: "spring" as const,
              stiffness: 70,
              damping: 22,
            }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: isMd ? "clamp(2rem, 4vw, 3.5rem)" : "1.75rem",
              lineHeight: 1.15,
              color: "#EDE8E0",
              margin: 0,
              maxWidth: 520,
              letterSpacing: "-0.02em",
            }}
          >
            Everything Transit does to eliminate blind spots.
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "#7A7067",
            maxWidth: 440,
            margin: 0,
            marginTop: 20,
          }}
        >
          Each capability is production-grade and carrier-tested
          across enterprise logistics operations.
        </motion.p>
      </section>

      {/* Capability Cards */}
      {capabilities.map((cap, i) => (
        <CapabilitySection
          key={cap.num}
          capability={cap}
          index={i}
          isMd={isMd}
          icon={capabilityIcons[i]}
          color={capabilityColors[i]}
        />
      ))}

      {/* Bottom CTA */}
      <section
        className="px-6 md:px-16 lg:px-24"
        style={{
          paddingTop: 64,
          paddingBottom: 64,
          borderTop: "1px solid rgba(200,149,108,0.08)",
          display: "flex",
          flexDirection: isMd ? "row" : "column",
          alignItems: isMd ? "center" : "flex-start",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#EDE8E0",
          }}
        >
          Ready to see it live?
        </span>
        <BottomCTA />
      </section>

      {/* Back to templates */}
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          borderTop: "1px solid rgba(200,149,108,0.06)",
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Link
          href="/templates"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            color: "#4A443D",
            letterSpacing: "0.08em",
            textDecoration: "none",
          }}
        >
          &larr; Back to templates
        </Link>
      </div>
    </div>
  );
}

function CapabilitySection({
  capability,
  index,
  isMd,
  icon: Icon,
  color,
}: {
  capability: (typeof capabilities)[number];
  index: number;
  isMd: boolean;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring" as const,
        stiffness: 60,
        damping: 20,
        delay: index * 0.04,
      }}
      className="px-6 md:px-16 lg:px-24"
      style={{
        borderBottom: "1px solid rgba(200,149,108,0.08)",
        paddingTop: isMd ? 56 : 36,
        paddingBottom: isMd ? 56 : 36,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMd ? "row" : "column",
          gap: isMd ? 72 : 24,
          alignItems: "flex-start",
        }}
      >
        {/* Number + Icon + Title */}
        <div style={{ flex: isMd ? "0 0 300px" : "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "2rem",
                lineHeight: 0.9,
                color: "rgba(200,149,108,0.15)",
              }}
            >
              {capability.num}
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: `${color}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={16} color={color} strokeWidth={1.5} />
            </div>
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.125rem",
              lineHeight: 1.3,
              color: "#EDE8E0",
              margin: 0,
            }}
          >
            {capability.title}
          </h2>
        </div>

        {/* Description + Specs */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "#7A7067",
              margin: 0,
              marginBottom: 24,
            }}
          >
            {capability.description}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMd ? "1fr 1fr" : "1fr",
              gap: 8,
            }}
          >
            {capability.specs.map((spec) => (
              <div
                key={spec}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Check
                  size={14}
                  color={color}
                  strokeWidth={2}
                  style={{ flexShrink: 0, opacity: 0.7 }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#4A443D",
                  }}
                >
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BottomCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "0.875rem",
        color: hovered ? "#0C0A09" : "#C8956C",
        backgroundColor: hovered ? "#C8956C" : "transparent",
        border: "1px solid rgba(200,149,108,0.3)",
        borderColor: hovered ? "#C8956C" : "rgba(200,149,108,0.3)",
        borderRadius: 100,
        padding: "14px 32px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        transition: "all 0.3s ease",
        flexShrink: 0,
        letterSpacing: "0.02em",
      }}
    >
      Schedule a walkthrough
      <ArrowRight
        size={15}
        strokeWidth={2}
        style={{
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.25s ease",
        }}
      />
    </a>
  );
}
