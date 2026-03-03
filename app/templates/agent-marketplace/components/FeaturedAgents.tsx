"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AgentCard from "./AgentCard";
import { getFeaturedAgents, CATEGORIES } from "../data/agents";

const FILTERS = CATEGORIES.slice(0, 6);
const AGENTS = getFeaturedAgents();

export default function FeaturedAgents() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredAgents =
    activeFilter === "ALL"
      ? AGENTS
      : AGENTS.filter((a) => a.category === activeFilter);

  return (
    <section className="w-full bg-[#0A0A0A] px-5 py-16 md:px-10 lg:px-16">
      {/* Heading */}
      <div className="flex items-baseline gap-3 mb-6">
        <h2
          className="text-2xl text-[#E8E8E8] uppercase tracking-tight"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          FEATURED AGENTS
        </h2>
        <span
          className="text-sm text-[#E8FF47]"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          [24]
        </span>
      </div>

      {/* Filter tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.06em] rounded-none border transition-colors duration-100 ${
              activeFilter === filter
                ? "bg-[#E8FF47] text-[#0A0A0A] border-[#E8FF47]"
                : "bg-transparent text-[#6B6B6B] border-[#2A2A2A] hover:border-[#E8FF47] hover:text-[#E8E8E8]"
            }`}
            style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Asymmetric grid — terminal catalog rhythm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2A2A2A]">
        {/* Row 1: large card (2 cols) + regular card (1 col) */}
        {filteredAgents[0] && (
          <motion.div
            className="md:col-span-2 bg-[#0A0A0A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 * 0.08, ease: "easeOut" }}
          >
            <Link href={`/templates/agent-marketplace/agent/${filteredAgents[0].slug}`}>
              <AgentCard {...filteredAgents[0]} />
            </Link>
          </motion.div>
        )}
        {filteredAgents[1] && (
          <motion.div
            className="md:col-span-1 bg-[#0A0A0A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1 * 0.08, ease: "easeOut" }}
          >
            <Link href={`/templates/agent-marketplace/agent/${filteredAgents[1].slug}`}>
              <AgentCard {...filteredAgents[1]} />
            </Link>
          </motion.div>
        )}

        {/* Row 2: two regular cards + empty cell for asymmetry */}
        {filteredAgents[2] && (
          <motion.div
            className="md:col-span-1 bg-[#0A0A0A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 2 * 0.08, ease: "easeOut" }}
          >
            <Link href={`/templates/agent-marketplace/agent/${filteredAgents[2].slug}`}>
              <AgentCard {...filteredAgents[2]} />
            </Link>
          </motion.div>
        )}
        {filteredAgents[3] && (
          <motion.div
            className="md:col-span-1 bg-[#0A0A0A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 3 * 0.08, ease: "easeOut" }}
          >
            <Link href={`/templates/agent-marketplace/agent/${filteredAgents[3].slug}`}>
              <AgentCard {...filteredAgents[3]} />
            </Link>
          </motion.div>
        )}
        {/* Empty cell — intentional gap in the catalog */}
        {filteredAgents.length >= 4 && (
          <div className="hidden md:block bg-[#0A0A0A]" />
        )}

        {/* Row 3: regular card (1 col) + large card (2 cols) */}
        {filteredAgents[4] && (
          <motion.div
            className="md:col-span-1 bg-[#0A0A0A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 4 * 0.08, ease: "easeOut" }}
          >
            <Link href={`/templates/agent-marketplace/agent/${filteredAgents[4].slug}`}>
              <AgentCard {...filteredAgents[4]} />
            </Link>
          </motion.div>
        )}
        {filteredAgents[5] && (
          <motion.div
            className="md:col-span-2 bg-[#0A0A0A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 5 * 0.08, ease: "easeOut" }}
          >
            <Link href={`/templates/agent-marketplace/agent/${filteredAgents[5].slug}`}>
              <AgentCard {...filteredAgents[5]} />
            </Link>
          </motion.div>
        )}
      </div>

      {/* View all link */}
      <div className="mt-8">
        <Link
          href="/templates/agent-marketplace/explore"
          className="text-[#E8FF47] text-sm uppercase tracking-[0.06em] transition-opacity duration-100 hover:opacity-70"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          {"VIEW ALL AGENTS \u2192"}
        </Link>
      </div>
    </section>
  );
}
