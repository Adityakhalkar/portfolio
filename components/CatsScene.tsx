"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

/* ════════════════════════════════════════
   Scene: Cats — 3-state sprite animation
   sleep → pet (press) → purr (hold) → sleep (release)
   Single sheet: 2816x1536, 8 cols x 3 rows
   Frame: 352x512, Row 0=sleep, 1=pet, 2=purr
   ════════════════════════════════════════ */
type CatState = "sleep" | "pet" | "purr";

const CAT_ROW: Record<CatState, number> = { sleep: 0, pet: 1, purr: 2 };
const CAT_FPS: Record<CatState, number> = { sleep: 160, pet: 100, purr: 110 };
const CAT_LABELS: Record<CatState, string> = {
  sleep: "zzz...",
  pet: "mrrp?",
  purr: "PURRRR!",
};
const CAT_FRAMES = 8;
const CAT_DISPLAY_H = 120;
const CAT_DISPLAY_W = Math.round(CAT_DISPLAY_H * (352 / 512)); // ~82px
const CAT_SHEET_W = CAT_DISPLAY_W * CAT_FRAMES; // 656px
const CAT_SHEET_H = CAT_DISPLAY_H * 3; // 360px

export default function CatsScene({ active }: { active: boolean }) {
  const spriteRef = useRef<HTMLDivElement>(null);
  const purrRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [catState, setCatState] = useState<CatState>("sleep");
  const frameRef = useRef(0);

  // ── Audio: cat-sleep.mp3 (sleep) + cat-pet.mp3 (pet & purr) ──
  const sleepAudioRef = useRef<HTMLAudioElement | null>(null);
  const petAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    sleepAudioRef.current = new Audio("/sounds/cat-sleep.mp3");
    sleepAudioRef.current.volume = 0.2;
    sleepAudioRef.current.loop = true;

    petAudioRef.current = new Audio("/sounds/cat-pet.mp3");
    petAudioRef.current.volume = 0.3;
    petAudioRef.current.loop = true;

    return () => {
      sleepAudioRef.current?.pause();
      petAudioRef.current?.pause();
    };
  }, []);

  // Switch audio based on cat state
  useEffect(() => {
    const sleep = sleepAudioRef.current;
    const pet = petAudioRef.current;

    if (catState === "sleep") {
      pet?.pause();
      if (pet) pet.currentTime = 0;
      sleep?.play().catch(() => {});
    } else {
      sleep?.pause();
      if (catState === "pet" && pet) {
        pet.currentTime = 0;
        pet.play().catch(() => {});
      }
    }
  }, [catState]);

  // Stop all audio when panel closes
  useEffect(() => {
    if (!active) {
      sleepAudioRef.current?.pause();
      petAudioRef.current?.pause();
    }
  }, [active]);

  // Sprite frame stepper
  useEffect(() => {
    if (!active) return;

    frameRef.current = 0;

    const interval = setInterval(() => {
      if (!spriteRef.current) return;

      const f = frameRef.current;
      const row = CAT_ROW[catState];
      spriteRef.current.style.backgroundPosition =
        `-${f * CAT_DISPLAY_W}px -${row * CAT_DISPLAY_H}px`;

      if (catState === "sleep") {
        frameRef.current = (f + 1) % CAT_FRAMES;
      } else if (catState === "pet") {
        // Play pet once, then transition to purr
        if (f < CAT_FRAMES - 1) {
          frameRef.current = f + 1;
        } else {
          frameRef.current = 0;
          setCatState("purr");
        }
      } else {
        // Purr: loop while still held
        frameRef.current = (f + 1) % CAT_FRAMES;
      }
    }, CAT_FPS[catState]);

    return () => clearInterval(interval);
  }, [active, catState]);

  // GSAP purr effects -- intensity follows state
  useEffect(() => {
    if (!active) return;

    const isPurring = catState === "purr";
    const isSleeping = catState === "sleep";
    const tweens: gsap.core.Tween[] = [];

    // Vibration
    if (spriteRef.current) {
      tweens.push(
        gsap.to(spriteRef.current, {
          x: isPurring ? 1.2 : isSleeping ? 0.3 : 0.5,
          duration: isPurring ? 0.04 : 0.07,
          repeat: -1,
          yoyo: true,
          ease: "none",
        })
      );
    }

    // Sound wave bars
    barsRef.current.filter(Boolean).forEach((bar, i) => {
      tweens.push(
        gsap.to(bar!, {
          scaleY: isPurring
            ? 0.6 + Math.random() * 0.4
            : isSleeping
              ? 0.15 + Math.random() * 0.25
              : 0.3 + Math.random() * 0.4,
          duration: isPurring
            ? 0.08 + Math.random() * 0.08
            : 0.2 + Math.random() * 0.15,
          repeat: -1,
          yoyo: true,
          delay: i * 0.03,
          ease: "sine.inOut",
          transformOrigin: "bottom",
        })
      );
    });

    // Text wave
    if (purrRef.current) {
      const letters = purrRef.current.querySelectorAll("span");
      tweens.push(
        gsap.to(letters, {
          y: isPurring ? -3 : isSleeping ? -1 : -2,
          duration: isPurring ? 0.15 : 0.3,
          stagger: { each: 0.05, repeat: -1, yoyo: true },
          ease: "sine.inOut",
        })
      );
    }

    return () => tweens.forEach((tw) => tw.kill());
  }, [active, catState]);

  const handleDown = () => {
    frameRef.current = 0;
    setCatState("pet");
  };

  const handleUp = () => {
    frameRef.current = 0;
    setCatState("sleep");
  };

  const handleLeave = () => {
    frameRef.current = 0;
    setCatState("sleep");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <div
        ref={spriteRef}
        className="cursor-pointer"
        style={{
          width: CAT_DISPLAY_W,
          height: CAT_DISPLAY_H,
          backgroundImage: "url('/images/all-sprite.png')",
          backgroundSize: `${CAT_SHEET_W}px ${CAT_SHEET_H}px`,
          backgroundPosition: "0px 0px",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated" as const,
        }}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseLeave={handleLeave}
        onTouchStart={handleDown}
        onTouchEnd={handleUp}
      />

      <div className="flex items-center gap-3">
        <div className="flex items-end gap-[2px] h-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className="w-[2px] h-2 bg-black dark:bg-white origin-bottom"
            />
          ))}
        </div>

        <span
          ref={purrRef}
          className="text-[10px] tracking-[0.2em] uppercase text-secondary"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          {CAT_LABELS[catState].split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
