"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { AGENTS, CATEGORIES, type Agent } from "../data/agents";
import Cursor from "../components/Cursor";

// ─── SORT OPTIONS ────────────────────────────────────────────────────────────

type SortKey = "deploys" | "newest" | "rating" | "price-low" | "price-high";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "deploys", label: "MOST DEPLOYED" },
  { key: "newest", label: "NEWEST" },
  { key: "rating", label: "HIGHEST RATED" },
  { key: "price-low", label: "PRICE: LOW" },
  { key: "price-high", label: "PRICE: HIGH" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function parseDeployCount(deploys: string): number {
  const cleaned = deploys.replace(/,/g, "").toLowerCase();
  if (cleaned.endsWith("k")) return parseFloat(cleaned) * 1000;
  if (cleaned.endsWith("m")) return parseFloat(cleaned) * 1000000;
  return parseFloat(cleaned) || 0;
}

function parsePrice(price: string): number {
  const match = price.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function parseDateString(dateStr: string): number {
  return new Date(dateStr).getTime();
}

function sortAgents(agents: Agent[], sortKey: SortKey): Agent[] {
  const sorted = [...agents];
  switch (sortKey) {
    case "deploys":
      return sorted.sort(
        (a, b) => parseDeployCount(b.deploys) - parseDeployCount(a.deploys)
      );
    case "newest":
      return sorted.sort(
        (a, b) => parseDateString(b.lastUpdated) - parseDateString(a.lastUpdated)
      );
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "price-low":
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case "price-high":
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    default:
      return sorted;
  }
}

function computeTotalDeploys(): string {
  let total = 0;
  for (const agent of AGENTS) {
    total += parseDeployCount(agent.deploys);
  }
  if (total >= 1000) {
    return (total / 1000).toFixed(1) + "k";
  }
  return total.toString();
}

// ─── ANIMATED AGENT CARD ─────────────────────────────────────────────────────

function AgentGridCard({
  agent,
  index,
}: {
  agent: Agent;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/templates/agent-marketplace/agent/${agent.slug}`}
        className="block group"
        style={{ textDecoration: "none" }}
      >
        <div
          className="bg-[#141414] border border-[#2A2A2A] p-5 transition-colors duration-100 hover:border-[#E8FF47]"
          style={{ borderRadius: 0 }}
        >
          {/* Top row: category + status */}
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

          {/* Agent name */}
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

          {/* Rating */}
          <div className="mb-4">
            <span
              className="text-sm"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                color: "#E8FF47",
              }}
            >
              {"★ "}
              {agent.rating.toFixed(1)}
            </span>
          </div>

          {/* Bottom metadata bar */}
          <div
            className="text-[11px] text-[#6B6B6B] pt-3 border-t border-[#2A2A2A]"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 400,
            }}
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

// ─── CUSTOM SORT DROPDOWN ────────────────────────────────────────────────────

function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel =
    SORT_OPTIONS.find((o) => o.key === value)?.label || "MOST DEPLOYED";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.06em] border border-[#2A2A2A] bg-[#141414] text-[#E8E8E8] transition-colors duration-100 hover:border-[#E8FF47]"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
          borderRadius: 0,
        }}
      >
        {currentLabel}
        <span
          className="text-[9px] ml-1"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 100ms ease",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 border border-[#2A2A2A] bg-[#141414] min-w-[180px]"
          style={{ borderRadius: 0 }}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onChange(option.key);
                setOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-[11px] uppercase tracking-[0.06em] transition-colors duration-100 ${
                value === option.key
                  ? "bg-[#E8FF47] text-[#0A0A0A]"
                  : "text-[#6B6B6B] hover:text-[#E8E8E8] hover:bg-[#1A1A1A]"
              }`}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                borderRadius: 0,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPLORE PAGE ──────────────────────────────────────────────────────

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("deploys");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let result = [...AGENTS];

    // Category filter
    if (activeCategory !== "ALL") {
      result = result.filter((a) => a.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Sort
    result = sortAgents(result, sortKey);

    return result;
  }, [activeCategory, searchQuery, sortKey]);

  const totalDeploys = useMemo(() => computeTotalDeploys(), []);
  const categoryCount = CATEGORIES.filter((c) => c !== "ALL").length;

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("ALL");
    setSortKey("deploys");
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#0A0A0A", cursor: "none" }}
    >
      <Cursor />
      {/* ─── TOP BAR ──────────────────────────────────── */}
      <div
        className="w-full border-b border-[#2A2A2A] px-5 md:px-10 lg:px-16"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="flex items-center justify-between py-4">
          <Link
            href="/templates/agent-marketplace"
            className="text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] transition-colors duration-100 hover:text-[#E8FF47]"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ← AGENTVAULT
          </Link>
          <span
            className="text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            [{AGENTS.length}] AGENTS
          </span>
        </div>
      </div>

      {/* ─── PAGE CONTENT ─────────────────────────────── */}
      <div className="px-5 md:px-10 lg:px-16 pt-10 pb-24">
        {/* Page title */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-3xl md:text-5xl uppercase tracking-tight text-[#E8E8E8]"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            EXPLORE AGENTS
          </motion.h1>
        </div>

        {/* ─── SEARCH BAR ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="relative mb-6"
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH AGENTS..."
            className="w-full bg-[#141414] border border-[#2A2A2A] px-4 py-3 text-sm text-[#E8E8E8] placeholder-[#6B6B6B] outline-none transition-colors duration-100 focus:border-[#E8FF47]"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 400,
              borderRadius: 0,
            }}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 border border-[#2A2A2A] px-1.5 py-0.5 text-[10px] text-[#6B6B6B] pointer-events-none"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              borderRadius: 0,
            }}
          >
            /
          </div>
        </motion.div>

        {/* ─── FILTER ROW ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mr-4">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.4 + i * 0.04,
                  ease: "easeOut",
                }}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.06em] border transition-colors duration-100 ${
                  activeCategory === cat
                    ? "bg-[#E8FF47] text-[#0A0A0A] border-[#E8FF47]"
                    : "bg-transparent text-[#6B6B6B] border-[#2A2A2A] hover:border-[#E8FF47] hover:text-[#E8E8E8]"
                }`}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  borderRadius: 0,
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="ml-auto">
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        </motion.div>

        {/* ─── RESULTS COUNT ────────────────────────────── */}
        <div className="mb-6">
          <span
            className="text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]"
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 400 }}
          >
            SHOWING {filteredAgents.length} AGENT
            {filteredAgents.length !== 1 ? "S" : ""}
          </span>
        </div>

        {/* ─── AGENT GRID / EMPTY STATE ─────────────────── */}
        {filteredAgents.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}-${sortKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredAgents.map((agent, i) => (
                <AgentGridCard
                  key={agent.slug}
                  agent={agent}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-24"
            >
              <p
                className="text-2xl md:text-4xl uppercase tracking-tight text-[#6B6B6B] mb-8"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}
              >
                NO AGENTS FOUND
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.06em] border border-[#2A2A2A] bg-transparent text-[#E8E8E8] transition-colors duration-100 hover:bg-[#E8FF47] hover:text-[#0A0A0A] hover:border-[#E8FF47]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  borderRadius: 0,
                }}
              >
                RESET FILTERS
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ─── STATS BAR (sticky bottom) ────────────────── */}
      <div
        className="fixed bottom-0 left-0 w-full border-t border-[#2A2A2A] px-5 md:px-10 lg:px-16 py-2.5 z-40"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B]"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 400 }}
        >
          {AGENTS.length} AGENTS
          <span className="mx-2">/</span>
          {categoryCount} CATEGORIES
          <span className="mx-2">/</span>
          {totalDeploys} TOTAL DEPLOYS
        </div>
      </div>
    </div>
  );
}
