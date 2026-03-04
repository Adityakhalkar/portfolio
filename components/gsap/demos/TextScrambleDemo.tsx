"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const TextScrambleDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const phrases = [
    "CONFIDENTIAL DATA",
    "SYSTEM OVERRIDE",
    "ACCESS GRANTED",
    "PROTOCOL ZERO",
    "ENCRYPTED FILE",
  ];

  // Minimalist character set (blocks and simple symbols)
  const chars = "█▓▒░/|\\-";

  const scrambleText = (newText: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!textRef.current) return resolve();

      const element = textRef.current;
      const oldText = element.innerText;
      const length = Math.max(oldText.length, newText.length);

      interface QueueItem {
        from: string;
        to: string;
        start: number;
        end: number;
        char: string;
      }

      const queue: QueueItem[] = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 20); // Faster
        const end = start + Math.floor(Math.random() * 20);
        queue.push({ from, to, start, end, char: from });
      }

      let frame = 0;

      const update = () => {
        let output = "";
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          const item = queue[i];

          if (frame >= item.end) {
            complete++;
            output += item.to;
          } else if (frame >= item.start) {
            if (!item.char || Math.random() < 0.28) {
              item.char = chars[Math.floor(Math.random() * chars.length)];
            }
            // Use a block character for the "redacted" look
            output += `<span class="opacity-50">${item.char}</span>`;
          } else {
            output += item.from;
          }
        }

        element.innerHTML = output;

        if (complete === queue.length) {
          resolve();
        } else {
          frame++;
          requestAnimationFrame(update);
        }
      };

      update();
    });
  };

  useImperativeHandle(ref, () => ({
    play: async () => {
      const nextIndex = (currentIndex + 1) % phrases.length;
      await scrambleText(phrases[nextIndex]);
      setCurrentIndex(nextIndex);
    },
    reset: () => {
      if (textRef.current) {
        textRef.current.innerText = phrases[0];
        setCurrentIndex(0);
      }
    },
  }));

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerText = phrases[0];
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Main text */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
          <div className="w-2 h-2 bg-black dark:bg-white animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] font-mono">REDACTED</span>
        </div>

        <div
          ref={textRef}
          className="text-5xl font-bold tracking-tighter min-h-[60px] flex items-center justify-center"
        />

        <div className="flex justify-between w-64 mx-auto mt-12 pt-4 border-t border-black/10 dark:border-white/10">
          <div className="text-center">
            <div className="text-[10px] opacity-40 mb-1 tracking-widest">INDEX</div>
            <div className="text-sm font-mono">0{currentIndex + 1}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] opacity-40 mb-1 tracking-widest">STATUS</div>
            <div className="text-sm font-mono">SECURE</div>
          </div>
        </div>
      </div>
    </div>
  );
});

TextScrambleDemo.displayName = "TextScrambleDemo";

export default TextScrambleDemo;
