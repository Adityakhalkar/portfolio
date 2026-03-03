"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const LiquidDistortionDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const progressRef = useRef({ value: 0 });

  useImperativeHandle(ref, () => ({
    play: () => {
      gsap.to(progressRef.current, {
        value: 1,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(progressRef.current, {
            value: 0,
            duration: 2,
            ease: "power2.inOut",
            delay: 0.5
          });
        },
      });
    },
    reset: () => {
      gsap.to(progressRef.current, {
        value: 0,
        duration: 0.5,
      });
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = 600;
    const height = canvas.height = 400;

    const drawDistortedGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const progress = progressRef.current.value;
      const time = timeRef.current;

      // Minimalist Grid settings
      const cols = 30;
      const rows = 20;
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      ctx.strokeStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--foreground') || '#888';
      ctx.lineWidth = 0.5; // Thinner lines for elegance

      // Draw distorted grid
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellWidth;
          const y = j * cellHeight;

          // Subtle heat haze / glass distortion
          const wave = Math.sin(y * 0.05 + time) * 10 * progress;
          const ripple = Math.cos(x * 0.05 + time) * 10 * progress;

          const distortedX = x + wave;
          const distortedY = y + ripple;

          // Draw dots instead of lines for a cleaner look
          if (i % 2 === 0 && j % 2 === 0) {
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillRect(distortedX, distortedY, 1, 1);
          }
        }
      }

      // Draw a single "organic" shape outline
      ctx.beginPath();
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--foreground') || '#000';
      ctx.lineWidth = 1.5;

      for (let i = 0; i <= Math.PI * 2; i += 0.05) {
        const r = 100 + Math.sin(i * 5 + time) * 10 * progress + Math.cos(i * 3 + time * 0.5) * 20 * progress;
        const x = width / 2 + Math.cos(i) * r;
        const y = height / 2 + Math.sin(i) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      timeRef.current += 0.02; // Slower time
      animationRef.current = requestAnimationFrame(drawDistortedGrid);
    };

    drawDistortedGrid();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-white dark:bg-black transition-colors duration-500">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="max-w-full h-auto opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-xs tracking-[0.5em] font-mono opacity-100 mix-blend-difference text-white">
            ORGANIC FORM
          </div>
        </div>
      </div>
    </div>
  );
});

LiquidDistortionDemo.displayName = "LiquidDistortionDemo";

export default LiquidDistortionDemo;
