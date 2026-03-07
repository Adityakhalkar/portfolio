"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Bracket corners for panels ─── */
function BracketCorners() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-black dark:border-white pointer-events-none" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-black dark:border-white pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-black dark:border-white pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-black dark:border-white pointer-events-none" />
    </>
  );
}

/* ════════════════════════════════════════
   Scene: Music — Pixel-art gramophone + notes
   ════════════════════════════════════════ */

// Pixel grid helpers
const GP = 5; // pixel size in SVG units
const gRange = (a: number, b: number) =>
  Array.from({ length: b - a + 1 }, (_, i) => a + i);
const gPx = (x: number, y: number, o = 1) => (
  <rect
    key={`${x}.${y}.${o}`}
    x={x * GP}
    y={y * GP}
    width={GP}
    height={GP}
    fill="currentColor"
    opacity={o}
  />
);
const gRow = (y: number, xs: number[], o = 1) =>
  xs.map((x) => gPx(x, y, o));

/* ── Disc configs: swap src paths with your mp3s ── */
const DISCS = [
  { id: "jazz", label: "jazz", color: "#E8A87C", src: "/sounds/disc-jazz.mp3" },
  { id: "classical", label: "classical", color: "#85B8CB", src: "/sounds/disc-classical.mp3" },
  { id: "lofi", label: "lo-fi", color: "#C8A2C8", src: "/sounds/disc-lofi.mp3" },
  { id: "8bit", label: "8-bit", color: "#98D8A8", src: "/sounds/disc-8bit.mp3" },
];

/* ── Gramophone sprite: 2816x1536, 8 cols x 2 rows, 352x768/frame ── */
/* Row 0 = idle, Row 1 = playing */
type GramState = "idle" | "playing";
const GRAM_ROW: Record<GramState, number> = { idle: 0, playing: 1 };
const GRAM_FPS: Record<GramState, number> = { idle: 120, playing: 100 };
const GRAM_FRAMES = 8;
const GRAM_DISPLAY_H = 140;
const GRAM_DISPLAY_W = Math.round(GRAM_DISPLAY_H * (352 / 768)); // ~64px
const GRAM_SHEET_W = GRAM_DISPLAY_W * GRAM_FRAMES;
const GRAM_SHEET_H = GRAM_DISPLAY_H * 2;

function MusicScene({ active }: { active: boolean }) {
  const spriteRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef(0);
  const [activeDisc, setActiveDisc] = useState<string | null>(null);

  const gramState: GramState = activeDisc ? "playing" : "idle";

  // Create audio element once
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Stop audio when panel closes
  useEffect(() => {
    if (!active) {
      audioRef.current?.pause();
      setActiveDisc(null);
    }
  }, [active]);

  // Play/stop audio when disc changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeDisc) {
      const disc = DISCS.find((d) => d.id === activeDisc);
      if (disc) {
        audio.src = disc.src;
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [activeDisc]);

  // Sprite frame stepper
  useEffect(() => {
    if (!active) return;

    frameRef.current = 0;
    const interval = setInterval(() => {
      const f = frameRef.current;
      frameRef.current = (f + 1) % GRAM_FRAMES;

      if (spriteRef.current) {
        const row = GRAM_ROW[gramState];
        spriteRef.current.style.backgroundPosition = `-${
          frameRef.current * GRAM_DISPLAY_W
        }px -${row * GRAM_DISPLAY_H}px`;
      }
    }, GRAM_FPS[gramState]);

    return () => clearInterval(interval);
  }, [active, gramState]);

  // GSAP: equalizer bars
  useEffect(() => {
    if (!active) return;
    const tweens: gsap.core.Tween[] = [];

    if (activeDisc) {
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
  }, [active, activeDisc]);

  const handleDiscClick = (id: string) => {
    setActiveDisc((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex items-center h-full relative px-5 gap-5">
      {/* ── Disc rack (left) ── */}
      <div className="flex flex-col gap-[6px] shrink-0">
        <span
          className="text-[9px] text-secondary uppercase tracking-widest mb-1"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          select a disc
        </span>
        {DISCS.map((disc) => {
          const isActive = activeDisc === disc.id;
          return (
            <button
              key={disc.id}
              onClick={() => handleDiscClick(disc.id)}
              className={`flex items-center gap-2.5 group cursor-pointer transition-all duration-200 ${
                isActive ? "translate-x-1" : "hover:translate-x-1"
              }`}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                className="shrink-0"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="13"
                  fill={isActive ? "transparent" : "currentColor"}
                  stroke={isActive ? disc.color : "none"}
                  strokeWidth={isActive ? 1.5 : 0}
                  strokeDasharray={isActive ? "3 2" : "none"}
                  className="text-black dark:text-white"
                />
                {!isActive && (
                  <>
                    <circle cx="14" cy="14" r="10" fill="none" stroke={disc.color} strokeWidth="0.5" opacity="0.3" />
                    <circle cx="14" cy="14" r="7" fill="none" stroke={disc.color} strokeWidth="0.5" opacity="0.2" />
                    <circle cx="14" cy="14" r="4" fill={disc.color} />
                    <circle cx="14" cy="14" r="1" fill="currentColor" className="text-black dark:text-white" />
                  </>
                )}
              </svg>
              <span
                className={`text-[10px] uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-secondary group-hover:text-black dark:group-hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {disc.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Gramophone sprite + visualizer (right) ── */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          ref={spriteRef}
          style={{
            width: GRAM_DISPLAY_W,
            height: GRAM_DISPLAY_H,
            backgroundImage: "url(/images/gramophone.png)",
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

/* ════════════════════════════════════════
   Scene: Cats — 3-state sprite animation
   sleep → pet (hover) → purr (click) → sleep
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

function CatsScene({ active }: { active: boolean }) {
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

/* ════════════════════════════════════════
   Scene: Movies — Letterboxd recent watches
   ════════════════════════════════════════ */
function MoviesScene({ active }: { active: boolean }) {
  const [films, setFilms] = useState<
    { title: string; rating: string; link: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (!active || fetched.current) return;
    fetched.current = true;

    fetch("/api/letterboxd")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.films || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [active]);

  return (
    <div className="flex flex-col justify-center h-full px-5 py-3 gap-2">
      <span
        className="text-[10px] text-secondary uppercase tracking-widest mb-1"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        recently watched
      </span>
      {loading ? (
        <span
          className="text-xs text-secondary animate-pulse"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          loading reel...
        </span>
      ) : films.length > 0 ? (
        films.slice(0, 4).map((film, i) => (
          <a
            key={i}
            href={film.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline justify-between text-xs hover:text-secondary dark:hover:text-secondary transition-colors group text-black dark:text-white"
          >
            <span className="truncate mr-3 font-mono">{film.title}</span>
            <span
              className="text-secondary shrink-0 text-[10px]"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              {film.rating}
            </span>
          </a>
        ))
      ) : (
        <span
          className="text-xs text-secondary"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          no recent watches
        </span>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   Scene: Games — Mini breakout
   ════════════════════════════════════════ */
function GamesScene({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 240;
    const H = 160;
    canvas.width = W;
    canvas.height = H;

    const isDark = document.documentElement.classList.contains("dark");
    const fg = isDark ? "#eaeaea" : "#050505";

    let ballX = W / 2;
    let ballY = H - 30;
    let dx = 1.8 * (Math.random() > 0.5 ? 1 : -1);
    let dy = -1.8;
    const ballR = 2.5;
    let paddleX = W / 2 - 20;
    const paddleW = 36;
    const paddleH = 4;
    let autoPlay = true;

    const brickRows = 3;
    const brickCols = 8;
    const brickW = W / brickCols - 2;
    const brickH = 7;
    const bricks: boolean[][] = [];
    for (let r = 0; r < brickRows; r++) {
      bricks[r] = [];
      for (let c = 0; c < brickCols; c++) {
        bricks[r][c] = true;
      }
    }

    const handleMove = (e: MouseEvent) => {
      autoPlay = false;
      const rect = canvas.getBoundingClientRect();
      paddleX =
        ((e.clientX - rect.left) / rect.width) * W - paddleW / 2;
      paddleX = Math.max(0, Math.min(W - paddleW, paddleX));
    };

    const handleTouch = (e: TouchEvent) => {
      autoPlay = false;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      paddleX =
        ((touch.clientX - rect.left) / rect.width) * W - paddleW / 2;
      paddleX = Math.max(0, Math.min(W - paddleW, paddleX));
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("touchmove", handleTouch, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // Auto-play: paddle follows ball
      if (autoPlay) {
        paddleX += (ballX - paddleX - paddleW / 2) * 0.08;
        paddleX = Math.max(0, Math.min(W - paddleW, paddleX));
      }

      // Draw bricks
      for (let r = 0; r < brickRows; r++) {
        for (let c = 0; c < brickCols; c++) {
          if (!bricks[r][c]) continue;
          const bx = c * (brickW + 2) + 1;
          const by = r * (brickH + 2) + 6;
          ctx.fillStyle = fg;
          ctx.fillRect(bx, by, brickW, brickH);
        }
      }

      // Move ball
      ballX += dx;
      ballY += dy;

      if (ballX < ballR || ballX > W - ballR) dx = -dx;
      if (ballY < ballR) dy = -dy;

      // Paddle bounce
      if (
        ballY > H - paddleH - ballR - 4 &&
        ballY < H - 2 &&
        ballX > paddleX - 2 &&
        ballX < paddleX + paddleW + 2
      ) {
        dy = -Math.abs(dy);
        dx += (ballX - (paddleX + paddleW / 2)) * 0.08;
      }

      // Brick collision
      for (let r = 0; r < brickRows; r++) {
        for (let c = 0; c < brickCols; c++) {
          if (!bricks[r][c]) continue;
          const bx = c * (brickW + 2) + 1;
          const by = r * (brickH + 2) + 6;
          if (
            ballX > bx - ballR &&
            ballX < bx + brickW + ballR &&
            ballY > by - ballR &&
            ballY < by + brickH + ballR
          ) {
            bricks[r][c] = false;
            dy = -dy;
          }
        }
      }

      // Reset ball if it falls
      if (ballY > H + 10) {
        ballX = W / 2;
        ballY = H - 30;
        dx = 1.8 * (Math.random() > 0.5 ? 1 : -1);
        dy = -1.8;
      }

      // Check if all bricks cleared -> reset
      const remaining = bricks.flat().filter(Boolean).length;
      if (remaining === 0) {
        for (let r = 0; r < brickRows; r++) {
          for (let c = 0; c < brickCols; c++) {
            bricks[r][c] = true;
          }
        }
      }

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
      ctx.fillStyle = fg;
      ctx.fill();

      // Draw paddle
      ctx.fillStyle = fg;
      ctx.fillRect(paddleX, H - paddleH - 4, paddleW, paddleH);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("touchmove", handleTouch);
    };
  }, [active]);

  return (
    <div className="flex items-center justify-center h-full p-2">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   Scene: Philosophy — Random rabbit hole
   ════════════════════════════════════════ */
const RABBIT_HOLES = [
  {
    title: "Simulation hypothesis",
    url: "https://en.wikipedia.org/wiki/Simulation_hypothesis",
  },
  {
    title: "Boltzmann brain",
    url: "https://en.wikipedia.org/wiki/Boltzmann_brain",
  },
  {
    title: "Roko's basilisk",
    url: "https://en.wikipedia.org/wiki/Roko%27s_basilisk",
  },
  {
    title: "Chinese room",
    url: "https://en.wikipedia.org/wiki/Chinese_room",
  },
  {
    title: "Ship of Theseus",
    url: "https://en.wikipedia.org/wiki/Ship_of_Theseus",
  },
  {
    title: "Last Thursdayism",
    url: "https://en.wikipedia.org/wiki/Omphalos_hypothesis",
  },
  {
    title: "Quantum immortality",
    url: "https://en.wikipedia.org/wiki/Quantum_suicide_and_immortality",
  },
  {
    title: "Philosophical zombie",
    url: "https://en.wikipedia.org/wiki/Philosophical_zombie",
  },
  {
    title: "Brain in a vat",
    url: "https://en.wikipedia.org/wiki/Brain_in_a_vat",
  },
  {
    title: "Maxwell's demon",
    url: "https://en.wikipedia.org/wiki/Maxwell%27s_demon",
  },
];

function PhilosophyScene({ active }: { active: boolean }) {
  const [topic, setTopic] = useState(() =>
    RABBIT_HOLES[Math.floor(Math.random() * RABBIT_HOLES.length)]
  );

  useEffect(() => {
    if (active) {
      setTopic(
        RABBIT_HOLES[Math.floor(Math.random() * RABBIT_HOLES.length)]
      );
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-5 text-center">
      <span
        className="text-[10px] text-secondary uppercase tracking-widest"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        today&apos;s rabbit hole
      </span>
      <span className="text-sm font-mono text-black dark:text-white">
        {topic.title}
      </span>
      <a
        href={topic.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] uppercase tracking-widest underline underline-offset-4 decoration-secondary/40 hover:decoration-black dark:hover:decoration-white transition-colors text-black dark:text-white"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        go down the rabbit hole -&gt;
      </a>
    </div>
  );
}

/* ════════════════════════════════════════
   Scene: Web — Pixel art grid
   ════════════════════════════════════════ */
function WebScene({ active }: { active: boolean }) {
  const [grid, setGrid] = useState<boolean[]>(() =>
    new Array(100).fill(false)
  );
  const painting = useRef(false);

  useEffect(() => {
    if (active) setGrid(new Array(100).fill(false));
  }, [active]);

  const paintCell = useCallback((i: number) => {
    setGrid((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }, []);

  const toggleCell = useCallback((i: number) => {
    setGrid((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <span
        className="text-[10px] text-secondary uppercase tracking-widest"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        draw something
      </span>
      <div
        className="grid gap-[1px]"
        style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
        onMouseDown={() => {
          painting.current = true;
        }}
        onMouseUp={() => {
          painting.current = false;
        }}
        onMouseLeave={() => {
          painting.current = false;
        }}
      >
        {grid.map((filled, i) => (
          <div
            key={i}
            onMouseEnter={() => painting.current && paintCell(i)}
            onMouseDown={() => {
              painting.current = true;
              toggleCell(i);
            }}
            onClick={() => toggleCell(i)}
            className={`w-[13px] h-[13px] border cursor-crosshair transition-colors duration-75 ${
              filled
                ? "bg-black dark:bg-white border-black dark:border-white"
                : "bg-transparent border-black/10 dark:border-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Interest config
   ════════════════════════════════════════ */
interface InterestConfig {
  id: string;
  label: string;
  Scene: React.FC<{ active: boolean }>;
}

const INTERESTS: InterestConfig[] = [
  { id: "music", label: "music", Scene: MusicScene },
  { id: "cats", label: "cats", Scene: CatsScene },
  { id: "movies", label: "movies", Scene: MoviesScene },
  { id: "games", label: "games", Scene: GamesScene },
  { id: "web", label: "web", Scene: WebScene },
  { id: "philosophy", label: "philosophy", Scene: PhilosophyScene },
];

/* ════════════════════════════════════════
   About section — main export
   ════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeInterest, setActiveInterest] = useState<string | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Scroll-triggered reveal for heading + paragraphs
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        0
      );

      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
        },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Stage expand/collapse animation
  useEffect(() => {
    if (!stageRef.current) return;

    if (activeInterest) {
      gsap.to(stageRef.current, {
        height: 180,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(stageRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [activeInterest]);

  const handleTagInteraction = useCallback(
    (id: string) => {
      if (isMobile) {
        setActiveInterest((prev) => (prev === id ? null : id));
      } else {
        setActiveInterest(id);
      }
    },
    [isMobile]
  );

  const handleAreaLeave = useCallback(() => {
    if (!isMobile) {
      setActiveInterest(null);
    }
  }, [isMobile]);

  const ActiveScene = activeInterest
    ? INTERESTS.find((i) => i.id === activeInterest)?.Scene
    : null;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-void"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="text-sm tracking-[0.3em] uppercase text-secondary mb-10 md:mb-12 opacity-0"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          About
        </h2>

        <div className="space-y-6 text-black dark:text-concrete">
          <p
            ref={line1Ref}
            className="text-lg md:text-2xl leading-relaxed font-light opacity-0"
          >
            I build things for the web - sometimes useful, sometimes just
            to see what breaks. Developer, designer, occasionally both at
            once.
          </p>

          <p
            ref={line2Ref}
            className="text-lg md:text-2xl leading-relaxed font-light opacity-0"
          >
            Currently co-founding{" "}
            <a
              href="https://deep-ml.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-secondary/40 hover:decoration-black dark:hover:decoration-white transition-colors"
            >
              Deep-ML
            </a>
            , where we are making machine learning education real again.
          </p>

          <p
            ref={line3Ref}
            className="text-base md:text-xl leading-relaxed text-secondary opacity-0"
          >
            I am mostly watching movies, you can talk to me about movies
            and we will probably get along. I also like music, cats, games,
            web, and philosophy.
          </p>
        </div>

        {/* ─── Interest tags + interactive stage ─── */}
        <div className="mt-12 md:mt-16" onMouseLeave={handleAreaLeave}>
          {/* Tags row */}
          <div className="flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5">
            {INTERESTS.map((interest) => (
              <span
                key={interest.id}
                onMouseEnter={() =>
                  !isMobile && handleTagInteraction(interest.id)
                }
                onClick={() =>
                  isMobile && handleTagInteraction(interest.id)
                }
                className={`text-xs sm:text-sm uppercase tracking-[0.12em] cursor-pointer select-none transition-all duration-200 ${
                  activeInterest === interest.id
                    ? "text-black dark:text-white scale-105"
                    : "text-secondary hover:text-black dark:hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                [{" "}
                {interest.label}
                {" "}]
              </span>
            ))}
          </div>

          {/* Stage panel */}
          <div
            ref={stageRef}
            className="relative mt-4 w-full border border-black/10 dark:border-white/10 bg-white dark:bg-void overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <BracketCorners />
            <div className="h-[180px]">
              {ActiveScene && (
                <ActiveScene
                  active={!!activeInterest}
                  key={activeInterest}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
