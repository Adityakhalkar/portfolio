"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Grain from "../components/Grain";
import Cursor from "../components/Cursor";

const C = {
  bg: "#FAFAF8", white: "#FFFFFF", accent: "#FF3366",
  dark: "#1A1A1A", muted: "#717171", border: "#E8E8E8",
} as const;

const F = { syne: "'Syne', sans-serif", manrope: "'Manrope', sans-serif" } as const;
const spring = { type: "spring" as const, stiffness: 80, damping: 14 };
const springFast = { type: "spring" as const, stiffness: 400, damping: 17 };

const sectionPad = {
  paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
  paddingRight: "clamp(1.5rem, 4vw, 4rem)",
} as const;

const label = {
  fontFamily: F.manrope, fontSize: "0.75rem", fontWeight: 500,
  color: C.muted, display: "block" as const, marginBottom: "1rem", letterSpacing: "0.04em",
} as const;

const bodyText = {
  fontFamily: F.manrope, fontWeight: 400, fontSize: "0.9375rem",
  lineHeight: 1.6, color: C.muted, margin: 0,
} as const;

/* ─── Data ─── */

interface Plan {
  name: string; price: string; unit: string;
  tagline: string; features: string[]; accent: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Free", price: "$0", unit: "/month",
    tagline: "For individuals exploring motion design.",
    features: ["5 active projects", "Basic export (GIF, MP4)", "Community support", "720p max resolution", "Motive watermark on exports"],
    accent: false,
  },
  {
    name: "Pro", price: "$29", unit: "/month",
    tagline: "For designers shipping to production.",
    features: ["Unlimited projects", "All export formats (Lottie, React, CSS, GIF)", "Priority email support", "4K export, no watermark", "Version history & rollback", "Custom easing library"],
    accent: true,
  },
  {
    name: "Team", price: "$19", unit: "/seat/month",
    tagline: "For product teams who ship together.",
    features: ["Everything in Pro", "Shared component libraries", "Real-time multiplayer editing", "Role-based permissions", "SSO & SAML authentication", "Dedicated account manager"],
    accent: false,
  },
];

const FAQS = [
  { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade whenever you need to. Changes take effect at the start of your next billing cycle, and we prorate any difference automatically." },
  { q: "What happens when my trial ends?", a: "You keep access to the Free tier with 5 projects and basic exports. Nothing gets deleted. Upgrade to Pro or Team whenever you are ready." },
  { q: "Do you offer annual billing?", a: "We do. Annual plans save you roughly 20% compared to monthly billing. You can switch between monthly and annual from your account settings." },
  { q: "What export formats are included?", a: "Free includes GIF and MP4. Pro and Team unlock Lottie, React components, CSS keyframes, APNG, and WebM. We add new formats based on what teams request." },
  { q: "Is there a student discount?", a: "Students and educators get Pro free for 12 months. Verify with a valid .edu email address and you are in. No credit card needed." },
];

const hoverOutline = {
  enter: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = C.dark; e.currentTarget.style.borderColor = C.dark; },
  leave: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; },
};

/* ─── Page ─── */

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: F.manrope, cursor: "none" }}>
      <Cursor />
      <Grain />
      <NavBar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: "clamp(7rem, 12vw, 10rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)", ...sectionPad }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={spring} style={label}
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ ...spring, delay: 0.06 }}
            style={{
              fontFamily: F.syne, fontWeight: 800,
              fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.08,
              color: C.dark, maxWidth: "30rem", margin: "0 0 1.25rem 0", letterSpacing: "-0.03em",
            }}
          >
            Simple plans, no surprises.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ ...spring, delay: 0.12 }}
            style={{
              fontFamily: F.manrope, fontWeight: 400, fontSize: "1.0625rem",
              lineHeight: 1.6, color: C.muted, maxWidth: "28rem", margin: 0,
            }}
          >
            One tool, three tiers. Pick the plan that matches how you work
            today — upgrade when your team or ambition outgrows it.
          </motion.p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section style={{ paddingBottom: "clamp(5rem, 8vw, 7rem)", ...sectionPad }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ ...spring, delay: i * 0.06 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
              style={{ borderTop: `1px solid ${C.border}`, paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
            >
              {/* Left — name, price, CTA */}
              <div className="md:col-span-4 flex flex-col" style={{ gap: "1rem" }}>
                <div>
                  <h3 style={{
                    fontFamily: F.syne, fontWeight: 700, fontSize: "1.25rem",
                    color: plan.accent ? C.accent : C.dark, margin: "0 0 0.375rem 0", letterSpacing: "-0.02em",
                  }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline" style={{ gap: "0.125rem" }}>
                    <span style={{
                      fontFamily: F.syne, fontWeight: 800, fontSize: "clamp(2rem, 3vw, 2.75rem)",
                      color: C.dark, letterSpacing: "-0.03em", lineHeight: 1,
                    }}>
                      {plan.price}
                    </span>
                    <span style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.875rem", color: C.muted }}>
                      {plan.unit}
                    </span>
                  </div>
                </div>
                <p style={{ ...bodyText, maxWidth: "20rem" }}>{plan.tagline}</p>
                <motion.div
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
                  transition={springFast} style={{ alignSelf: "flex-start", marginTop: "0.25rem" }}
                >
                  <Link
                    href="#"
                    style={{
                      fontFamily: F.manrope, fontWeight: 600, fontSize: "0.875rem",
                      color: plan.accent ? C.white : C.muted,
                      backgroundColor: plan.accent ? C.accent : "transparent",
                      border: plan.accent ? "none" : `1px solid ${C.border}`,
                      padding: "0.6875rem 1.75rem", borderRadius: "999px",
                      textDecoration: "none", display: "inline-block", lineHeight: 1.5,
                      transition: plan.accent ? undefined : "color 200ms, border-color 200ms",
                    }}
                    onMouseEnter={plan.accent ? undefined : hoverOutline.enter}
                    onMouseLeave={plan.accent ? undefined : hoverOutline.leave}
                  >
                    {plan.accent ? "Get Pro" : plan.name === "Free" ? "Start free" : "Contact sales"}
                  </Link>
                </motion.div>
              </div>

              {/* Right — features */}
              <div className="md:col-span-8 flex flex-col justify-center" style={{ gap: "0.625rem" }}>
                {plan.features.map((f) => (
                  <span key={f} style={{ ...bodyText }}>&mdash;&ensp;{f}</span>
                ))}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{
        backgroundColor: C.white,
        paddingTop: "clamp(5rem, 8vw, 7rem)", paddingBottom: "clamp(5rem, 8vw, 7rem)", ...sectionPad,
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={spring} style={label}
          >
            Common questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ ...spring, delay: 0.06 }}
            style={{
              fontFamily: F.syne, fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              lineHeight: 1.1, color: C.dark, maxWidth: "24rem", margin: "0 0 3.5rem 0", letterSpacing: "-0.03em",
            }}
          >
            Answers before you ask.
          </motion.h2>

          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ ...spring, delay: i * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8"
                style={{ borderTop: `1px solid ${C.border}`, paddingTop: "2rem", paddingBottom: "2rem" }}
              >
                <h4 className="md:col-span-5" style={{
                  fontFamily: F.syne, fontWeight: 700, fontSize: "1.0625rem",
                  color: C.dark, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.35,
                }}>
                  {faq.q}
                </h4>
                <p className="md:col-span-7" style={{ ...bodyText, lineHeight: 1.7 }}>{faq.a}</p>
              </motion.div>
            ))}
            <div style={{ borderTop: `1px solid ${C.border}` }} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        borderTop: `1px solid ${C.border}`,
        paddingTop: "clamp(5rem, 8vw, 7rem)", paddingBottom: "clamp(5rem, 8vw, 7rem)", ...sectionPad,
      }}>
        <motion.div
          style={{ maxWidth: "1280px", margin: "0 auto" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={spring}
        >
          <h2 style={{
            fontFamily: F.syne, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1, color: C.dark, maxWidth: "30rem", margin: "0 0 1.5rem 0", letterSpacing: "-0.03em",
          }}>
            Start designing motion today.
          </h2>
          <div className="flex items-center flex-wrap" style={{ gap: "1rem", marginBottom: "2rem" }}>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={springFast}>
              <Link href="#" style={{
                fontFamily: F.manrope, fontWeight: 600, fontSize: "0.9375rem",
                color: C.white, backgroundColor: C.accent,
                padding: "0.8125rem 2rem", borderRadius: "999px",
                textDecoration: "none", display: "inline-block",
              }}>
                Start for free
              </Link>
            </motion.div>
            <Link
              href="#"
              style={{
                fontFamily: F.manrope, fontWeight: 500, fontSize: "0.9375rem",
                color: C.muted, textDecoration: "none", transition: "color 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.dark; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
            >
              Compare plans in detail
            </Link>
          </div>
          <p style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.75rem", color: C.muted, margin: 0 }}>
            Trusted by 4,200+ product teams &middot; No credit card required
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
