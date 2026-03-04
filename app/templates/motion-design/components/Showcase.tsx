"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration = 2) {
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

export default function Showcase() {
  const { value, ref } = useCountUp(12847);

  return (
    <section
      style={{
        backgroundColor: "#FF3366",
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
      className="px-8 md:px-16"
    >
      <motion.div
        style={{ maxWidth: "1280px", margin: "0 auto" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
        }}
      >
        <span
          ref={ref}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 1,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          {value.toLocaleString()}
        </span>
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "28rem",
            margin: 0,
          }}
        >
          animations shipped to production this week by teams using Motive.
        </p>
      </motion.div>
    </section>
  );
}
