"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
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
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background photo -- aerial port/container yard */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1759272840712-c7e5ea852367?w=1920&q=80&auto=format"
          alt=""
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.12,
          }}
          priority
        />
        {/* Gradient overlay to keep text readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.7) 50%, rgba(12,10,9,0.85) 100%)",
          }}
        />
      </div>

      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          display: "flex",
          flexDirection: isMd ? "row" : "column",
          alignItems: isMd ? "center" : "flex-start",
          justifyContent: "space-between",
          gap: isMd ? 64 : 48,
          width: "100%",
          paddingTop: isMd ? 0 : 120,
          paddingBottom: isMd ? 0 : 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left side -- headline + CTA */}
        <div style={{ flex: 1, maxWidth: isMd ? 520 : "100%" }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: isMd ? 40 : 28,
            }}
          >
            <span
              style={{
                width: 24,
                height: 1,
                backgroundColor: "#C8956C",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "#7A7067",
                letterSpacing: "0.15em",
              }}
            >
              Supply chain visibility
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: isMd ? 28 : 20 }}>
            {[
              { text: "Every blind spot", accent: false },
              { text: "illuminated.", accent: true },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "110%", rotate: 1.5 }}
                  animate={isInView ? { y: "0%", rotate: 0 } : {}}
                  transition={{
                    type: "spring" as const,
                    stiffness: 70,
                    damping: 22,
                    delay: 0.4 + i * 0.12,
                  }}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: isMd
                      ? "clamp(3rem, 5.5vw, 5rem)"
                      : "clamp(2.2rem, 9vw, 3rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    color: line.accent ? "#C8956C" : "#EDE8E0",
                    margin: 0,
                  }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring" as const,
              stiffness: 60,
              damping: 20,
              delay: 0.8,
            }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: isMd ? "1.0625rem" : "0.9375rem",
              lineHeight: 1.75,
              color: "#7A7067",
              maxWidth: 400,
              margin: 0,
              marginBottom: isMd ? 36 : 28,
            }}
          >
            200+ carrier feeds consolidated into a single visibility
            layer. See disruptions before they see you.
          </motion.p>

          {/* CTA pill button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, type: "spring" as const, stiffness: 60, damping: 20 }}
          >
            <HeroCTA />
          </motion.div>
        </div>

        {/* Right side -- dashboard mockup */}
        <div
          style={{
            flex: isMd ? "0 0 auto" : "auto",
            width: isMd ? "auto" : "100%",
            maxWidth: isMd ? 520 : "100%",
          }}
        >
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

function HeroCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#platform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "0.875rem",
        color: hovered ? "#0C0A09" : "#EDE8E0",
        backgroundColor: hovered ? "#C8956C" : "rgba(200, 149, 108, 0.12)",
        border: "1px solid rgba(200, 149, 108, 0.25)",
        borderColor: hovered ? "#C8956C" : "rgba(200, 149, 108, 0.25)",
        borderRadius: 100,
        padding: "12px 28px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        transition: "all 0.3s ease",
        letterSpacing: "0.02em",
      }}
    >
      See the platform
      <ArrowRight
        size={15}
        strokeWidth={2}
        style={{
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.25s ease",
        }}
      />
    </a>
  );
}
