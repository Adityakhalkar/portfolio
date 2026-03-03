"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "Deloitte", context: "Advisory" },
  { name: "Siemens", context: "Manufacturing" },
  { name: "Roche", context: "Pharma" },
  { name: "NatWest", context: "Banking" },
  { name: "Airbus", context: "Aerospace" },
];

export default function TrustedBy() {
  return (
    <section
      style={{
        backgroundColor: "#F7F6F3",
        borderTop: "1px solid #E5E5E0",
      }}
      className="py-6 px-8 md:px-16"
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto" }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10"
      >
        {/* Left label */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.6875rem",
            color: "#8C8C8C",
            whiteSpace: "nowrap",
            flexShrink: 0,
            letterSpacing: "0.02em",
          }}
        >
          Governing AI at
        </motion.span>

        {/* Company names — left-aligned row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center"
          style={{ gap: "1.25rem 2rem" }}
        >
          {companies.map((company) => (
            <span
              key={company.name}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "#C8C8C8",
                userSelect: "none",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
            >
              {company.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
