"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import type { Agent } from "../../data/agents";
import Cursor from "../../components/Cursor";

// -- Count-up hook -----------------------------------------------------------
function useCountUp(
  target: number,
  suffix: string,
  inView: boolean,
  duration = 1200
) {
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * target * 10) / 10;
      // Format: if target has decimal, show decimal
      const formatted =
        target % 1 !== 0 ? current.toFixed(1) : String(Math.round(current));
      setDisplay(formatted + suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix, duration]);

  return display;
}

// -- Stat Cell ---------------------------------------------------------------
function StatCell({
  label,
  value,
  accent,
  index,
}: {
  label: string;
  value: string;
  accent?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex-1 px-5 py-4 md:px-6 md:py-5"
      style={{
        borderRight: index < 3 ? "1px solid #2A2A2A" : "none",
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] mb-1"
        style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
      >
        {label}
      </div>
      <div
        className={`text-lg md:text-xl ${accent ? "text-[#E8FF47]" : "text-[#E8E8E8]"}`}
        style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
      >
        {value}
      </div>
    </motion.div>
  );
}

// -- Related Agent Card ------------------------------------------------------
function RelatedCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
    >
      <Link
        href={`/templates/agent-marketplace/agent/${agent.slug}`}
        className="block group"
      >
        <div className="bg-[#141414] border border-[#2A2A2A] p-5 transition-colors duration-100 hover:border-[#E8FF47]">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B]"
              style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
            >
              {agent.category}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.08em] flex items-center gap-1.5"
              style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
            >
              <span
                className={
                  agent.status === "live"
                    ? "text-[#E8FF47]"
                    : "text-[#FF6B35]"
                }
              >
                {"\u25CF"}
              </span>
              <span
                className={
                  agent.status === "live"
                    ? "text-[#E8FF47]"
                    : "text-[#FF6B35]"
                }
              >
                {agent.status === "live" ? "LIVE" : "BETA"}
              </span>
            </span>
          </div>

          {/* Name */}
          <h3
            className="text-lg text-[#E8E8E8] uppercase mb-2 leading-tight"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            {agent.name}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-[#6B6B6B] line-clamp-2 mb-4 leading-relaxed"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
            }}
          >
            {agent.description}
          </p>

          {/* Bottom metadata */}
          <div
            className="text-[11px] text-[#6B6B6B] pt-3 border-t border-[#2A2A2A]"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 400 }}
          >
            <span>{agent.creator}</span>
            <span className="mx-2">/</span>
            <span>{agent.deploys}</span>
            <span className="mx-2">/</span>
            <span>{agent.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// -- Main Client Component ---------------------------------------------------
export default function AgentDetailClient({
  agent,
  relatedAgents,
}: {
  agent: Agent;
  relatedAgents: Agent[];
}) {
  // Parse numeric deploy count for count-up
  const deployNum = parseFloat(agent.deploys.replace(/[^0-9.]/g, ""));
  const deploySuffix = agent.deploys.replace(/[0-9.]/g, "");

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const deploysDisplay = useCountUp(deployNum, deploySuffix, statsInView);
  const ratingDisplay = useCountUp(agent.rating, "", statsInView);

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#E8E8E8",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div
        className="w-full px-5 md:px-10 lg:px-16"
        style={{ borderBottom: "1px solid #2A2A2A" }}
      >
        <div className="flex items-center justify-between h-14">
          <Link
            href="/templates/agent-marketplace/explore"
            className="text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] hover:text-[#E8FF47] transition-colors duration-100"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            {"\u2190 BACK TO VAULT"}
          </Link>
          <div
            className="text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            AGENTS / {agent.name}
          </div>
        </div>
      </div>

      {/* ── Agent header ──────────────────────────────────────────── */}
      <div
        className="w-full px-5 md:px-10 lg:px-16 py-10 md:py-16"
        style={{ borderBottom: "1px solid #2A2A2A" }}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left side (~65%) */}
          <div className="lg:w-[65%]">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <span
                className={`text-[10px] uppercase tracking-[0.1em] flex items-center gap-1.5 ${
                  agent.status === "live"
                    ? "text-[#E8FF47]"
                    : "text-[#FF6B35]"
                }`}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                <span>{"\u25CF"}</span>
                <span>{agent.status === "live" ? "LIVE" : "BETA"}</span>
              </span>
            </motion.div>

            {/* Agent name — clips in from bottom */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#E8E8E8] uppercase leading-[0.95]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                }}
              >
                {agent.name}
              </motion.h1>
            </div>

            {/* Category tag */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-5"
            >
              <span
                className="inline-block text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B] border border-[#2A2A2A] px-3 py-1"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                {agent.category}
              </span>
            </motion.div>

            {/* One-line description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="text-base md:text-lg text-[#6B6B6B] max-w-2xl leading-relaxed"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
              }}
            >
              {agent.description}
            </motion.p>
          </div>

          {/* Right side (~35%) */}
          <div className="lg:w-[35%] flex flex-col gap-4">
            {/* CTA Button with pulsing border */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              <button
                className="agent-cta-button w-full py-4 px-6 text-sm uppercase tracking-[0.08em] bg-[#E8FF47] text-[#0A0A0A] border border-[#E8FF47] hover:bg-transparent hover:text-[#E8FF47] transition-all duration-100 cursor-pointer"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  borderRadius: 0,
                }}
              >
                {"DEPLOY THIS AGENT \u2192"}
              </button>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mt-2"
            >
              <div
                className="text-3xl text-[#E8E8E8]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                {agent.price.replace("/mo", "")}
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mt-1"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                PER MONTH
              </div>
            </motion.div>

            {/* Sandbox link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.06em] text-[#6B6B6B] hover:text-[#E8FF47] transition-colors duration-100 cursor-pointer"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                {"or try in sandbox \u2192"}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="w-full flex flex-col sm:flex-row"
        style={{
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        <StatCell label="DEPLOYS" value={deploysDisplay} index={0} />
        <StatCell
          label="RATING"
          value={`\u2605 ${ratingDisplay}`}
          accent
          index={1}
        />
        <StatCell label="VERSION" value={`v${agent.version}`} index={2} />
        <StatCell label="UPDATED" value={agent.lastUpdated} index={3} />
      </div>

      {/* ── Main content area ─────────────────────────────────────── */}
      <div className="w-full px-5 md:px-10 lg:px-16 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left column (~65%) */}
          <div className="lg:w-[65%]">
            {/* ABOUT */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h2
                className="text-xs uppercase tracking-[0.1em] text-[#6B6B6B] mb-6"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                ABOUT
              </h2>
              <p
                className="text-base text-[#6B6B6B] leading-[1.8] mb-12"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                }}
              >
                {agent.longDescription}
              </p>
            </motion.div>

            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h2
                className="text-xs uppercase tracking-[0.1em] text-[#6B6B6B] mb-6"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                FEATURES
              </h2>
              <div className="flex flex-col">
                {agent.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 py-3"
                    style={{ borderBottom: "1px solid #2A2A2A" }}
                  >
                    <span
                      className="text-[#E8FF47] text-sm shrink-0 mt-[2px]"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700,
                      }}
                    >
                      {"\u2192"}
                    </span>
                    <span
                      className="text-sm text-[#E8E8E8] leading-relaxed"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column (~35%) — DETAILS sidebar */}
          <div className="lg:w-[35%]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="border border-[#2A2A2A] bg-[#141414]"
            >
              <div
                className="px-5 py-4"
                style={{ borderBottom: "1px solid #2A2A2A" }}
              >
                <h2
                  className="text-xs uppercase tracking-[0.1em] text-[#6B6B6B]"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  DETAILS
                </h2>
              </div>

              {/* Creator */}
              <div
                className="px-5 py-4"
                style={{ borderBottom: "1px solid #2A2A2A" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] mb-2"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  CREATOR
                </div>
                <div
                  className="text-sm text-[#E8E8E8] mb-1"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  {agent.creator}
                </div>
                <span
                  className="text-[10px] uppercase tracking-[0.06em] text-[#E8FF47] hover:opacity-70 transition-opacity duration-100 cursor-pointer"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  {"VIEW PROFILE \u2192"}
                </span>
              </div>

              {/* Tags */}
              <div
                className="px-5 py-4"
                style={{ borderBottom: "1px solid #2A2A2A" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] mb-3"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.06em] text-[#6B6B6B] border border-[#2A2A2A] px-2 py-1 hover:border-[#E8FF47] hover:text-[#E8E8E8] transition-colors duration-100"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Version history */}
              <div
                className="px-5 py-4"
                style={{ borderBottom: "1px solid #2A2A2A" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.1em] text-[#6B6B6B] mb-2"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  VERSION HISTORY
                </div>
                <div
                  className="text-sm text-[#E8E8E8]"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  v{agent.version}
                </div>
                <div
                  className="text-[11px] text-[#6B6B6B] mt-1"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 400,
                  }}
                >
                  Last updated {agent.lastUpdated}
                </div>
              </div>

              {/* Report link */}
              <div className="px-5 py-4">
                <span
                  className="text-[10px] uppercase tracking-[0.06em] text-[#6B6B6B] hover:text-[#FF6B35] transition-colors duration-100 cursor-pointer"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  REPORT AGENT
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Related agents ────────────────────────────────────────── */}
      {relatedAgents.length > 0 && (
        <div
          className="w-full px-5 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ borderTop: "1px solid #2A2A2A" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs uppercase tracking-[0.1em] text-[#6B6B6B] mb-8"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            RELATED AGENTS
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedAgents.map((related, i) => (
              <RelatedCard key={related.slug} agent={related} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── CTA pulse animation ───────────────────────────────────── */}
      <style jsx global>{`
        @keyframes ctaPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(232, 255, 71, 0.4);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(232, 255, 71, 0);
          }
        }
        .agent-cta-button {
          animation: ctaPulse 2.5s ease-in-out infinite;
        }
        .agent-cta-button:hover {
          animation: none;
        }
      `}</style>
    </div>
  );
}
