"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function TextSplitAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);

  const effects = [
    {
      id: "chars",
      name: "Character Split",
      text: "Split by Characters",
      description: "Each character animates individually",
    },
    {
      id: "words",
      name: "Word Wave",
      text: "Words Animate Separately",
      description: "Words appear one by one",
    },
    {
      id: "lines",
      name: "Line Reveal",
      text: "Line by Line Animation",
      description: "Full lines slide in",
    },
    {
      id: "scramble",
      name: "Scramble Text",
      text: "Random Characters First",
      description: "Text scrambles then reveals",
    },
  ];

  const animateChars = (element: HTMLElement) => {
    const text = element.innerText;
    element.innerHTML = text
      .split("")
      .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const chars = element.querySelectorAll("span");
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  };

  const animateWords = (element: HTMLElement) => {
    const text = element.innerText;
    element.innerHTML = text
      .split(" ")
      .map((word) => `<span class="inline-block mr-2">${word}</span>`)
      .join("");

    const words = element.querySelectorAll("span");
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 30,
        scale: 0,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
      }
    );
  };

  const animateLines = (element: HTMLElement) => {
    const text = element.innerText;
    element.innerHTML = `<span class="inline-block overflow-hidden"><span class="inline-block">${text}</span></span>`;

    const inner = element.querySelector("span span");
    gsap.fromTo(
      inner,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  };

  const animateScramble = (element: HTMLElement) => {
    const text = element.innerText;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";
    let iterations = 0;

    const interval = setInterval(() => {
      element.innerText = text
        .split("")
        .map((char, index) => {
          if (index < iterations) {
            return text[index];
          }
          if (char === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };

  const playEffect = (effectId: string) => {
    const effectElement = document.getElementById(`effect-${effectId}`);
    if (!effectElement) return;

    // Reset
    const effect = effects.find((e) => e.id === effectId);
    if (effect) {
      effectElement.innerText = effect.text;
    }

    setSelectedEffect(effectId);

    // Animate based on effect type
    setTimeout(() => {
      switch (effectId) {
        case "chars":
          animateChars(effectElement);
          break;
        case "words":
          animateWords(effectElement);
          break;
        case "lines":
          animateLines(effectElement);
          break;
        case "scramble":
          animateScramble(effectElement);
          break;
      }
    }, 100);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Text Split Animations
        </h2>

        <div className="space-y-4 mb-6">
          {effects.map((effect) => (
            <div
              key={effect.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="mb-4">
                <h3 className="text-white font-semibold mb-1">{effect.name}</h3>
                <p className="text-white/70 text-sm">{effect.description}</p>
              </div>

              <div className="bg-white/5 rounded-lg p-6 mb-4 min-h-[80px] flex items-center justify-center">
                <div
                  id={`effect-${effect.id}`}
                  className="text-white text-2xl font-bold text-center"
                >
                  {effect.text}
                </div>
              </div>

              <button
                onClick={() => playEffect(effect.id)}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedEffect === effect.id
                    ? "bg-white text-purple-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                ▶️ Play Animation
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Text Animation Techniques</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>Character Split:</strong> Wraps each character in span tags</li>
          <li>• <strong>Stagger:</strong> Delays between each element</li>
          <li>• <strong>3D Transforms:</strong> rotationX, rotationY for depth</li>
          <li>• <strong>Scramble:</strong> JavaScript interval for matrix effect</li>
          <li>• <strong>Note:</strong> Real SplitText plugin provides advanced features</li>
        </ul>
      </div>
    </div>
  );
}
