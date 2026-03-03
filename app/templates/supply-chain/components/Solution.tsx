"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plug, Radar, Route } from "lucide-react";
import Image from "next/image";
import FlowConnector from "./FlowConnector";

const steps = [
  {
    num: "01",
    title: "Connect",
    subtitle: "your carriers",
    description:
      "One integration protocol replaces dozens of portals. FTL, LTL, ocean, air, rail -- all consolidated. Live within 48 hours.",
    icon: Plug,
    color: "#6B9E8A",
    illustration: "nodes",
    image: "https://images.unsplash.com/photo-1590822162154-e781f7ca72c0?w=400&q=80&auto=format",
    imageAlt: "Shipping containers at port dock",
  },
  {
    num: "02",
    title: "See",
    subtitle: "what\u2019s coming",
    description:
      "ML models trained on 8 years of logistics data flag disruptions 4-6 hours before carrier notification. Scored by probability and shipment impact.",
    icon: Radar,
    color: "#7B8FA8",
    illustration: "sparkline",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format",
    imageAlt: "Data analytics dashboard on screen",
  },
  {
    num: "03",
    title: "Act",
    subtitle: "before it hits",
    description:
      "Route alternatives surface automatically when primary lanes degrade. Cost vs. speed, calculated in real time. One click to reroute.",
    icon: Route,
    color: "#C8956C",
    illustration: "route",
    image: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=400&q=80&auto=format",
    imageAlt: "Freight truck on the road",
  },
];

export default function Solution() {
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
      id="how-it-works"
      style={{
        position: "relative",
        paddingTop: isMd ? 160 : 96,
        paddingBottom: isMd ? 80 : 48,
      }}
    >
      {/* Section label */}
      <div className="px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: isMd ? 24 : 16,
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
            How it works
          </span>
        </motion.div>

        <div style={{ overflow: "hidden", marginBottom: isMd ? 80 : 56 }}>
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
              maxWidth: 460,
            }}
          >
            Three steps to complete visibility.
          </motion.h2>
        </div>
      </div>

      {/* Steps with flow connector */}
      <div className="px-6 md:px-16 lg:px-24" style={{ position: "relative" }}>
        {/* Vertical flow connector on desktop */}
        {isMd && <FlowConnector steps={3} />}

        {steps.map((step, i) => (
          <StepRow key={step.num} step={step} index={i} isMd={isMd} />
        ))}
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  isMd,
}: {
  step: (typeof steps)[number];
  index: number;
  isMd: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring" as const,
        stiffness: 60,
        damping: 20,
        delay: index * 0.12,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: isMd ? "row" : "column",
        alignItems: isMd ? "flex-start" : "flex-start",
        gap: isMd ? 32 : 16,
        paddingTop: isMd ? 32 : 24,
        paddingBottom: isMd ? 32 : 24,
        marginBottom: index < 2 ? (isMd ? 36 : 24) : 0,
        cursor: "default",
      }}
    >
      {/* Numbered circle with icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `1.5px solid ${hovered ? step.color : "rgba(200,149,108,0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            backgroundColor: hovered ? `${step.color}10` : "transparent",
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.8125rem",
              color: hovered ? step.color : "#4A443D",
              transition: "color 0.3s ease",
            }}
          >
            {step.num}
          </span>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            backgroundColor: hovered ? `${step.color}15` : `${step.color}08`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <Icon
            size={18}
            color={step.color}
            strokeWidth={1.5}
            style={{
              opacity: hovered ? 1 : 0.7,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Text content */}
      <div style={{ flex: 1, maxWidth: 420 }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: isMd ? "1.25rem" : "1.125rem",
            lineHeight: 1.3,
            color: "#EDE8E0",
            margin: 0,
            marginBottom: 8,
          }}
        >
          {step.title}{" "}
          <span style={{ color: "#7A7067", fontWeight: 400 }}>{step.subtitle}</span>
        </h3>
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "#7A7067",
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>

      {/* Step image */}
      {isMd && (
        <div
          style={{
            flexShrink: 0,
            width: 120,
            height: 80,
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
            opacity: hovered ? 0.9 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        >
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            style={{ objectFit: "cover" }}
            sizes="120px"
          />
        </div>
      )}
    </motion.div>
  );
}

