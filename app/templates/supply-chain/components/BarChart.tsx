"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BarChartProps {
  beforeValue: number;
  afterValue: number;
  beforeLabel?: string;
  afterLabel?: string;
  unit?: string;
}

export default function BarChart({
  beforeValue,
  afterValue,
  beforeLabel = "Before Transit",
  afterLabel = "After Transit",
  unit = "%",
}: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const maxValue = Math.max(beforeValue, afterValue);

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 420 }}>
      {/* Before bar */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "0.8125rem",
              color: "#7A7067",
            }}
          >
            {beforeLabel}
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#4A443D",
            }}
          >
            {beforeValue}{unit}
          </motion.span>
        </div>
        <div
          style={{
            width: "100%",
            height: 8,
            backgroundColor: "rgba(200, 149, 108, 0.06)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(beforeValue / maxValue) * 100}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              height: "100%",
              backgroundColor: "#4A443D",
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      {/* After bar */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "0.8125rem",
              color: "#EDE8E0",
            }}
          >
            {afterLabel}
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#8BC4A0",
            }}
          >
            {afterValue}{unit}
          </motion.span>
        </div>
        <div
          style={{
            width: "100%",
            height: 8,
            backgroundColor: "rgba(200, 149, 108, 0.06)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(afterValue / maxValue) * 100}%` } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              height: "100%",
              backgroundColor: "#8BC4A0",
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      {/* Delta indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4 }}
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            color: "#8BC4A0",
            letterSpacing: "0.04em",
          }}
        >
          {Math.round(((beforeValue - afterValue) / beforeValue) * 100)}% reduction
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5625rem",
            color: "#4A443D",
          }}
        >
          in 90 days
        </span>
      </motion.div>
    </div>
  );
}
