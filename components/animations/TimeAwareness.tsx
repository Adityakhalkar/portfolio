"use client";

import { useState, useEffect } from "react";

export default function TimeAwareness() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      const hour = now.getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay("morning");
      else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
      else if (hour >= 17 && hour < 21) setTimeOfDay("evening");
      else setTimeOfDay("night");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const themes = {
    morning: {
      name: "Morning",
      emoji: "🌅",
      greeting: "Good Morning",
      bg: "bg-gradient-to-b from-orange-100 via-yellow-50 to-blue-50 dark:from-orange-950 dark:via-yellow-950 dark:to-blue-950",
      text: "text-orange-900 dark:text-orange-100",
      accent: "text-yellow-600 dark:text-yellow-400",
      description: "Fresh and energizing colors to start your day",
      sky: "bg-gradient-to-b from-orange-300 to-blue-200 dark:from-orange-900 dark:to-blue-900",
      sun: "bg-yellow-400 dark:bg-yellow-300",
      sunPosition: "top-8",
    },
    afternoon: {
      name: "Afternoon",
      emoji: "☀️",
      greeting: "Good Afternoon",
      bg: "bg-gradient-to-b from-blue-100 via-cyan-50 to-blue-50 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-950",
      text: "text-blue-900 dark:text-blue-100",
      accent: "text-cyan-600 dark:text-cyan-400",
      description: "Bright and clear for peak productivity",
      sky: "bg-gradient-to-b from-blue-400 to-cyan-200 dark:from-blue-900 dark:to-cyan-900",
      sun: "bg-yellow-300 dark:bg-yellow-200",
      sunPosition: "top-4",
    },
    evening: {
      name: "Evening",
      emoji: "🌆",
      greeting: "Good Evening",
      bg: "bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950",
      text: "text-purple-900 dark:text-purple-100",
      accent: "text-pink-600 dark:text-pink-400",
      description: "Warm tones as the day winds down",
      sky: "bg-gradient-to-b from-purple-400 to-orange-300 dark:from-purple-900 dark:to-orange-900",
      sun: "bg-orange-400 dark:bg-orange-300",
      sunPosition: "top-32",
    },
    night: {
      name: "Night",
      emoji: "🌙",
      greeting: "Good Night",
      bg: "bg-gradient-to-b from-indigo-950 via-blue-950 to-purple-950",
      text: "text-indigo-100",
      accent: "text-blue-300",
      description: "Dark and restful for your circadian rhythm",
      sky: "bg-gradient-to-b from-indigo-950 to-purple-950",
      sun: "bg-gray-100",
      sunPosition: "top-8",
    },
  };

  const theme = themes[timeOfDay];

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Time-of-Day Awareness</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          UI that respects your circadian rhythm. Colors and contrast subtly shift throughout the day -
          energizing in the morning, focused in the afternoon, warm in the evening, and restful at night.
        </p>
      </div>

      {/* Current time display */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600 dark:text-gray-400">Current Time</p>
        <p className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</p>
      </div>

      {/* Time-aware UI demo */}
      <div
        className={`rounded-xl p-8 transition-all duration-1000 ${theme.bg}`}
      >
        {/* Sky with sun/moon */}
        <div className={`relative h-48 rounded-lg mb-6 overflow-hidden ${theme.sky} transition-all duration-1000`}>
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full ${theme.sun} transition-all duration-1000 ${theme.sunPosition}`}
          >
            {timeOfDay === "night" && (
              <div className="absolute top-2 left-2 w-10 h-10 bg-indigo-950 rounded-full"></div>
            )}
          </div>
          {/* Stars for night */}
          {timeOfDay === "night" && (
            <>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </>
          )}
        </div>

        <div className="text-center">
          <h2 className={`text-4xl font-bold mb-2 ${theme.text} transition-colors duration-1000`}>
            {theme.emoji} {theme.greeting}!
          </h2>
          <p className={`${theme.accent} mb-6 transition-colors duration-1000`}>
            {theme.description}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`bg-white/50 dark:bg-black/30 backdrop-blur rounded-lg p-4 transition-all duration-1000`}
              >
                <div className={`h-16 ${theme.text} bg-current opacity-20 rounded mb-2`}></div>
                <div className={`h-2 ${theme.text} bg-current opacity-30 rounded`}></div>
                <div className={`h-2 ${theme.text} bg-current opacity-30 rounded mt-1 w-2/3`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
        Colors automatically adjust based on your local time to support your natural rhythm
      </p>
    </div>
  );
}
