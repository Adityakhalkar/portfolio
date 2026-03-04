"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FOOTER_COLUMNS = [
  {
    header: "PRODUCT",
    links: ["Explore", "Publish", "Pricing", "Sandbox"],
  },
  {
    header: "DEVELOPERS",
    links: ["Docs", "API Reference", "SDK", "Changelog"],
  },
  {
    header: "COMPANY",
    links: ["About", "Blog", "Careers", "Contact"],
  },
] as const;

function FooterLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block text-[11px] uppercase tracking-wider py-[3px]"
      style={{
        fontFamily: "'Space Mono', monospace",
        fontWeight: 400,
        color: hovered ? "#E8E8E8" : "#6B6B6B",
        textDecoration: "none",
        transition: "color 100ms ease",
      }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid #2A2A2A",
      }}
    >
      {/* Main footer content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-6 md:px-10 pt-14 pb-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Col 1: Logo + tagline */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 * 0.1, ease: "easeOut" }}
          >
            <span
              className="text-sm tracking-[0.15em] uppercase block"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 700,
                color: "#E8E8E8",
              }}
            >
              AGENTVAULT
            </span>
            <span
              className="text-[10px] uppercase tracking-wider block mt-1"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 400,
                color: "#6B6B6B",
              }}
            >
              The agent marketplace
            </span>
          </motion.div>

          {/* Cols 2-4: Link columns */}
          {FOOTER_COLUMNS.map((col, index) => (
            <motion.div
              key={col.header}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index + 1) * 0.1, ease: "easeOut" }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.15em] block mb-4"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  color: "#E8FF47",
                }}
              >
                {col.header}
              </span>
              <div className="flex flex-col gap-[2px]">
                {col.links.map((link) => (
                  <FooterLink key={link} label={link} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div
        className="px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2"
        style={{ borderTop: "1px solid #2A2A2A" }}
      >
        <span
          className="text-[10px] uppercase tracking-wider"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 400,
            color: "#6B6B6B",
          }}
        >
          &copy; 2026 AGENTVAULT
        </span>
        <span
          className="text-[10px] uppercase tracking-wider"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 400,
            color: "#6B6B6B",
          }}
        >
          BUILT FOR DEVELOPERS, BY DEVELOPERS
        </span>
      </div>
    </footer>
  );
}
