"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Package, AlertTriangle, MapPin } from "lucide-react";

// Simplified world map dots (major trade hubs)
const mapDots = [
  // North America
  { x: 22, y: 35, label: "LA" },
  { x: 30, y: 30, label: "CHI" },
  // Europe
  { x: 48, y: 28, label: "RTM" },
  // Asia
  { x: 78, y: 38, label: "SHN" },
  { x: 70, y: 32, label: "DXB" },
];

// Animated route lines between hubs
const routes = [
  { from: { x: 22, y: 35 }, to: { x: 30, y: 30 } },
  { from: { x: 48, y: 28 }, to: { x: 70, y: 32 } },
  { from: { x: 70, y: 32 }, to: { x: 78, y: 38 } },
];

export default function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring" as const,
        stiffness: 50,
        damping: 20,
        delay: 0.5,
      }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 520,
        background: "rgba(20, 18, 16, 0.8)",
        border: "1px solid rgba(200, 149, 108, 0.12)",
        borderRadius: 16,
        overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "12px 16px",
          borderBottom: "1px solid rgba(200, 149, 108, 0.08)",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(200, 149, 108, 0.3)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(200, 149, 108, 0.15)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(200, 149, 108, 0.15)" }} />
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5625rem",
            color: "#4A443D",
            letterSpacing: "0.08em",
          }}
        >
          LIVE
        </span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#6B9E8A",
          }}
        />
      </div>

      {/* Map area */}
      <div style={{ position: "relative", padding: "20px 16px 12px" }}>
        <svg
          viewBox="0 0 100 60"
          style={{ width: "100%", height: "auto", opacity: 0.7 }}
          fill="none"
        >
          {/* Faint grid lines */}
          {[15, 30, 45].map((y) => (
            <line
              key={`h-${y}`}
              x1="0" y1={y} x2="100" y2={y}
              stroke="rgba(200,149,108,0.05)"
              strokeWidth="0.3"
            />
          ))}
          {[25, 50, 75].map((x) => (
            <line
              key={`v-${x}`}
              x1={x} y1="0" x2={x} y2="60"
              stroke="rgba(200,149,108,0.05)"
              strokeWidth="0.3"
            />
          ))}

          {/* Route lines */}
          {routes.map((route, i) => (
            <motion.line
              key={i}
              x1={route.from.x}
              y1={route.from.y}
              x2={route.to.x}
              y2={route.to.y}
              stroke="#7B8FA8"
              strokeWidth="0.5"
              strokeDasharray="2 1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.5, delay: 1 + i * 0.3 }}
            />
          ))}

          {/* Hub dots */}
          {mapDots.map((dot, i) => (
            <g key={dot.label}>
              {/* Pulse ring */}
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r="2.5"
                fill="none"
                stroke="#C8956C"
                strokeWidth="0.3"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] } : {}}
                transition={{
                  duration: 3,
                  delay: 0.8 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Dot */}
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r="1.2"
                fill="#C8956C"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, type: "spring" as const, stiffness: 200 }}
              />
              {/* Label */}
              <motion.text
                x={dot.x}
                y={dot.y - 4}
                textAnchor="middle"
                fill="#7A7067"
                fontSize="2.5"
                fontFamily="'JetBrains Mono', monospace"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                {dot.label}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>

      {/* Floating cards */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "0 16px 16px",
        }}
      >
        {/* Shipment status card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, type: "spring" as const, stiffness: 60, damping: 18 }}
          style={{
            flex: 1,
            backgroundColor: "rgba(12, 10, 9, 0.9)",
            border: "1px solid rgba(107, 158, 138, 0.2)",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Package size={13} color="#6B9E8A" strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5625rem",
                color: "#7A7067",
                letterSpacing: "0.06em",
              }}
            >
              TRK-48291
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "#EDE8E0",
              display: "block",
              marginBottom: 6,
            }}
          >
            Rotterdam &rarr; Shanghai
          </span>
          <span
            style={{
              display: "inline-block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.5625rem",
              color: "#6B9E8A",
              backgroundColor: "rgba(107, 158, 138, 0.1)",
              padding: "3px 8px",
              borderRadius: 4,
              letterSpacing: "0.04em",
            }}
          >
            On time
          </span>
        </motion.div>

        {/* Alert card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, type: "spring" as const, stiffness: 60, damping: 18 }}
          style={{
            flex: 1,
            backgroundColor: "rgba(12, 10, 9, 0.9)",
            border: "1px solid rgba(212, 132, 90, 0.2)",
            borderRadius: 10,
            padding: "12px 14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <AlertTriangle size={13} color="#D4845A" strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5625rem",
                color: "#D4845A",
                letterSpacing: "0.06em",
              }}
            >
              ALERT
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "#EDE8E0",
              display: "block",
              marginBottom: 6,
            }}
          >
            Port congestion — DXB
          </span>
          <span
            style={{
              display: "inline-block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.5625rem",
              color: "#D4845A",
              backgroundColor: "rgba(212, 132, 90, 0.1)",
              padding: "3px 8px",
              borderRadius: 4,
              letterSpacing: "0.04em",
            }}
          >
            +6h delay
          </span>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(200, 149, 108, 0.08)",
          padding: "10px 16px",
          gap: 16,
        }}
      >
        {[
          { label: "Active", value: "847", color: "#6B9E8A" },
          { label: "Delayed", value: "23", color: "#D4845A" },
          { label: "Carriers", value: "214", color: "#7B8FA8" },
        ].map((stat) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={10} color={stat.color} strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5625rem",
                color: "#4A443D",
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: "0.6875rem",
                color: stat.color,
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
