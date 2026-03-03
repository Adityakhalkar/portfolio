"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const templates = [
  {
    slug: "agent-marketplace",
    name: "AGENTVAULT",
    description: "AI agent marketplace with controlled brutalism aesthetic. Terminal-style catalog, asymmetric grids, acid accent on dark.",
    aesthetic: "Controlled Brutalism",
    stack: ["React", "Tailwind", "Framer Motion"],
    colors: ["#0A0A0A", "#E8FF47", "#FF6B35"],
  },
  {
    slug: "ai-governance",
    name: "AEGIS",
    description: "AI governance platform with barely-there minimalism. Warm paper backgrounds, serif display type, institutional authority.",
    aesthetic: "Barely-There Minimalism",
    stack: ["React", "Tailwind", "Framer Motion"],
    colors: ["#F7F6F3", "#1A1A1A", "#2D6A4F"],
  },
  {
    slug: "motion-design",
    name: "MOTIVE",
    description: "Motion design platform with soft maximalism. Spring-physics animations, oversized type, elastic interactions, bold accent on light.",
    aesthetic: "Soft Maximalism",
    stack: ["React", "Tailwind", "Framer Motion", "GSAP"],
    colors: ["#FAFAF8", "#1A1A1A", "#FF3366"],
  },
  {
    slug: "threat-intel",
    name: "VIGIL",
    description: "Threat intelligence platform with surveillance editorial aesthetic. CCTV-grid panels, live timestamps, scanline overlays, binary hover states.",
    aesthetic: "Surveillance Editorial",
    stack: ["React", "Tailwind", "Framer Motion", "GSAP"],
    colors: ["#0B0D11", "#E0E0E0", "#F43F5E"],
  },
  {
    slug: "supply-chain",
    name: "TRANSIT",
    description: "Supply chain visibility platform with atmospheric editorial aesthetic. Deep warm dark tones, luminous copper accents, decorative arcs, glassmorphism navigation.",
    aesthetic: "Atmospheric Editorial",
    stack: ["React", "Tailwind", "Framer Motion"],
    colors: ["#0C0A09", "#C8956C", "#EDE8E0"],
  },
];

export default function TemplatesIndex() {
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#E8E8E8",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#2A2A2A] px-6 md:px-12 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-[#6B6B6B] hover:text-[#E8E8E8] transition-colors duration-100"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          &larr; PORTFOLIO
        </Link>
        <span
          className="text-xs text-[#6B6B6B] uppercase tracking-widest"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {templates.length} TEMPLATE{templates.length !== 1 ? "S" : ""}
        </span>
      </header>

      {/* Title */}
      <section className="px-6 md:px-12 pt-20 pb-16 border-b border-[#2A2A2A]">
        <p
          className="text-xs text-[#6B6B6B] uppercase tracking-[0.3em] mb-4"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          UI TEMPLATE COLLECTION
        </p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            TEMPLATES<span className="text-[#E8FF47]">.</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-[#6B6B6B] max-w-lg text-base leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Opinionated, production-grade landing page templates. Each one is built with a unique design system — no two look alike.
        </motion.p>
      </section>

      {/* Template List */}
      <section className="px-6 md:px-12 py-12">
        <div className="flex flex-col">
          {templates.map((template, i) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            >
              <TemplateRow template={template} index={i} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TemplateRow({
  template,
  index,
}: {
  template: (typeof templates)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="block border-b border-[#2A2A2A] transition-colors duration-100"
      style={{ backgroundColor: hovered ? "#141414" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
        {/* Index number */}
        <span
          className="text-3xl md:text-5xl font-bold shrink-0 md:w-24"
          style={{
            fontFamily: "'Space Mono', monospace",
            color: hovered ? "#E8FF47" : "#2A2A2A",
            transition: "color 100ms",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-3">
            <h2
              className="text-xl md:text-2xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {template.name}
            </h2>
            <span
              className="text-[10px] uppercase px-2 py-1 border border-[#2A2A2A]"
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "#E8FF47",
                borderColor: hovered ? "#E8FF47" : "#2A2A2A",
                transition: "border-color 100ms",
              }}
            >
              {template.aesthetic}
            </span>
          </div>

          <p
            className="text-sm text-[#6B6B6B] max-w-xl leading-relaxed mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {template.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-6">
            {/* Color swatches */}
            <div className="flex items-center gap-1.5">
              {template.colors.map((color) => (
                <div
                  key={color}
                  className="w-3 h-3 border border-[#2A2A2A]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Stack tags */}
            <div className="flex items-center gap-2">
              {template.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase text-[#6B6B6B]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <span
          className="hidden md:block text-lg shrink-0 self-center"
          style={{
            fontFamily: "'Space Mono', monospace",
            color: hovered ? "#E8FF47" : "#2A2A2A",
            transition: "color 100ms",
          }}
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}
