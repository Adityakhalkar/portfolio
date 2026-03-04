"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function AgentNotFound() {
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#E8E8E8",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
      className="flex flex-col items-start justify-center px-5 md:px-10 lg:px-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.1em] text-[#FF6B35] mb-6"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          {"\u25CF"} ERROR 404
        </div>
        <h1
          className="uppercase leading-[0.95] mb-6"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            color: "#E8E8E8",
          }}
        >
          AGENT NOT FOUND
        </h1>
        <p
          className="text-base text-[#6B6B6B] mb-10 max-w-md leading-relaxed"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
          }}
        >
          The agent you are looking for does not exist or has been decommissioned.
        </p>
        <Link
          href="/templates/agent-marketplace/explore"
          className="inline-block text-[11px] uppercase tracking-[0.08em] text-[#0A0A0A] bg-[#E8FF47] border border-[#E8FF47] px-6 py-3 hover:bg-transparent hover:text-[#E8FF47] transition-all duration-100"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            borderRadius: 0,
          }}
        >
          {"\u2190 BACK TO VAULT"}
        </Link>
      </motion.div>
    </div>
  );
}
