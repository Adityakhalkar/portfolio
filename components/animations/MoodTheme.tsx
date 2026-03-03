"use client";

import { useState } from "react";

type Mood = "focused" | "energetic" | "calm";

const moods = {
  focused: {
    name: "Focused",
    description: "Minimal distractions, clean lines, monochrome palette",
    bg: "bg-gray-50 dark:bg-gray-950",
    cardBg: "bg-white dark:bg-gray-900",
    text: "text-gray-900 dark:text-gray-100",
    accent: "text-blue-600 dark:text-blue-400",
    border: "border-gray-300 dark:border-gray-700",
    buttonBg: "bg-gray-900 dark:bg-gray-100",
    buttonText: "text-white dark:text-black",
    emoji: "🎯",
  },
  energetic: {
    name: "Energetic",
    description: "Vibrant colors, bold contrasts, high saturation",
    bg: "bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-orange-950 dark:via-pink-950 dark:to-purple-950",
    cardBg: "bg-gradient-to-br from-yellow-200 to-red-200 dark:from-yellow-900 dark:to-red-900",
    text: "text-purple-900 dark:text-purple-100",
    accent: "text-pink-600 dark:text-pink-400",
    border: "border-pink-400 dark:border-pink-600",
    buttonBg: "bg-gradient-to-r from-orange-500 to-pink-500",
    buttonText: "text-white",
    emoji: "⚡",
  },
  calm: {
    name: "Calm",
    description: "Soft pastels, low contrast, muted tones",
    bg: "bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-blue-950 dark:via-teal-950 dark:to-green-950",
    cardBg: "bg-blue-50/50 dark:bg-blue-900/20",
    text: "text-teal-900 dark:text-teal-100",
    accent: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-800",
    buttonBg: "bg-teal-500 dark:bg-teal-600",
    buttonText: "text-white",
    emoji: "🌊",
  },
};

export default function MoodTheme() {
  const [currentMood, setCurrentMood] = useState<Mood>("focused");

  const mood = moods[currentMood];

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Mood-Based Theme Switcher</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Instead of just dark/light mode, choose a mood that matches your state of mind.
          The entire UI adapts with colors, spacing, and visual weight to support your current vibe.
        </p>
      </div>

      {/* Mood selector */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {(Object.keys(moods) as Mood[]).map((moodKey) => (
          <button
            key={moodKey}
            onClick={() => setCurrentMood(moodKey)}
            className={`px-6 py-3 rounded-lg transition-all ${
              currentMood === moodKey
                ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 scale-105"
                : "hover:scale-105"
            } ${moods[moodKey].buttonBg} ${moods[moodKey].buttonText}`}
          >
            {moods[moodKey].emoji} {moods[moodKey].name}
          </button>
        ))}
      </div>

      {/* Demo UI with current mood */}
      <div
        className={`min-h-96 rounded-xl p-8 transition-all duration-700 ${mood.bg}`}
      >
        <div
          className={`${mood.cardBg} ${mood.border} border-2 rounded-lg p-6 transition-all duration-700`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${mood.text} transition-colors duration-700`}>
            {mood.emoji} {mood.name} Mode
          </h2>
          <p className={`${mood.text} mb-4 transition-colors duration-700`}>
            {mood.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${mood.cardBg} ${mood.border} border rounded-lg p-4 transition-all duration-700 hover:scale-105`}
              >
                <div className={`h-20 ${mood.buttonBg} rounded mb-2 transition-all duration-700`}></div>
                <div className={`h-2 ${mood.text} bg-current opacity-20 rounded`}></div>
                <div className={`h-2 ${mood.text} bg-current opacity-20 rounded mt-1 w-2/3`}></div>
              </div>
            ))}
          </div>

          <button
            className={`mt-6 px-6 py-2 ${mood.buttonBg} ${mood.buttonText} rounded-lg transition-all duration-700 hover:scale-105`}
          >
            Sample Button
          </button>

          <p className={`mt-6 text-sm ${mood.accent} transition-colors duration-700`}>
            ✨ Notice how colors, contrasts, and visual weight change with each mood
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
        UI adapts to support your mental state and workflow needs
      </p>
    </div>
  );
}
