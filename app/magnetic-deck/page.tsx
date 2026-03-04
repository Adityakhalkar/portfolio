"use client";

import MagneticCardDeck from "../../components/animations/MagneticCardDeck";
import Navigation from "../../components/Navigation";

export default function MagneticDeckPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      <div className="pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              Magnetic Card Deck
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive 3D cards with magnetic hover effects
            </p>
          </div>

          {/* Component */}
          <MagneticCardDeck />

          {/* Details */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                Magnetic Physics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cards respond to cursor proximity with distance-based attraction
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                3D Transforms
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Perspective depth with layered z-axis positioning
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                Smooth Animation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                GSAP-powered 60fps animations with natural easing
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Built with
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-mono text-black dark:text-white">
                React
              </div>
              <div className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-mono text-black dark:text-white">
                TypeScript
              </div>
              <div className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-mono text-black dark:text-white">
                GSAP
              </div>
              <div className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-mono text-black dark:text-white">
                Tailwind
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
