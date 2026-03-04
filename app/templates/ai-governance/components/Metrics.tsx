"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration: number = 1.8) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { value, ref };
}

export default function Metrics() {
  return (
    <section
      className="py-20 md:py-28 px-8 md:px-16"
      style={{ backgroundColor: "#F7F6F3" }}
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
      >
        {/* Left — primary stat, large and dominant */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <PrimaryStat
              target={12000}
              display={(v: number) => `${v.toLocaleString()}+`}
              label="AI models governed across our customers"
            />
          </motion.div>
        </div>

        {/* Right — supporting stats, smaller, stacked vertically */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-2 gap-6"
          >
            <SecondaryStat
              target={997}
              display={(v: number) => `${(v / 10).toFixed(1)}%`}
              label="Compliance accuracy"
            />
            <SecondaryStat
              target={4}
              display={(v: number) => `${v}h`}
              label="Average audit readiness"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "#8C8C8C",
                margin: 0,
                maxWidth: "28rem",
                borderTop: "1px solid #E5E5E0",
                paddingTop: "1.5rem",
              }}
            >
              200+ enterprises trust Aegis to manage compliance across
              their entire AI portfolio — from development to production.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PrimaryStat({
  target,
  display,
  label,
}: {
  target: number;
  display: (v: number) => string;
  label: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div>
      <span
        ref={ref}
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: "clamp(3rem, 5vw, 4.5rem)",
          color: "#1A1A1A",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          display: "block",
          marginBottom: "0.75rem",
        }}
      >
        {display(value)}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9375rem",
          color: "#8C8C8C",
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function SecondaryStat({
  target,
  display,
  label,
}: {
  target: number;
  display: (v: number) => string;
  label: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div>
      <span
        ref={ref}
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          color: "#1A1A1A",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          display: "block",
          marginBottom: "0.5rem",
        }}
      >
        {display(value)}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8125rem",
          color: "#8C8C8C",
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}
