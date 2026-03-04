"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1.6, startOnView: boolean = true) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!startOnView || !inView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, startOnView]);

  return { value, ref };
}

// ─── Stat block ───────────────────────────────────────────────────────────────
interface StatRowProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

function StatRow({ label, value: target, suffix = "", prefix = "", decimals = 0, delay = 0 }: StatRowProps) {
  const { value, ref } = useCountUp(decimals > 0 ? target * 10 : target, 1.8);

  const displayValue = decimals > 0
    ? (value / 10).toFixed(decimals)
    : value.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 + delay, ease: "easeOut" }}
      className="py-5 px-6"
      style={{ borderBottom: "1px solid #2A2A2A" }}
    >
      <div
        className="text-[10px] tracking-widest uppercase mb-2"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          color: "#6B6B6B",
        }}
      >
        {label}
      </div>
      <div
        className="text-3xl md:text-4xl"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          color: "#E8E8E8",
        }}
      >
        <span ref={ref}>
          {prefix}{displayValue}{suffix}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Headline word with animated reveal ───────────────────────────────────────
function HeadlineWord({ word, index }: { word: string; index: number }) {
  // Split word into text part and period
  const text = word.replace(".", "");
  const hasPeriod = word.endsWith(".");

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.4,
          delay: 0.2 + index * 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <span
          className="block leading-[0.9] tracking-tight"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(3rem, 9vw, 10vw)",
            color: "#E8E8E8",
          }}
        >
          {text}
          {hasPeriod && <span style={{ color: "#E8FF47" }}>.</span>}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [ctaHovered, setCtaHovered] = useState<string | null>(null);
  const headlines = ["FIND.", "DEPLOY.", "SHIP."];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col md:flex-row"
      style={{ backgroundColor: "#0A0A0A", paddingTop: "56px" }}
    >
      {/* ─── LEFT COLUMN ──────────────────────────────── */}
      <div className="flex-1 md:w-[60%] flex flex-col justify-center px-6 md:px-10 lg:px-16 py-16 md:py-0">
        {/* Pre-headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-10"
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase block mb-3"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              color: "#6B6B6B",
            }}
          >
            THE AGENT MARKETPLACE
          </span>
          <div style={{ height: "1px", backgroundColor: "#2A2A2A", width: "100%", maxWidth: "280px" }} />
        </motion.div>

        {/* Main headline */}
        <div className="mb-8 md:mb-10">
          {headlines.map((word, i) => (
            <HeadlineWord key={word} word={word} index={i} />
          ))}
        </div>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.55 }}
          className="text-base md:text-lg max-w-lg mb-10 md:mb-12 leading-relaxed"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            color: "#6B6B6B",
          }}
        >
          Production-ready AI agents built by developers, for developers. Stop building from scratch.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.65 }}
          className="flex flex-wrap gap-4"
        >
          {/* Primary CTA */}
          <Link
            href="/templates/agent-marketplace/explore"
            onMouseEnter={() => setCtaHovered("explore")}
            onMouseLeave={() => setCtaHovered(null)}
            className="inline-flex items-center px-6 py-3 text-xs tracking-wider uppercase"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              borderRadius: 0,
              border: "1px solid #E8FF47",
              backgroundColor: ctaHovered === "explore" ? "#0A0A0A" : "#E8FF47",
              color: ctaHovered === "explore" ? "#E8FF47" : "#0A0A0A",
              transition: "background-color 100ms ease, color 100ms ease",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            EXPLORE AGENTS&nbsp;&nbsp;→
          </Link>

          {/* Secondary CTA */}
          <a
            href="#"
            onMouseEnter={() => setCtaHovered("publish")}
            onMouseLeave={() => setCtaHovered(null)}
            className="inline-flex items-center px-6 py-3 text-xs tracking-wider uppercase"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              borderRadius: 0,
              border: "1px solid #2A2A2A",
              backgroundColor: ctaHovered === "publish" ? "#E8FF47" : "transparent",
              color: ctaHovered === "publish" ? "#0A0A0A" : "#E8E8E8",
              borderColor: ctaHovered === "publish" ? "#E8FF47" : "#2A2A2A",
              transition: "background-color 100ms ease, color 100ms ease, border-color 100ms ease",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            PUBLISH YOURS
          </a>
        </motion.div>
      </div>

      {/* ─── VERTICAL DIVIDER (desktop) ───────────────── */}
      <div
        className="hidden md:block w-px self-stretch"
        style={{ backgroundColor: "#2A2A2A" }}
      />

      {/* ─── HORIZONTAL DIVIDER (mobile) ──────────────── */}
      <div
        className="block md:hidden w-full h-px"
        style={{ backgroundColor: "#2A2A2A" }}
      />

      {/* ─── RIGHT COLUMN ─────────────────────────────── */}
      <div className="md:w-[40%] flex flex-col justify-center px-6 md:px-0 py-12 md:py-0">
        <div
          className="w-full"
          style={{ border: "1px solid #2A2A2A" }}
        >
          {/* Dashboard header */}
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid #2A2A2A" }}
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                color: "#6B6B6B",
              }}
            >
              LIVE METRICS
            </span>
            <span
              className="flex items-center gap-2 text-[10px] tracking-wider uppercase"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                color: "#E8FF47",
              }}
            >
              <span
                className="inline-block w-[6px] h-[6px]"
                style={{
                  backgroundColor: "#E8FF47",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              />
              LIVE
            </span>
          </div>

          {/* Stats */}
          <StatRow
            label="AGENTS LIVE"
            value={2847}
            prefix=""
            suffix=""
            delay={0}
          />
          <StatRow
            label="DEPLOYED TODAY"
            value={142}
            prefix=""
            suffix=""
            delay={0.12}
          />
          <div
            className="py-5 px-6"
            // Last stat - no bottom border since parent has border
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.04, ease: "easeOut" }}
            >
              <div
                className="text-[10px] tracking-widest uppercase mb-2"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  color: "#6B6B6B",
                }}
              >
                UPTIME
              </div>
              <UptimeStat />
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}

// ─── Uptime stat with count-up for decimal ────────────────────────────────────
function UptimeStat() {
  const { value, ref } = useCountUp(987, 2.0);
  const display = (value / 10).toFixed(1);

  return (
    <div
      className="text-3xl md:text-4xl"
      style={{
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        color: "#E8E8E8",
      }}
    >
      <span ref={ref}>{display}%</span>
    </div>
  );
}
