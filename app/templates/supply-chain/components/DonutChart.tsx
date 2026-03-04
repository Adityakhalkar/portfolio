"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DonutChartProps {
  value: number;
  label: string;
  color?: string;
  size?: number;
}

export default function DonutChart({
  value,
  label,
  color = "#D4845A",
  size = 180,
}: DonutChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (value / 100);
  const center = size / 2;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(200, 149, 108, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Filled arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - filled } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      {/* Center text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" as const, stiffness: 80 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: size * 0.22,
            color: "#EDE8E0",
            lineHeight: 1,
          }}
        >
          {value}%
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5625rem",
            color: "#7A7067",
            letterSpacing: "0.06em",
            marginTop: 4,
          }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
}
