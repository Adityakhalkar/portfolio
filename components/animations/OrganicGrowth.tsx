"use client";

import { useState } from "react";

export default function OrganicGrowth() {
  const [isGrowing, setIsGrowing] = useState(false);

  const handleGrow = () => {
    setIsGrowing(false);
    setTimeout(() => setIsGrowing(true), 50);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Organic Growth Animation</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Elements don&apos;t just fade in - they grow naturally like plants. Watch as stems branch out,
          leaves unfurl, and content blooms into existence with nature-inspired animations.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button
          onClick={handleGrow}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Grow Plant 🌱
        </button>

        {/* Plant container */}
        <div className="relative w-full h-96 bg-gradient-to-b from-sky-100 to-green-50 dark:from-sky-900 dark:to-green-950 rounded-lg overflow-hidden border-2 border-green-300 dark:border-green-700">
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-20 bg-amber-800 dark:bg-amber-900"></div>

          {isGrowing && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
              {/* Main stem */}
              <div
                className="w-2 bg-green-700 dark:bg-green-600 origin-bottom"
                style={{
                  height: "0px",
                  animation: "growStem 1s ease-out forwards",
                }}
              >
                {/* Left branch */}
                <div
                  className="absolute top-1/3 left-0 w-1.5 h-16 bg-green-600 dark:bg-green-500 origin-bottom opacity-0"
                  style={{
                    transformOrigin: "bottom center",
                    animation: "growBranch 0.8s ease-out 0.5s forwards",
                    transform: "rotate(-45deg)",
                  }}
                >
                  {/* Left leaf */}
                  <div
                    className="absolute -left-6 top-2 w-12 h-8 bg-green-500 dark:bg-green-400 rounded-full opacity-0"
                    style={{
                      animation: "unfurlLeaf 0.6s ease-out 1s forwards",
                      clipPath: "polygon(100% 50%, 100% 50%, 100% 50%)",
                    }}
                  ></div>
                </div>

                {/* Right branch */}
                <div
                  className="absolute top-1/2 right-0 w-1.5 h-16 bg-green-600 dark:bg-green-500 origin-bottom opacity-0"
                  style={{
                    transformOrigin: "bottom center",
                    animation: "growBranch 0.8s ease-out 0.7s forwards",
                    transform: "rotate(45deg)",
                  }}
                >
                  {/* Right leaf */}
                  <div
                    className="absolute -right-6 top-2 w-12 h-8 bg-green-500 dark:bg-green-400 rounded-full opacity-0"
                    style={{
                      animation: "unfurlLeaf 0.6s ease-out 1.2s forwards",
                      clipPath: "polygon(0% 50%, 0% 50%, 0% 50%)",
                    }}
                  ></div>
                </div>

                {/* Flower on top */}
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0"
                  style={{
                    animation: "bloomFlower 1s ease-out 1.5s forwards",
                  }}
                >
                  {/* Petals */}
                  <div className="relative w-16 h-16">
                    {[0, 72, 144, 216, 288].map((rotation, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-6 h-8 bg-pink-400 dark:bg-pink-500 rounded-full"
                        style={{
                          transform: `rotate(${rotation}deg) translateY(-12px)`,
                          transformOrigin: "center",
                        }}
                      ></div>
                    ))}
                    {/* Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          Nature-inspired UI lifecycle: seed → stem → branches → leaves → flower
        </p>
      </div>

      <style jsx>{`
        @keyframes growStem {
          from {
            height: 0px;
          }
          to {
            height: 120px;
          }
        }

        @keyframes growBranch {
          from {
            height: 0px;
            opacity: 0;
          }
          to {
            height: 64px;
            opacity: 1;
          }
        }

        @keyframes unfurlLeaf {
          0% {
            clip-path: polygon(50% 50%, 50% 50%, 50% 50%);
            opacity: 0;
          }
          100% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            opacity: 1;
          }
        }

        @keyframes bloomFlower {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
