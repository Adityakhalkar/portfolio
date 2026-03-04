"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Node positions for a distributed network
const nodes = [
  { x: 15, y: 20 }, { x: 35, y: 12 }, { x: 55, y: 22 },
  { x: 75, y: 15 }, { x: 90, y: 25 }, { x: 10, y: 50 },
  { x: 30, y: 45 }, { x: 50, y: 55 }, { x: 70, y: 48 },
  { x: 88, y: 52 }, { x: 20, y: 78 }, { x: 42, y: 82 },
  { x: 62, y: 75 }, { x: 80, y: 80 }, { x: 25, y: 35 },
  { x: 65, y: 38 }, { x: 45, y: 68 },
];

// Edges connecting nearby nodes
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [6, 7], [7, 8], [8, 9],
  [10, 11], [11, 12], [12, 13],
  [0, 5], [1, 14], [14, 6], [2, 15],
  [15, 8], [5, 10], [6, 16], [16, 11],
  [7, 12], [3, 15], [9, 13],
];

export default function NetworkGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.12,
        }}
      >
        {/* Edges */}
        {edges.map(([from, to], i) => (
          <motion.line
            key={`e-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="#7B8FA8"
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.04 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={node.x}
            cy={node.y}
            r="1"
            fill="#C8956C"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.05, type: "spring" as const, stiffness: 150 }}
          />
        ))}

        {/* Animated "packet" traveling along one edge */}
        <motion.circle
          r="0.8"
          fill="#6B9E8A"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  cx: [nodes[1].x, nodes[2].x, nodes[15].x, nodes[8].x],
                  cy: [nodes[1].y, nodes[2].y, nodes[15].y, nodes[8].y],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 6,
            delay: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}
