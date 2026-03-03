"use client";

import { useState, useEffect } from "react";

export default function HandwritingInput() {
  const [inputValue, setInputValue] = useState("");
  const [handwrittenText, setHandwrittenText] = useState("");
  const [isDrying, setIsDrying] = useState(false);

  useEffect(() => {
    if (inputValue.length > handwrittenText.length) {
      // New character typed
      setHandwrittenText(inputValue);
      setIsDrying(true);

      // Dry the ink after a delay
      const timer = setTimeout(() => {
        setIsDrying(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      // Character deleted
      setHandwrittenText(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Handwriting Input Visualizer</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Type in the input below and watch your text transform from handwritten to digital.
          As you type, text appears as handwriting that &ldquo;dries&rdquo; into clean typed text.
        </p>
      </div>

      {/* Hidden actual input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="sr-only"
        placeholder="Start typing..."
        autoFocus
      />

      {/* Visual display */}
      <div
        className="relative min-h-[120px] p-6 bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 cursor-text"
        onClick={() => document.querySelector('input')?.focus()}
      >
        {/* Notebook lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full flex flex-col justify-around px-6">
            <div className="border-b border-blue-200 dark:border-blue-900 opacity-30"></div>
            <div className="border-b border-blue-200 dark:border-blue-900 opacity-30"></div>
            <div className="border-b border-blue-200 dark:border-blue-900 opacity-30"></div>
          </div>
        </div>

        {/* Text display */}
        <div className="relative z-10 text-2xl min-h-[80px]">
          {handwrittenText ? (
            <span
              className={`inline-block transition-all duration-800 ${
                isDrying
                  ? "font-['Caveat'] text-blue-600 dark:text-blue-400"
                  : "font-sans text-black dark:text-white"
              }`}
              style={{
                transform: isDrying ? "rotate(-2deg)" : "rotate(0deg)",
                filter: isDrying ? "blur(0.3px)" : "blur(0px)",
              }}
            >
              {handwrittenText}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-gray-600 text-xl">
              Click here and start typing...
            </span>
          )}
          {/* Blinking cursor */}
          <span className="inline-block w-0.5 h-8 bg-gray-800 dark:bg-gray-200 ml-1 animate-pulse"></span>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
        Personal handwriting transforms into digital text as you type
      </p>
    </div>
  );
}
