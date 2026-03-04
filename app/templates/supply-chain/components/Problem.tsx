"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, EyeOff, AlertTriangle, Flame } from "lucide-react";
import Image from "next/image";
import DonutChart from "./DonutChart";

const problems = [
  {
    icon: Clock,
    title: "Late notifications",
    description: "Carrier updates arrive 4-6 hours after the disruption has already impacted your timeline.",
    color: "#D4845A",
  },
  {
    icon: EyeOff,
    title: "No unified view",
    description: "Twelve carrier portals, five spreadsheets, and endless email threads for a single shipment.",
    color: "#D4845A",
  },
  {
    icon: AlertTriangle,
    title: "Reactive, not predictive",
    description: "Disruptions surface as crises instead of early warnings. By then, it costs you real money.",
    color: "#D4845A",
  },
  {
    icon: Flame,
    title: "Manual exception handling",
    description: "Your logistics team spends 60% of their time on fire drills instead of strategic work.",
    color: "#D4845A",
  },
];

export default function Problem() {
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
      id="platform"
      style={{
        position: "relative",
        paddingTop: isMd ? 160 : 100,
        paddingBottom: isMd ? 160 : 100,
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #0C0A09 0%, #141210 50%, #0C0A09 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="px-6 md:px-16 lg:px-24"
        style={{ position: "relative" }}
      >
        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{
            height: 1,
            backgroundColor: "rgba(200,149,108,0.15)",
            transformOrigin: "left",
            marginBottom: isMd ? 72 : 48,
          }}
        />

        {/* Top section: donut chart + statement */}
        <div
          style={{
            display: "flex",
            flexDirection: isMd ? "row" : "column",
            alignItems: isMd ? "center" : "flex-start",
            gap: isMd ? 64 : 36,
            marginBottom: isMd ? 80 : 56,
          }}
        >
          {/* Donut chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" as const, stiffness: 60, damping: 20 }}
          >
            <DonutChart value={73} label="lack visibility" color="#D4845A" size={isMd ? 180 : 150} />
          </motion.div>

          {/* Statement */}
          <div style={{ flex: 1, maxWidth: 520 }}>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring" as const,
                stiffness: 60,
                damping: 20,
                delay: 0.4,
              }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: isMd ? "clamp(1.5rem, 2.5vw, 2rem)" : "1.375rem",
                lineHeight: 1.4,
                color: "#EDE8E0",
                margin: 0,
                marginBottom: 16,
              }}
            >
              of supply chain leaders lack real-time
              visibility across their full logistics network.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, type: "spring" as const, stiffness: 60, damping: 20 }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#7A7067",
                margin: 0,
              }}
            >
              You&apos;re checking twelve carrier portals. Chasing email
              threads for ETAs. Learning about delays after they&apos;ve
              already cost you money.
            </motion.p>
          </div>
        </div>

        {/* Image strip -- real logistics photography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMd ? "1fr 1fr 1fr" : "1fr",
            gap: 12,
            marginBottom: isMd ? 48 : 32,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {[
            {
              src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format",
              alt: "Shipping containers at dock",
              height: isMd ? 160 : 140,
            },
            {
              src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80&auto=format",
              alt: "Warehouse logistics operations",
              height: isMd ? 160 : 0,
              hideOnMobile: true,
            },
            {
              src: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?w=600&q=80&auto=format",
              alt: "Freight truck on highway",
              height: isMd ? 160 : 0,
              hideOnMobile: true,
            },
          ].map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                height: img.height,
                borderRadius: 8,
                overflow: "hidden",
                display: img.hideOnMobile && !isMd ? "none" : "block",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover", opacity: 0.6 }}
                sizes={isMd ? "33vw" : "100vw"}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(12,10,9,0.6) 100%)",
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* Problem cards -- 2x2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMd ? "1fr 1fr" : "1fr",
            gap: 16,
          }}
        >
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring" as const,
                  stiffness: 60,
                  damping: 20,
                  delay: 0.7 + i * 0.08,
                }}
                style={{
                  backgroundColor: "#141210",
                  borderRadius: 12,
                  padding: isMd ? "24px 28px" : "20px 22px",
                  borderLeft: `3px solid ${problem.color}`,
                  border: "1px solid rgba(200, 149, 108, 0.06)",
                  borderLeftColor: problem.color,
                  borderLeftWidth: 3,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      backgroundColor: `${problem.color}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={problem.color} strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      color: "#EDE8E0",
                      margin: 0,
                    }}
                  >
                    {problem.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.8125rem",
                    lineHeight: 1.65,
                    color: "#7A7067",
                    margin: 0,
                  }}
                >
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
