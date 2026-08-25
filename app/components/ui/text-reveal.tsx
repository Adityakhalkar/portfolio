"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number; // ms between each word
  once?: boolean; // only reveal once (IntersectionObserver)
}

export function TextReveal({
  text,
  className = "",
  delay = 60,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.3em" }}
        >
          <span
            style={{
              display: "inline-block",
              transform: revealed ? "translateY(0)" : "translateY(110%)",
              opacity: revealed ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.4s ease-out`,
              transitionDelay: `${i * delay}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

// Demo used in the library preview
export function TextRevealDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8 max-w-md text-center">
      <TextReveal
        key={key}
        text="Every word reveals itself with purpose. No animation is wasted."
        className="text-concrete text-2xl font-['Instrument_Serif'] leading-snug"
        delay={70}
        once={false}
      />
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs text-secondary hover:text-accent transition-colors duration-200 font-['Space_Mono'] tracking-widest uppercase border border-secondary/20 hover:border-accent/40 px-4 py-2"
      >
        Replay
      </button>
    </div>
  );
}

export const textRevealCode = `"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  delay = 60,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.3em" }}
        >
          <span
            style={{
              display: "inline-block",
              transform: revealed ? "translateY(0)" : "translateY(110%)",
              opacity: revealed ? 1 : 0,
              transition: \`transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.4s ease-out\`,
              transitionDelay: \`\${i * delay}ms\`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}`;
