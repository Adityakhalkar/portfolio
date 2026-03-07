"use client";

import React, { useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";

// ──────────────────────────────────────────────
// Hand start positions -- tighter on mobile so they don't fly off-screen
function getStartPositions() {
  if (typeof window === "undefined") return { hx: "24vw", hy: "22vh", rx: "-20vw", ry: "-18vh" };
  const mobile = window.innerWidth < 768;
  return mobile
    ? { hx: "14vw", hy: "14vh", rx: "-12vw", ry: "-12vh" }
    : { hx: "24vw", hy: "22vh", rx: "-20vw", ry: "-18vh" };
}
// ──────────────────────────────────────────────

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = false }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const skeletonRef = useRef<HTMLImageElement>(null);
  const asciiCanvasRef = useRef<HTMLCanvasElement>(null);
  const robotPixelsRef = useRef<ImageData | null>(null);
  const robotImgRef = useRef<HTMLImageElement>(null);
  const humanImgRef = useRef<HTMLImageElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!skeletonRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    skeletonRef.current.style.setProperty("--mx", `${x}px`);
    skeletonRef.current.style.setProperty("--my", `${y}px`);
    skeletonRef.current.style.opacity = "1";

    // Inverted mask on human image: hide where skeleton shows
    if (humanImgRef.current) {
      const mask = `radial-gradient(circle 90px at ${x}px ${y}px, transparent 40%, black 80%)`;
      humanImgRef.current.style.maskImage = mask;
      humanImgRef.current.style.webkitMaskImage = mask;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (skeletonRef.current) skeletonRef.current.style.opacity = "0";
    if (humanImgRef.current) {
      humanImgRef.current.style.maskImage = "none";
      humanImgRef.current.style.webkitMaskImage = "none";
    }
  }, []);

  const handleRobotMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = asciiCanvasRef.current;
      const pixels = robotPixelsRef.current;
      if (!canvas || !pixels) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      canvas.style.setProperty("--mx", `${x}px`);
      canvas.style.setProperty("--my", `${y}px`);
      canvas.style.opacity = "1";

      // Inverted mask on the robot image: hide where ASCII shows
      if (robotImgRef.current) {
        const mask = `radial-gradient(circle 90px at ${x}px ${y}px, transparent 40%, black 80%)`;
        robotImgRef.current.style.maskImage = mask;
        robotImgRef.current.style.webkitMaskImage = mask;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const size = 11;
      const cols = Math.ceil(cw / (size * 0.6));
      const rows = Math.ceil(ch / size);

      // Clear to transparent so white bg doesn't show
      ctx.clearRect(0, 0, cw, ch);
      ctx.font = `bold ${size}px monospace`;
      ctx.fillStyle = resolvedTheme === "dark" ? "#fff" : "#000";

      const imgW = pixels.width;
      const imgH = pixels.height;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Map canvas grid position to source image pixel
          const px = Math.floor((c * size * 0.6 / cw) * imgW);
          const py = Math.floor((r * size / ch) * imgH);
          const idx = (py * imgW + px) * 4;
          const red = pixels.data[idx];
          const green = pixels.data[idx + 1];
          const blue = pixels.data[idx + 2];
          const alpha = pixels.data[idx + 3];
          const brightness = (red + green + blue) / 3;

          // Only draw where the image is dark (the hand) and opaque
          if (brightness < 200 && alpha > 128) {
            ctx.fillText(
              Math.random() > 0.5 ? "1" : "0",
              c * size * 0.6,
              r * size + size
            );
          }
        }
      }
    },
    [resolvedTheme]
  );

  const handleRobotMouseLeave = useCallback(() => {
    if (asciiCanvasRef.current) asciiCanvasRef.current.style.opacity = "0";
    if (robotImgRef.current) {
      robotImgRef.current.style.maskImage = "none";
      robotImgRef.current.style.webkitMaskImage = "none";
    }
  }, []);

  // Load robot image pixels for ASCII masking
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      robotPixelsRef.current = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
    };
    img.src = "/robo.png";
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const { hx, hy, rx, ry } = getStartPositions();
      gsap.set(humanRef.current, { x: hx, y: hy });
      gsap.set(robotRef.current, { x: rx, y: ry });
      gsap.set(leftPanelRef.current, { x: hx });
      gsap.set(rightPanelRef.current, { x: rx });
      gsap.set(nameRef.current, { opacity: 0 });

      const tl = gsap.timeline({ paused: true, delay: 0.3 });

      // Overlay fades
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 1.4, ease: "power2.inOut" },
        0
      );

      // Hands pull apart
      tl.to(
        humanRef.current,
        { x: 0, y: 0, duration: 2, ease: "power3.inOut" },
        0.4
      );
      tl.to(
        robotRef.current,
        { x: 0, y: 0, duration: 2, ease: "power3.inOut" },
        0.4
      );

      // Black panels slide out with the hands
      tl.to(
        leftPanelRef.current,
        { x: 0, duration: 2, ease: "power3.inOut" },
        0.4
      );
      tl.to(
        rightPanelRef.current,
        { x: 0, duration: 2, ease: "power3.inOut" },
        0.4
      );

      // Name glitches in
      tl.call(() => nameRef.current?.classList.add("glitch-in"), [], 1.8);

      tlRef.current = tl;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Play hero animation only after loader finishes
  useEffect(() => {
    if (startAnimation && tlRef.current) {
      tlRef.current.play();
    }
  }, [startAnimation]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[70vh] md:h-screen bg-white dark:bg-void overflow-hidden"
    >
      {/* Initial black overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 dark:bg-white bg-black z-30 pointer-events-none"
      />

      {/* Independent black side panels */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 right-full w-[100vw] h-full dark:bg-white bg-black dark:bg-void z-30"
      />
      <div
        ref={rightPanelRef}
        className="absolute top-0 left-full w-[100vw] h-full dark:bg-white bg-black dark:bg-void z-30"
      />

      {/* Human hand group */}
      <div
        ref={humanRef}
        className="absolute top-[2%] -left-[8%] w-[55vw] sm:w-[42vw] md:-top-[3%] md:-left-[5%] md:w-[34vw] z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={humanImgRef}
          src="/human.png"
          alt=""
          className="relative w-full h-auto select-none dark:invert"
          draggable={false}
        />
        {/* Skeleton X-ray layer -- revealed on hover via cursor mask */}
        <img
          ref={skeletonRef}
          src="/skeleton.png"
          alt=""
          className="absolute inset-0 w-full h-auto select-none pointer-events-none opacity-0 transition-opacity duration-200 dark:invert"
          draggable={false}
          style={{
            maskImage:
              "radial-gradient(circle 90px at var(--mx, -100px) var(--my, -100px), black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle 90px at var(--mx, -100px) var(--my, -100px), black 40%, transparent 80%)",
          }}
        />
        <svg
          className="absolute left-[100%] top-[70%] text-black dark:text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M0 20V0H20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Robot hand group */}
      <div
        ref={robotRef}
        className="absolute bottom-[2%] -right-[8%] w-[50vw] sm:w-[38vw] md:-bottom-[3%] md:-right-[5%] md:w-[30vw] z-10"
        onMouseMove={handleRobotMouseMove}
        onMouseLeave={handleRobotMouseLeave}
      >
        <img
          ref={robotImgRef}
          src="/robo.png"
          alt=""
          className="relative w-full h-auto select-none dark:invert"
          draggable={false}
        />
        {/* ASCII binary layer -- random 0/1 revealed on hover */}
        <canvas
          ref={asciiCanvasRef}
          width={345}
          height={233}
          className="absolute inset-0 w-full h-auto select-none pointer-events-none opacity-0 transition-opacity duration-200"
          style={{
            maskImage:
              "radial-gradient(circle 90px at var(--mx, -100px) var(--my, -100px), black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle 90px at var(--mx, -100px) var(--my, -100px), black 40%, transparent 80%)",
          }}
        />
        <svg
          className="absolute right-[100%] bottom-[100%] text-black dark:text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M20 0V20H0" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Name */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <h1
          ref={nameRef}
          className="text-black dark:text-white text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap opacity-0"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          Aditya Khalkar
        </h1>
      </div>
    </section>
  );
}
