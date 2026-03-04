"use client";

import { useState, useEffect, useRef } from "react";

export default function ReadingTimer() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [savedPosition, setSavedPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const articleText = `
# The Future of Web Interactions

Web design is evolving beyond static layouts into dynamic, responsive experiences that adapt to user behavior and preferences.

## Understanding User Context

Modern interfaces should respect the user's time, attention, and mental state. Instead of overwhelming users with information, we should provide contextual assistance that appears exactly when needed.

## Reading Experience Matters

Long-form content deserves special attention. Users should never lose their place, and returning visitors should pick up exactly where they left off. This isn't just convenience—it's respect for their time investment.

## Progressive Enhancement

Start with the basics, then layer on enhancements. A reading timer isn't essential, but it helps users gauge their time commitment. Position saving isn't required, but it dramatically improves return visits.

## The Psychology of Progress

Showing progress isn't just about gamification—it's about giving users a sense of accomplishment and control. When you can see you're 60% through an article, you can make informed decisions about whether to continue or bookmark for later.

## Implementing Thoughtfully

Every feature should solve a real problem. Don't add reading timers because they're trendy—add them because your content is long enough that users genuinely wonder "how much more is there?"

## Respecting User Agency

The best UI enhancements are invisible until needed. They don't interrupt, they don't demand attention, they simply exist to serve the user's goals.

## Conclusion

As we build the next generation of web experiences, let's remember that technology should adapt to humans, not the other way around.
  `;

  const estimatedReadTime = Math.ceil(articleText.split(" ").length / 200); // 200 words per minute

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;
      const progress = (currentScroll / scrollHeight) * 100;

      setScrollProgress(progress);

      // Save position to localStorage
      localStorage.setItem("readingPosition", currentScroll.toString());
      setSavedPosition(currentScroll);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);

      // Restore saved position
      const saved = localStorage.getItem("readingPosition");
      if (saved) {
        container.scrollTop = parseInt(saved);
        setSavedPosition(parseInt(saved));
      }
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Track reading time
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setReadTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Reading Timer with Position Save</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Respects your time by showing estimated read time and actual time spent. Automatically saves
          your position so you can pick up exactly where you left off on return visits.
        </p>
      </div>

      {/* Reading stats header */}
      <div className="bg-white dark:bg-gray-900 rounded-t-lg border-2 border-b-0 border-gray-300 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-6">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Est. Read Time:</span>
              <span className="ml-2 font-semibold text-blue-600 dark:text-blue-400">
                ~{estimatedReadTime} min
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Time Spent:</span>
              <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                {formatTime(readTime)}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {scrollProgress.toFixed(0)}% complete
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {savedPosition > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            💾 Your position is automatically saved
          </p>
        )}
      </div>

      {/* Article content */}
      <div
        ref={containerRef}
        className="h-96 overflow-y-auto bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-b-lg p-6 prose dark:prose-invert prose-sm max-w-none"
      >
        {articleText.split("\n").map((line, i) => {
          if (line.startsWith("# ")) {
            return (
              <h1 key={i} className="text-3xl font-bold mb-4 mt-0">
                {line.substring(2)}
              </h1>
            );
          } else if (line.startsWith("## ")) {
            return (
              <h2 key={i} className="text-xl font-semibold mb-3 mt-6">
                {line.substring(3)}
              </h2>
            );
          } else if (line.trim()) {
            return (
              <p key={i} className="mb-4 leading-relaxed">
                {line}
              </p>
            );
          }
          return null;
        })}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
        Scroll the article above • Position saves automatically • Return anytime to continue
      </p>
    </div>
  );
}
