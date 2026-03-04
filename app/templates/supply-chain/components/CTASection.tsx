"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Clock, Users } from "lucide-react";
import Image from "next/image";
import NetworkGraph from "./NetworkGraph";

export default function CTASection() {
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
      id="close"
      style={{
        position: "relative",
        paddingTop: isMd ? 200 : 120,
        paddingBottom: isMd ? 160 : 100,
        overflow: "hidden",
      }}
    >
      {/* Background photo -- logistics control room */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1702359562653-14a321274d47?w=1920&q=80&auto=format"
          alt=""
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 60%",
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(12,10,9,0.97) 0%, rgba(12,10,9,0.85) 50%, rgba(12,10,9,0.97) 100%)",
          }}
        />
      </div>

      {/* Network graph overlay illustration */}
      <NetworkGraph />

      <div
        className="px-6 md:px-16 lg:px-24"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Decorative line */}
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

        {/* Headline */}
        <div style={{ marginBottom: isMd ? 24 : 20 }}>
          {[
            { text: "Your supply chain", color: "#EDE8E0" },
            { text: "is flying blind.", color: "#EDE8E0" },
            { text: "We can fix that.", color: "#C8956C" },
          ].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "110%", rotate: 1 }}
                animate={isInView ? { y: "0%", rotate: 0 } : {}}
                transition={{
                  type: "spring" as const,
                  stiffness: 70,
                  damping: 22,
                  delay: 0.2 + i * 0.08,
                }}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: isMd
                    ? "clamp(2.25rem, 4.5vw, 4rem)"
                    : "clamp(1.75rem, 7vw, 2.25rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: line.color,
                  margin: 0,
                }}
              >
                {line.text}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Description + CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: isMd ? "row" : "column",
            alignItems: isMd ? "flex-end" : "flex-start",
            justifyContent: "space-between",
            gap: isMd ? 64 : 32,
            marginBottom: isMd ? 64 : 48,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring" as const,
              stiffness: 60,
              damping: 20,
              delay: 0.6,
            }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "#7A7067",
              maxWidth: 380,
              margin: 0,
            }}
          >
            Schedule a 30-minute walkthrough with our logistics team.
            No slide deck &mdash; we&apos;ll connect your first carrier feed
            live and show you what you&apos;ve been missing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring" as const,
              stiffness: 60,
              damping: 20,
              delay: 0.75,
            }}
          >
            <CTAButton />
          </motion.div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: isMd ? "row" : "column",
            gap: isMd ? 40 : 20,
          }}
        >
          {[
            { icon: Shield, text: "SOC 2 Type II", color: "#6B9E8A" },
            { icon: Clock, text: "99.9% uptime", color: "#7B8FA8" },
            { icon: Users, text: "200+ enterprises", color: "#C8956C" },
          ].map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Icon size={15} color={signal.color} strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6875rem",
                    color: "#4A443D",
                    letterSpacing: "0.04em",
                  }}
                >
                  {signal.text}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "0.9375rem",
        color: hovered ? "#0C0A09" : "#C8956C",
        backgroundColor: hovered ? "#C8956C" : "transparent",
        border: "1px solid rgba(200,149,108,0.3)",
        borderColor: hovered ? "#C8956C" : "rgba(200,149,108,0.3)",
        borderRadius: 100,
        padding: "16px 40px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        transition: "all 0.35s ease",
        overflow: "hidden",
        whiteSpace: "nowrap" as const,
        flexShrink: 0,
        letterSpacing: "0.02em",
      }}
    >
      Schedule a walkthrough
      <ArrowRight
        size={16}
        strokeWidth={2}
        style={{
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.25s ease",
        }}
      />
    </a>
  );
}
