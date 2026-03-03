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
const pad = { paddingLeft: "clamp(1.5rem, 4vw, 4rem)", paddingRight: "clamp(1.5rem, 4vw, 4rem)" };

const FEATURES = [
  {
    num: "01", title: "Keyframe Editor",
    lead: "A timeline built for how designers actually think about motion.",
    body: "Most animation tools force you into a spreadsheet of numbers. Motive gives you a spatial canvas where keyframes are objects you can grab, stretch, and reshape. Easing curves respond to direct manipulation \u2014 drag a handle and watch the preview update in real time, at any playback speed. The editor supports up to 120fps preview, nested timelines for complex choreography, and a visual diff mode that lets you compare two animation states side by side.",
    caps: [
      "Direct-manipulation easing curves with 60+ built-in presets",
      "Nested timeline groups for sequenced choreography",
      "Visual diff mode \u2014 compare animation states side by side",
      "Up to 120fps real-time preview on any property",
    ],
  },
  {
    num: "02", title: "Interactive Prototypes",
    lead: "Connect animation to real user input, not hypothetical demos.",
    body: "Static mockups can\u2019t communicate how an interface should feel. Motive lets you bind animations directly to scroll position, cursor movement, touch gestures, and component state changes. Build a hover card that responds to pointer velocity, a page transition driven by a swipe gesture, or a loading sequence that adapts to real network latency. The prototype is the spec \u2014 no guesswork when it reaches engineering.",
    caps: [
      "Scroll-linked, pointer-driven, and gesture-bound animations",
      "State machine editor for multi-step interaction flows",
      "Variable binding \u2014 connect any animation property to live data",
      "Shareable prototype links with device-frame preview",
    ],
  },
  {
    num: "03", title: "Ship Anywhere",
    lead: "One animation. Every platform. Production-ready on export.",
    body: "Motive closes the gap between design and production. Export any animation as clean React/Framer Motion code, raw CSS @keyframes, Lottie JSON, GSAP timelines, or optimized GIF/WebM for marketing assets. The code output respects your project\u2019s conventions \u2014 it reads your existing codebase style and matches variable naming, import patterns, and component structure. Engineers copy, paste, and ship.",
    caps: [
      "React / Framer Motion, CSS @keyframes, and GSAP exports",
      "Lottie JSON with automatic optimization and tree-shaking",
      "Codebase-aware output \u2014 matches your import style and conventions",
      "Batch export for design-system-wide animation tokens",
    ],
  },
];

const DIFFS = [
  { num: "01", label: "Designer-first timeline", detail: "Spatial keyframes, not spreadsheets. Easing curves you drag, not type." },
  { num: "02", label: "Real interaction binding", detail: "Scroll, pointer, gesture \u2014 animations respond to actual user input." },
  { num: "03", label: "Production code on export", detail: "React, CSS, Lottie, GSAP. Not a handoff doc \u2014 real, shippable code." },
  { num: "04", label: "No learning curve", detail: "If you know Figma, you already know 80% of Motive. Onboard in an afternoon." },
  { num: "05", label: "Built for teams", detail: "Shared animation libraries, branching, live multiplayer on every file." },
];

export default function FeaturesPage() {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: F.manrope, cursor: "none" }}>
      <Cursor />
      <Grain />
      <NavBar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: "clamp(8rem, 14vw, 12rem)", paddingBottom: "clamp(4rem, 6vw, 6rem)", ...pad }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            style={{ fontFamily: F.manrope, fontSize: "0.75rem", fontWeight: 500, color: C.muted, letterSpacing: "0.04em", display: "block", marginBottom: "1rem" }}
          >
            Features
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.16 }}
            style={{ fontFamily: F.syne, fontWeight: 800, fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1.05, color: C.dark, letterSpacing: "-0.03em", margin: "0 0 1.5rem 0", maxWidth: "38rem" }}
          >
            Every detail, intentional.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.22 }}
            style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "clamp(1rem, 1.5vw, 1.125rem)", lineHeight: 1.65, color: C.muted, maxWidth: "30rem", margin: 0 }}
          >
            Motive is three tools collapsed into one &mdash; a keyframe editor that
            feels spatial, a prototype engine wired to real interactions, and an
            export pipeline that speaks your codebase&apos;s language.
          </motion.p>
        </div>
      </section>

      {/* ── Feature Deep-Dives ── */}
      {FEATURES.map((feat, i) => {
        const textLeft = i % 2 === 0;
        return (
          <section
            key={feat.num}
            style={{
              backgroundColor: i % 2 === 1 ? C.white : C.bg,
              paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)",
              ...pad, borderTop: `1px solid ${C.border}`,
            }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
              style={{ maxWidth: "1280px", margin: "0 auto", alignItems: "start" }}
            >
              {/* Text — 5 cols */}
              <motion.div
                className={`md:col-span-5 ${textLeft ? "md:order-1" : "md:order-2"}`}
                initial={{ opacity: 0, x: textLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={spring}
              >
                <span style={{ fontFamily: F.syne, fontWeight: 800, fontSize: "0.875rem", color: C.accent, display: "block", marginBottom: "0.75rem" }}>
                  {feat.num}
                </span>
                <h2 style={{ fontFamily: F.syne, fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15, color: C.dark, letterSpacing: "-0.02em", margin: "0 0 0.75rem 0" }}>
                  {feat.title}
                </h2>
                <p style={{ fontFamily: F.manrope, fontWeight: 500, fontSize: "1rem", lineHeight: 1.5, color: C.dark, margin: "0 0 1rem 0" }}>
                  {feat.lead}
                </p>
                <p style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.7, color: C.muted, margin: "0 0 2rem 0" }}>
                  {feat.body}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {feat.caps.map((cap, ci) => (
                    <motion.div
                      key={ci}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...spring, delay: ci * 0.06 }}
                      style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.5, color: C.dark, paddingLeft: "1rem", borderLeft: `2px solid ${C.border}` }}
                    >
                      {cap}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Mockup placeholder — 7 cols */}
              <motion.div
                className={`md:col-span-7 ${textLeft ? "md:order-2" : "md:order-1"}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}
              >
                <div style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: "0px", width: "100%", aspectRatio: "4 / 3", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: "1.5rem" }}>
                  <span style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.75rem", color: C.muted, letterSpacing: "0.02em" }}>
                    {feat.title} &mdash; UI Preview
                  </span>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ── Comparison Strip ── */}
      <section style={{ backgroundColor: C.white, borderTop: `1px solid ${C.border}`, paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)", ...pad }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* Left headline — 4 cols */}
            <motion.div
              className="md:col-span-4"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={spring}
            >
              <span style={{ fontFamily: F.manrope, fontSize: "0.75rem", fontWeight: 500, color: C.muted, letterSpacing: "0.04em", display: "block", marginBottom: "1rem" }}>
                Why Motive
              </span>
              <h2 style={{ fontFamily: F.syne, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.1, color: C.dark, letterSpacing: "-0.03em", margin: 0 }}>
                Why teams switch to Motive
              </h2>
            </motion.div>

            {/* Right numbered list — 8 cols */}
            <div className="md:col-span-8">
              {DIFFS.map((d, i) => (
                <motion.div
                  key={d.num}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ ...spring, delay: i * 0.06 }}
                  className="grid grid-cols-12 gap-4"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}`, paddingTop: i === 0 ? "0" : "1.5rem", paddingBottom: "1.5rem" }}
                >
                  <span className="col-span-2 md:col-span-1" style={{ fontFamily: F.syne, fontWeight: 800, fontSize: "0.8125rem", color: i === 0 ? C.accent : C.muted }}>
                    {d.num}
                  </span>
                  <div className="col-span-10 md:col-span-11">
                    <span style={{ fontFamily: F.manrope, fontWeight: 600, fontSize: "0.9375rem", color: C.dark, display: "block", marginBottom: "0.25rem" }}>
                      {d.label}
                    </span>
                    <span style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.55, color: C.muted }}>
                      {d.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, paddingTop: "clamp(5rem, 8vw, 7rem)", paddingBottom: "clamp(5rem, 8vw, 7rem)", ...pad }}>
        <motion.div
          style={{ maxWidth: "1280px", margin: "0 auto" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={spring}
        >
          <span style={{ fontFamily: F.manrope, fontSize: "0.75rem", fontWeight: 500, color: C.muted, display: "block", marginBottom: "1rem", letterSpacing: "0.04em" }}>
            Get started
          </span>
          <h2 style={{ fontFamily: F.syne, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1, color: C.dark, maxWidth: "28rem", margin: "0 0 1.5rem 0", letterSpacing: "-0.03em" }}>
            Ready to animate?
          </h2>
          <p style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "1.0625rem", lineHeight: 1.6, color: C.muted, maxWidth: "26rem", margin: "0 0 2rem 0" }}>
            Start building motion that ships. Free plan, no credit card &mdash; export
            production code in minutes.
          </p>
          <div className="flex items-center flex-wrap" style={{ gap: "1.25rem", marginBottom: "2rem" }}>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={springFast}>
              <Link
                href="#"
                style={{ fontFamily: F.manrope, fontWeight: 600, fontSize: "0.9375rem", color: C.white, backgroundColor: C.accent, padding: "0.8125rem 2rem", borderRadius: "999px", textDecoration: "none", display: "inline-block" }}
              >
                Start for free
              </Link>
            </motion.div>
            <Link
              href="#"
              style={{ fontFamily: F.manrope, fontWeight: 500, fontSize: "0.9375rem", color: C.muted, textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.dark; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
            >
              Talk to sales&nbsp;&rarr;
            </Link>
          </div>
          <p style={{ fontFamily: F.manrope, fontWeight: 400, fontSize: "0.75rem", color: C.muted, margin: 0 }}>
            Free for individuals &middot; Team plans from $19/seat &middot; Enterprise custom pricing
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
