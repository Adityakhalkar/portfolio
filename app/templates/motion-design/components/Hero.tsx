"use client";

/**
 * HeroSection for Motive — a collaborative motion design platform.
 *
 * Soft-maximalist, left-dominant layout where oversized typography IS the
 * visual. Each headline word springs in with overshoot, the word "moves"
 * floats forever after landing, and supporting copy fades in beneath.
 *
 * Design tokens: Syne 800 display, Manrope 400 body, #FF3366 accent,
 * #FAFAF8 background, spring physics throughout.
 */

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADLINE_WORDS = ["Design", "motion", "that", "moves", "people."];

/** Delay before the first word begins its spring entrance. */
const BASE_DELAY = 0.2;

/** Stagger between each word entrance (seconds). */
const WORD_STAGGER = 0.08;

/** Total time for all headline words to finish entering. */
const HEADLINE_DURATION = BASE_DELAY + HEADLINE_WORDS.length * WORD_STAGGER + 0.45;

/** Delay before subtitle & CTAs fade in (after headline settles). */
const BODY_DELAY = HEADLINE_DURATION;

/** Delay before the "moves" float loop starts (after its spring). */
const FLOAT_DELAY = 1.2;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section
      className="relative px-6 sm:px-8 md:px-16"
      style={{
        backgroundColor: "#FAFAF8",
        paddingTop: "clamp(6rem, 12vw, 11rem)",
        paddingBottom: "clamp(4rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* -------------------------------------------------------- */}
        {/*  Oversized headline — word-by-word spring clip-reveal     */}
        {/* -------------------------------------------------------- */}
        <h1
          className="flex flex-wrap"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#1A1A1A",
            margin: "0 0 2.5rem 0",
            maxWidth: "56rem",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => {
            const isAccent = word === "moves";
            const springDelay = BASE_DELAY + i * WORD_STAGGER;

            return (
              <span
                key={word}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                  marginRight: "0.25em",
                }}
              >
                <motion.span
                  style={{
                    display: "inline-block",
                    ...(isAccent
                      ? { fontStyle: "italic", color: "#FF3366" }
                      : {}),
                  }}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: springDelay,
                  }}
                >
                  {isAccent ? (
                    <motion.span
                      style={{ display: "inline-block" }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        type: "tween",
                        ease: [0.45, 0, 0.55, 1],
                        delay: FLOAT_DELAY,
                      }}
                    >
                      {word}
                    </motion.span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            );
          })}
        </h1>

        {/* -------------------------------------------------------- */}
        {/*  Subtitle                                                 */}
        {/* -------------------------------------------------------- */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: BODY_DELAY }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.65,
            color: "#717171",
            maxWidth: "30rem",
            margin: "0 0 2.5rem 0",
          }}
        >
          Create, prototype, and ship interactive animations for the web
          &mdash; without writing a line of code.
        </motion.p>

        {/* -------------------------------------------------------- */}
        {/*  CTAs                                                     */}
        {/* -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            delay: BODY_DELAY + 0.12,
          }}
          className="flex items-center flex-wrap"
          style={{ gap: "1.25rem", marginBottom: "3rem" }}
        >
          {/* Primary — pill, accent fill, spring hover */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "#FFFFFF",
              backgroundColor: "#FF3366",
              padding: "0.8125rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Start for free
          </motion.a>

          {/* Secondary — text link, color-only transition */}
          <a
            href="#"
            className="group"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "#717171",
              textDecoration: "none",
              transition: "color 200ms ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#717171";
            }}
          >
            Watch demo
            <span aria-hidden="true" style={{ fontSize: "1em" }}>
              &rarr;
            </span>
          </a>
        </motion.div>

        {/* -------------------------------------------------------- */}
        {/*  Trust line                                               */}
        {/* -------------------------------------------------------- */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: BODY_DELAY + 0.3 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            color: "#AFAFAF",
            letterSpacing: "0.01em",
          }}
        >
          Free for individuals &middot; No credit card required &middot; Export
          to React, CSS, Lottie
        </motion.p>
      </div>
    </section>
  );
}
