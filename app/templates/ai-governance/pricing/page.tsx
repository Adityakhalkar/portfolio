"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

/* ─── Tier data ─── */
interface TierFeature {
  text: string;
}

interface Tier {
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: TierFeature[];
  cta: string;
  ctaStyle: "primary" | "secondary";
  highlighted?: boolean;
  badge?: string;
}

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$2,500",
    priceSuffix: "/month",
    description: "For teams beginning their AI governance journey",
    features: [
      { text: "Up to 50 AI models" },
      { text: "Basic risk scoring" },
      { text: "EU AI Act mapping" },
      { text: "Email support" },
      { text: "2 team seats" },
    ],
    cta: "Get started",
    ctaStyle: "secondary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "tailored to your needs",
    description: "For organizations with complex AI portfolios",
    features: [
      { text: "Everything in Starter, plus:" },
      { text: "Unlimited AI models" },
      { text: "Advanced risk analytics" },
      { text: "Multi-framework compliance" },
      { text: "Dedicated success manager" },
      { text: "SSO & SCIM" },
      { text: "Custom integrations" },
      { text: "SLA guarantee" },
    ],
    cta: "Request a Demo",
    ctaStyle: "primary",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Regulated",
    price: "$8,500",
    priceSuffix: "/month",
    description:
      "For heavily regulated industries \u2014 finance, healthcare, defense",
    features: [
      { text: "Everything in Enterprise, plus:" },
      { text: "On-premise deployment" },
      { text: "Air-gapped option" },
      { text: "Dedicated compliance analyst" },
      { text: "Custom audit templates" },
      { text: "24/7 priority support" },
    ],
    cta: "Talk to Sales",
    ctaStyle: "secondary",
  },
];

/* ─── Comparison table data ─── */
interface ComparisonRow {
  feature: string;
  starter: string;
  enterprise: string;
  regulated: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: "AI model limit",
    starter: "50",
    enterprise: "Unlimited",
    regulated: "Unlimited",
  },
  {
    feature: "Risk scoring",
    starter: "Basic",
    enterprise: "Advanced",
    regulated: "Advanced",
  },
  {
    feature: "Compliance frameworks",
    starter: "EU AI Act",
    enterprise: "Multi-framework",
    regulated: "Multi-framework",
  },
  {
    feature: "Audit reports",
    starter: "\u2713",
    enterprise: "\u2713",
    regulated: "\u2713",
  },
  {
    feature: "Support",
    starter: "Email",
    enterprise: "Dedicated CSM",
    regulated: "24/7 priority",
  },
  {
    feature: "Deployment",
    starter: "Cloud",
    enterprise: "Cloud",
    regulated: "On-premise / air-gapped",
  },
  {
    feature: "Team seats",
    starter: "2",
    enterprise: "Unlimited",
    regulated: "Unlimited",
  },
  {
    feature: "API access",
    starter: "\u2713",
    enterprise: "\u2713",
    regulated: "\u2713",
  },
  {
    feature: "Custom integrations",
    starter: "\u2014",
    enterprise: "\u2713",
    regulated: "\u2713",
  },
];

/* ─── Helper: render cell value with color ─── */
function CellValue({ value }: { value: string }) {
  if (value === "\u2713") {
    return (
      <span style={{ color: "#2D6A4F", fontWeight: 500 }}>{value}</span>
    );
  }
  if (value === "\u2014") {
    return <span style={{ color: "#8C8C8C" }}>{value}</span>;
  }
  return (
    <span style={{ color: "#1A1A1A", fontWeight: 400 }}>{value}</span>
  );
}

/* ─── Page Component ─── */
export default function PricingPage() {
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

      {/* ── Pricing header ── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "3rem",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
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
            Pricing
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
            Simple, <em style={{ fontStyle: "italic" }}>transparent</em>{" "}
            pricing.
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
            }}
          >
            Start with a pilot. Scale when you&apos;re ready.
          </motion.p>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section
        style={{
          paddingBottom: "2rem",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            gap: "1.5rem",
            alignItems: "start",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              custom={idx}
              variants={fadeUp}
              style={{
                backgroundColor: "#FFFFFF",
                border: tier.highlighted
                  ? "2px solid #1A1A1A"
                  : "1px solid #E5E5E0",
                borderRadius: "2px",
                padding: "2rem",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                position: "relative",
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#1A1A1A",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.6875rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    marginBottom: "1rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {tier.badge}
                </span>
              )}

              {/* Name */}
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  color: "#1A1A1A",
                  margin: tier.badge ? "0 0 1rem 0" : "0 0 1rem 0",
                }}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.375rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "#1A1A1A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    color: "#8C8C8C",
                  }}
                >
                  {tier.priceSuffix}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "#8C8C8C",
                  margin: "0 0 1.5rem 0",
                }}
              >
                {tier.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#E5E5E0",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 2rem 0",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {tier.features.map((feat) => {
                  const isInheritLine =
                    feat.text.startsWith("Everything in");
                  return (
                    <li
                      key={feat.text}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: isInheritLine ? 500 : 400,
                        fontSize: "0.875rem",
                        color: isInheritLine ? "#1A1A1A" : "#1A1A1A",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        lineHeight: 1.45,
                      }}
                    >
                      {!isInheritLine && (
                        <span
                          style={{
                            color: "#2D6A4F",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            lineHeight: 1.45,
                            flexShrink: 0,
                          }}
                        >
                          &#10003;
                        </span>
                      )}
                      <span>{feat.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA Button */}
              {tier.ctaStyle === "primary" ? (
                <Link
                  href="#"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    color: "#FFFFFF",
                    backgroundColor: "#1A1A1A",
                    padding: "0.6875rem 1.5rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                    transition: "opacity 200ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                  }}
                >
                  {tier.cta}
                </Link>
              ) : (
                <Link
                  href="#"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    color: "#8C8C8C",
                    backgroundColor: "transparent",
                    padding: "0.625rem 1.5rem",
                    borderRadius: "2px",
                    border: "1px solid #E5E5E0",
                    textDecoration: "none",
                    transition:
                      "color 200ms ease-out, border-color 200ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.target as HTMLElement;
                    el.style.color = "#1A1A1A";
                    el.style.borderColor = "#1A1A1A";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as HTMLElement;
                    el.style.color = "#8C8C8C";
                    el.style.borderColor = "#E5E5E0";
                  }}
                >
                  {tier.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Baseline note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            color: "#8C8C8C",
            textAlign: "center",
            maxWidth: "1280px",
            margin: "2rem auto 0",
          }}
        >
          All plans include SOC2 compliance, 256-bit encryption, and 99.9%
          uptime SLA
        </motion.p>
      </section>

      {/* ── Comparison table ── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "5rem",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <motion.div
          style={{ maxWidth: "1280px", margin: "0 auto" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeIn}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#1A1A1A",
              margin: "0 0 2.5rem 0",
              letterSpacing: "-0.01em",
            }}
          >
            Compare plans
          </h2>

          {/* Table wrapper for horizontal scroll on mobile */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: "640px",
                borderCollapse: "collapse",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      color: "#8C8C8C",
                      padding: "0.875rem 1rem",
                      borderBottom: "1px solid #E5E5E0",
                      width: "30%",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Feature
                  </th>
                  {["Starter", "Enterprise", "Regulated"].map((name) => (
                    <th
                      key={name}
                      style={{
                        textAlign: "left",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        color: "#8C8C8C",
                        padding: "0.875rem 1rem",
                        borderBottom: "1px solid #E5E5E0",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIdx) => (
                  <tr
                    key={row.feature}
                    style={{
                      backgroundColor:
                        rowIdx % 2 === 0 ? "#FFFFFF" : "#F7F6F3",
                    }}
                  >
                    <td
                      style={{
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "#1A1A1A",
                        padding: "0.8125rem 1rem",
                        borderBottom: "1px solid #E5E5E0",
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      style={{
                        fontSize: "0.875rem",
                        padding: "0.8125rem 1rem",
                        borderBottom: "1px solid #E5E5E0",
                      }}
                    >
                      <CellValue value={row.starter} />
                    </td>
                    <td
                      style={{
                        fontSize: "0.875rem",
                        padding: "0.8125rem 1rem",
                        borderBottom: "1px solid #E5E5E0",
                      }}
                    >
                      <CellValue value={row.enterprise} />
                    </td>
                    <td
                      style={{
                        fontSize: "0.875rem",
                        padding: "0.8125rem 1rem",
                        borderBottom: "1px solid #E5E5E0",
                      }}
                    >
                      <CellValue value={row.regulated} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
