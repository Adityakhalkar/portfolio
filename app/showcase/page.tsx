"use client";

import { useState } from "react";
import Navigation from "../../components/Navigation";
import PoneglyphCard from "../../components/animations/PoneglyphCard";
import CyberCard from "../../components/animations/CyberCard";
import QuantumCard from "../../components/animations/QuantumCard";
import BioCard from "../../components/animations/BioCard";
import EyesFollowCursor from "../../components/animations/EyesFollowCursor";
import HandwritingInput from "../../components/animations/HandwritingInput";
import OrganicGrowth from "../../components/animations/OrganicGrowth";
import MoodTheme from "../../components/animations/MoodTheme";
import TimeAwareness from "../../components/animations/TimeAwareness";
import ReadingTimer from "../../components/animations/ReadingTimer";
import ScrollTriggerPinning from "../../components/animations/ScrollTriggerPinning";
import ScrollTriggerParallax from "../../components/animations/ScrollTriggerParallax";
import HorizontalScroll from "../../components/animations/HorizontalScroll";
import TimelineStagger from "../../components/animations/TimelineStagger";
import SVGMorph from "../../components/animations/SVGMorph";
import Transform3D from "../../components/animations/Transform3D";
import DraggablePhysics from "../../components/animations/DraggablePhysics";
import CustomEasing from "../../components/animations/CustomEasing";
import TextSplitAnimation from "../../components/animations/TextSplitAnimation";
import MotionPath from "../../components/animations/MotionPath";
import MagneticCardDeck from "../../components/animations/MagneticCardDeck";

const animationCategories = {
  cards: {
    name: "Cards",
    items: [
      {
        id: 1,
        title: "Magnetic Card Deck",
        description: "3D stacked cards with magnetic hover effects and glassmorphism",
        component: <MagneticCardDeck />
      },
      {
        id: 2,
        title: "Nexus Poneglyph",
        description: "Tech streams with angular patterns and holographic overlay effects",
        component: <PoneglyphCard />
      },
      {
        id: 3,
        title: "Cyber Neural",
        description: "Grid patterns with scan lines and cyberpunk aesthetics",
        component: <CyberCard />
      },
      {
        id: 4,
        title: "Quantum Core",
        description: "Particle effects with entanglement and quantum wave animations",
        component: <QuantumCard />
      },
      {
        id: 5,
        title: "Bio Genome",
        description: "DNA helix formation with organic pulses and molecular structures",
        component: <BioCard />
      }
    ]
  },
  text: {
    name: "Text Animations",
    items: [
      {
        id: 1,
        title: "Handwriting Input",
        description: "Type and watch text transform from handwriting to digital - Personal → Digital",
        component: <HandwritingInput />
      }
    ]
  },
  background: {
    name: "Background Effects",
    items: [
      {
        id: 1,
        title: "Organic Growth",
        description: "Elements grow naturally like plants - stem → branches → leaves → flower",
        component: <OrganicGrowth />
      }
    ]
  },
  hover: {
    name: "Hover Effects",
    items: [
      {
        id: 1,
        title: "Eyes Follow Cursor",
        description: "Interactive eyes that track cursor movement and blink periodically",
        component: <EyesFollowCursor />
      }
    ]
  },
  gsap: {
    name: "GSAP Animations",
    items: [
      {
        id: 1,
        title: "ScrollTrigger - Pinning",
        description: "Pin elements in place while scrolling through content sections",
        component: <ScrollTriggerPinning />
      },
      {
        id: 2,
        title: "ScrollTrigger - Parallax",
        description: "Multi-layer parallax effect with different scroll speeds",
        component: <ScrollTriggerParallax />
      },
      {
        id: 3,
        title: "Horizontal Scroll",
        description: "Vertical scroll drives horizontal panel movement with snap points",
        component: <HorizontalScroll />
      },
      {
        id: 4,
        title: "Timeline Stagger",
        description: "Sequential animations with stagger delays and timeline control",
        component: <TimelineStagger />
      },
      {
        id: 5,
        title: "SVG Morphing",
        description: "Smooth shape transformations between different SVG paths",
        component: <SVGMorph />
      },
      {
        id: 6,
        title: "3D Transforms",
        description: "Rotate and transform elements in 3D space with perspective",
        component: <Transform3D />
      },
      {
        id: 7,
        title: "Draggable Physics",
        description: "Drag elements with inertia, bounds, and snap-to-grid",
        component: <DraggablePhysics />
      },
      {
        id: 8,
        title: "Custom Easing",
        description: "Compare different easing functions side-by-side",
        component: <CustomEasing />
      },
      {
        id: 9,
        title: "Text Split Animations",
        description: "Animate text by characters, words, lines, or scramble effect",
        component: <TextSplitAnimation />
      },
      {
        id: 10,
        title: "Motion Path",
        description: "Animate elements along SVG paths with auto-rotation",
        component: <MotionPath />
      }
    ]
  },
  scroll: {
    name: "Scroll Effects",
    items: [
      {
        id: 1,
        title: "Reading Timer",
        description: "Shows read time estimate and saves your position - respects your time investment",
        component: <ReadingTimer />
      }
    ]
  },
  themes: {
    name: "Adaptive Themes",
    items: [
      {
        id: 1,
        title: "Mood-Based Theme",
        description: "Choose your mood: Focused, Energetic, or Calm - UI adapts entirely to your state",
        component: <MoodTheme />
      },
      {
        id: 2,
        title: "Time-of-Day Awareness",
        description: "Colors shift throughout the day to respect your circadian rhythm - morning to night",
        component: <TimeAwareness />
      }
    ]
  }
};

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof animationCategories>("cards");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const currentCategory = animationCategories[selectedCategory];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navigation />

      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Animation Showcase</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Exploring different animation techniques and interactions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  Categories
                </h3>
                {Object.entries(animationCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key as keyof typeof animationCategories);
                      setSelectedItem(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedCategory === key
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Items List */}
            <div className="lg:col-span-1">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  {currentCategory.name}
                </h3>
                {currentCategory.items.length === 0 ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No animations yet
                  </div>
                ) : (
                  currentCategory.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedItem?.id === item.id
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Animation Display */}
            <div className="lg:col-span-3">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg min-h-[600px]">
                {selectedItem ? (
                  <div className="p-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedItem.description}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                      {selectedItem.component}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-4">✨</div>
                      <p className="text-lg mb-2">Ready to build animations!</p>
                      <p className="text-sm">
                        Select a category and tell me what you&apos;d like to create
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}