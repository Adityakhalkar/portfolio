"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Clock, Target } from "lucide-react";
import BarChart from "./BarChart";

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main section */}
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          paddingTop: isMd ? 160 : 100,
          paddingBottom: isMd ? 100 : 64,
          position: "relative",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: isMd ? 48 : 32,
          }}
        >
          <span
            style={{
              width: 24,
              height: 1,
              backgroundColor: "#C8956C",
              opacity: 0.4,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#4A443D",
              letterSpacing: "0.15em",
            }}
          >
            Results
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: isMd ? 16 : 12 }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              type: "spring" as const,
              stiffness: 70,
              damping: 22,
              delay: 0.2,
            }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: isMd
                ? "clamp(2rem, 4vw, 3rem)"
                : "clamp(1.5rem, 6vw, 2rem)",
              lineHeight: 1.15,
              color: "#EDE8E0",
              margin: 0,
              maxWidth: 480,
            }}
          >
            Detention costs cut by nearly half.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "#7A7067",
            maxWidth: 420,
            margin: 0,
            marginBottom: isMd ? 56 : 40,
          }}
        >
          Average across enterprise clients in the first 90 days after deployment.
        </motion.p>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, type: "spring" as const, stiffness: 60, damping: 20 }}
        >
          <BarChart
            beforeValue={100}
            afterValue={53}
            beforeLabel="Before Transit"
            afterLabel="After Transit"
            unit="%"
          />
        </motion.div>
      </div>

      {/* Supporting stats */}
      <div
        style={{
          borderTop: "1px solid rgba(200,149,108,0.08)",
          display: "grid",
          gridTemplateColumns: isMd ? "1fr 1fr 1fr" : "1fr",
        }}
      >
        {[
          {
            icon: Truck,
            value: "200+",
            label: "Carriers integrated",
            context: "FTL, LTL, ocean, air, rail",
            color: "#7B8FA8",
          },
          {
            icon: Clock,
            value: "< 5 min",
            label: "Update frequency",
            context: "Real-time status polling",
            color: "#C8956C",
            // mini visualization: clock ring
            viz: "clock",
          },
          {
            icon: Target,
            value: "96.8%",
            label: "Classification accuracy",
            context: "HS code automation",
            color: "#8BC4A0",
            // mini visualization: progress bar
            viz: "progress",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring" as const,
                stiffness: 60,
                damping: 20,
                delay: 0.9 + i * 0.1,
              }}
              className="px-6 md:px-16 lg:px-10"
              style={{
                paddingTop: isMd ? 40 : 28,
                paddingBottom: isMd ? 40 : 28,
                borderRight:
                  isMd && i < 2
                    ? "1px solid rgba(200,149,108,0.08)"
                    : "none",
                borderBottom:
                  !isMd && i < 2
                    ? "1px solid rgba(200,149,108,0.08)"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <Icon size={18} color={stat.color} strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: isMd ? "2rem" : "1.75rem",
                    lineHeight: 1,
                    color: "#EDE8E0",
                  }}
                >
                  {stat.value}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.8125rem",
                  color: "#7A7067",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {stat.label}
              </span>

              {/* Mini visualization */}
              {stat.viz === "progress" && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: 140,
                    height: 4,
                    backgroundColor: "rgba(200, 149, 108, 0.06)",
                    borderRadius: 2,
                    overflow: "hidden",
                    marginBottom: 8,
                    marginTop: 8,
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "96.8%" } : {}}
                    transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    style={{
                      height: "100%",
                      backgroundColor: stat.color,
                      borderRadius: 2,
                    }}
                  />
                </div>
              )}

              {stat.viz === "clock" && (
                <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginTop: 6, marginBottom: 4 }}>
                  <circle
                    cx="14" cy="14" r="11"
                    fill="none"
                    stroke="rgba(200,149,108,0.1)"
                    strokeWidth="1.5"
                  />
                  <motion.circle
                    cx="14" cy="14" r="11"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 11}
                    initial={{ strokeDashoffset: 2 * Math.PI * 11 }}
                    animate={isInView ? { strokeDashoffset: 2 * Math.PI * 11 * 0.08 } : {}}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                  />
                </svg>
              )}

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6875rem",
                  color: "#4A443D",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.context}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
