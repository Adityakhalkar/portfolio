"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "motion/react";
import gsap from "gsap";

/* ── Disc configs: row in sprite sheet + audio src ── */
/* Sprite: record-player.png, 512x320, 8 cols x 5 rows, 64x64/frame */
/* Row 0=idle, 1=blue, 2=red, 3=green, 4=orange */
/* Cols 0-2: tonearm transition (rest→on), Cols 3-7: playing (2 frames alternating) */
const DISCS = [
  { id: "stay-with-me", label: "stay with me", color: "#4488EE", row: 1, src: "/sounds/stay-with-me.mp3", img: "/images/discs/blue.png" },
  { id: "dream-on", label: "dream on", color: "#E24444", row: 2, src: "/sounds/dream-on.mp3", img: "/images/discs/red.png" },
  { id: "let-it-happen", label: "let it happen", color: "#44CC44", row: 3, src: "/sounds/let-it-happen.mp3", img: "/images/discs/green.png" },
  { id: "caravan", label: "caravan", color: "#EE8833", row: 4, src: "/sounds/caravan.mp3", img: "/images/discs/orange.png" },
];

const GRAM_FRAME_SIZE = 64;
const GRAM_DISPLAY = 140;
const GRAM_SCALE = GRAM_DISPLAY / GRAM_FRAME_SIZE;
const GRAM_SHEET_W = 512 * GRAM_SCALE;
const GRAM_SHEET_H = 320 * GRAM_SCALE;

const DISC_SIZE = 120;
const DISC_SLIVER = 28;
const CRATE_W = DISC_SIZE + (DISCS.length - 1) * DISC_SLIVER;

/* ── Single disc — parent controls hover, springs animate ── */
function CrateDisc({
  disc,
  index,
  total,
  isActive,
  isHovered,
  onClick,
  btnRef,
}: {
  disc: (typeof DISCS)[number];
  index: number;
  total: number;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  btnRef: (el: HTMLElement | null) => void;
}) {
  const rollConfig = { stiffness: 180, damping: 16 } as const;
  const fadeConfig = { stiffness: 300, damping: 30 } as const;
  const xSpring = useSpring(0, rollConfig);
  const rotateSpring = useSpring(0, rollConfig);
  const labelOpacity = useSpring(0, fadeConfig);

  useEffect(() => {
    if (isHovered && !isActive) {
      xSpring.set(100);
      rotateSpring.set(55);
      labelOpacity.set(1);
    } else {
      xSpring.set(0);
      rotateSpring.set(0);
      labelOpacity.set(0);
    }
  }, [isHovered, isActive, xSpring, rotateSpring, labelOpacity]);

  return (
    <motion.div
      ref={btnRef}
      onClick={onClick}
      className="absolute pointer-events-none"
      style={{
        width: DISC_SIZE,
        height: DISC_SIZE,
        left: index * DISC_SLIVER,
        zIndex: total - index,
        x: xSpring,
        rotate: rotateSpring,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={disc.img}
        alt={disc.label}
        className={`w-full h-full ${isActive ? "opacity-25" : ""}`}
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />
      <motion.span
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest whitespace-nowrap"
        style={{
          fontFamily: "var(--font-pixel)",
          color: disc.color,
          opacity: labelOpacity,
        }}
      >
        {disc.label}
      </motion.span>
    </motion.div>
  );
}

export default function MusicScene({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const discBtnRefs = useRef<(HTMLElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cleanupRef = useRef<(() => void)[]>([]);
  const activeDiscRef = useRef<string | null>(null);
  const [activeDisc, setActiveDisc] = useState<string | null>(null);
  const [hoveredDisc, setHoveredDisc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    activeDiscRef.current = activeDisc;
  }, [activeDisc]);

  // ── Helpers ──

  const cancelAll = useCallback(() => {
    cleanupRef.current.forEach((fn) => fn());
    cleanupRef.current = [];
  }, []);

  const addCleanup = useCallback((fn: () => void) => {
    cleanupRef.current.push(fn);
  }, []);

  const setFrame = useCallback((col: number, row: number) => {
    if (!spriteRef.current) return;
    spriteRef.current.style.backgroundPosition = `-${
      col * GRAM_DISPLAY
    }px -${row * GRAM_DISPLAY}px`;
  }, []);

  const runFrames = useCallback(
    (
      cols: number[],
      row: number,
      fps: number,
      loop: boolean,
      onDone?: () => void
    ) => {
      let idx = 0;
      let dead = false;
      setFrame(cols[0], row);

      if (cols.length <= 1 && !loop) {
        onDone?.();
        return;
      }

      const id = setInterval(() => {
        if (dead) return;
        idx++;
        if (idx >= cols.length) {
          if (loop) {
            idx = 0;
          } else {
            clearInterval(id);
            onDone?.();
            return;
          }
        }
        setFrame(cols[idx], row);
      }, fps);

      addCleanup(() => {
        dead = true;
        clearInterval(id);
      });
    },
    [setFrame, addCleanup]
  );

  const flyDisc = useCallback(
    (
      fromEl: HTMLElement,
      toEl: HTMLElement,
      disc: (typeof DISCS)[number],
      onDone: () => void
    ) => {
      const fly = flyRef.current;
      const container = containerRef.current;
      if (!fly || !container) {
        onDone();
        return;
      }

      const cRect = container.getBoundingClientRect();
      const fRect = fromEl.getBoundingClientRect();
      const tRect = toEl.getBoundingClientRect();

      const size = 80;
      const fx = fRect.left - cRect.left + fRect.width / 2 - size / 2;
      const fy = fRect.top - cRect.top + fRect.height / 2 - size / 2;
      const tx = tRect.left - cRect.left + tRect.width / 2 - size / 2;
      const ty = tRect.top - cRect.top + tRect.height / 2 - size / 2;

      const dist = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);
      const circumference = Math.PI * size;
      const rolls = (dist / circumference) * 360;
      const direction = tx > fx ? 1 : -1;

      fly.style.backgroundImage = `url(${disc.img})`;
      fly.style.width = `${size}px`;
      fly.style.height = `${size}px`;
      gsap.set(fly, { x: fx, y: fy, scale: 1, opacity: 1, display: "block", rotation: 0 });

      const tween = gsap.to(fly, {
        x: tx,
        y: ty,
        rotation: direction * rolls,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(fly, { display: "none" });
          onDone();
        },
      });

      addCleanup(() => {
        tween.kill();
        gsap.set(fly, { display: "none" });
      });
    },
    [addCleanup]
  );

  const startIdle = useCallback(() => {
    runFrames([0, 1, 2, 3, 4, 5, 6, 7], 0, 150, true);
  }, [runFrames]);

  const startPlaying = useCallback(
    (row: number) => {
      runFrames([3, 4, 5, 6, 7], row, 120, true);
    },
    [runFrames]
  );

  const startAudio = useCallback((disc: (typeof DISCS)[number]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = disc.src;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  // ── Audio element ──
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // ── Panel close: tear everything down ──
  useEffect(() => {
    if (!active) {
      cancelAll();
      stopAudio();
      setActiveDisc(null);
      setIsPlaying(false);
    } else {
      startIdle();
    }
    return () => cancelAll();
  }, [active, cancelAll, stopAudio, startIdle]);

  // ── Equalizer bars react to isPlaying ──
  useEffect(() => {
    if (!active) return;
    const tweens: gsap.core.Tween[] = [];

    if (isPlaying) {
      barsRef.current.filter(Boolean).forEach((bar, i) => {
        tweens.push(
          gsap.to(bar!, {
            scaleY: 0.4 + Math.random() * 0.6,
            duration: 0.12 + Math.random() * 0.12,
            repeat: -1,
            yoyo: true,
            delay: i * 0.04,
            ease: "sine.inOut",
            transformOrigin: "bottom",
          })
        );
      });
    } else {
      barsRef.current.filter(Boolean).forEach((bar) => {
        gsap.to(bar!, {
          scaleY: 0.1,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "bottom",
        });
      });
    }

    return () => tweens.forEach((tw) => tw.kill());
  }, [active, isPlaying]);

  // ── The click handler: orchestrates the full animation chain ──
  const handleDiscClick = useCallback(
    (discId: string) => {
      cancelAll();

      const disc = DISCS.find((d) => d.id === discId)!;
      const discIdx = DISCS.findIndex((d) => d.id === discId);
      const discBtn = discBtnRefs.current[discIdx];
      const sprite = spriteRef.current;
      const current = activeDiscRef.current;

      if (current === discId) {
        // ── EJECT: reverse tonearm → fly back → idle ──
        stopAudio();
        setIsPlaying(false);

        runFrames([2, 1, 0], disc.row, 180, false, () => {
          if (discBtn && sprite) {
            flyDisc(sprite, discBtn, disc, () => {
              setActiveDisc(null);
              startIdle();
            });
          } else {
            setActiveDisc(null);
            startIdle();
          }
        });
      } else if (current) {
        // ── SWITCH: reverse current → fly back → fly new → load → play ──
        const prevDisc = DISCS.find((d) => d.id === current)!;
        const prevIdx = DISCS.findIndex((d) => d.id === current);
        const prevBtn = discBtnRefs.current[prevIdx];

        stopAudio();
        setIsPlaying(false);

        runFrames([2, 1, 0], prevDisc.row, 180, false, () => {
          const afterFlyBack = () => {
            const afterFlyIn = () => {
              runFrames([0, 1, 2], disc.row, 180, false, () => {
                setActiveDisc(discId);
                setIsPlaying(true);
                startAudio(disc);
                startPlaying(disc.row);
              });
            };

            if (discBtn && sprite) {
              flyDisc(discBtn, sprite, disc, afterFlyIn);
            } else {
              afterFlyIn();
            }
          };

          if (prevBtn && sprite) {
            flyDisc(sprite, prevBtn, prevDisc, afterFlyBack);
          } else {
            afterFlyBack();
          }
        });
      } else {
        // ── LOAD FROM IDLE: fly in → tonearm down → play ──
        const afterFly = () => {
          runFrames([0, 1, 2], disc.row, 180, false, () => {
            setActiveDisc(discId);
            setIsPlaying(true);
            startAudio(disc);
            startPlaying(disc.row);
          });
        };

        if (discBtn && sprite) {
          flyDisc(discBtn, sprite, disc, afterFly);
        } else {
          afterFly();
        }
      }
    },
    [
      cancelAll,
      stopAudio,
      startAudio,
      runFrames,
      flyDisc,
      startIdle,
      startPlaying,
    ]
  );

  return (
    <div
      ref={containerRef}
      className="flex items-center h-full relative px-4 gap-4"
    >
      {/* Flying disc — actual disc image */}
      <div
        ref={flyRef}
        className="absolute rounded-full pointer-events-none z-10 bg-cover bg-center"
        style={{ display: "none", imageRendering: "pixelated" }}
      />

      {/* ── Disc crate (left) ── */}
      <div className="flex flex-col items-center shrink-0">
        <span
          className="text-[9px] text-secondary uppercase tracking-widest mb-2"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          crate
        </span>
        <div
          className="relative cursor-pointer"
          style={{ width: CRATE_W, height: DISC_SIZE + 10 }}
          onMouseMove={(e) => {
            const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
            let idx = DISCS.length - 1;
            for (let i = 0; i < DISCS.length; i++) {
              const discLeft = i * DISC_SLIVER;
              if (x >= discLeft && x < discLeft + DISC_SIZE) { idx = i; break; }
            }
            setHoveredDisc(DISCS[idx].id);
          }}
          onMouseLeave={() => setHoveredDisc(null)}
          onClick={() => {
            if (hoveredDisc) handleDiscClick(hoveredDisc);
          }}
        >
          {DISCS.map((disc, i) => (
            <CrateDisc
              key={disc.id}
              disc={disc}
              index={i}
              total={DISCS.length}
              isActive={activeDisc === disc.id}
              isHovered={hoveredDisc === disc.id}
              onClick={() => handleDiscClick(disc.id)}
              btnRef={(el) => {
                discBtnRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Record player sprite + visualizer (right) ── */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          ref={spriteRef}
          onClick={() => {
            if (activeDisc) handleDiscClick(activeDisc);
          }}
          className={activeDisc ? "cursor-pointer" : ""}
          style={{
            width: GRAM_DISPLAY,
            height: GRAM_DISPLAY,
            backgroundImage: "url(/images/record-player.png)",
            backgroundSize: `${GRAM_SHEET_W}px ${GRAM_SHEET_H}px`,
            backgroundPosition: "0px 0px",
            imageRendering: "pixelated",
          }}
        />

        {/* Equalizer bars + now-playing label */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="flex items-end gap-[2px] h-[14px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className="w-[3px] bg-black dark:bg-white origin-bottom"
                style={{
                  height: 14,
                  transform: "scaleY(0.1)",
                }}
              />
            ))}
          </div>
          <span
            className="text-[9px] text-secondary uppercase tracking-widest h-3"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            {activeDisc
              ? `now playing: ${DISCS.find((d) => d.id === activeDisc)?.label}`
              : "idle"}
          </span>
        </div>
      </div>
    </div>
  );
}
