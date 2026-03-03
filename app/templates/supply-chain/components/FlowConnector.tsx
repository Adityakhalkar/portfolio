"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FlowConnectorProps {
  steps: number;
  activeStep?: number;
}

export default function FlowConnector({ steps }: FlowConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const totalHeight = (steps - 1) * 100;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: 19,
        top: 42,
        width: 2,
        height: totalHeight,
        zIndex: 1,
      }}
    >
      <svg
        width="2"
        height={totalHeight}
        viewBox={`0 0 2 ${totalHeight}`}
        style={{ overflow: "visible" }}
      >
        {/* Main connecting line */}
        <motion.line
          x1="1" y1="0"
          x2="1" y2={totalHeight}
          stroke="rgba(200, 149, 108, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Animated pulse dot traveling down the line */}
        <motion.circle
          cx="1"
          r="2.5"
          fill="#6B9E8A"
          initial={{ cy: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  cy: [0, totalHeight],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 4,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
