"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Card {
  id: number;
  title: string;
  description: string;
  number: string;
}

const defaultCards: Card[] = [
  {
    id: 1,
    title: "Design",
    description: "Clean interfaces with attention to detail and user experience",
    number: "01",
  },
  {
    id: 2,
    title: "Develop",
    description: "Modern solutions built with performance and scalability in mind",
    number: "02",
  },
  {
    id: 3,
    title: "Deploy",
    description: "Reliable systems with continuous integration and monitoring",
    number: "03",
  },
  {
    id: 4,
    title: "Iterate",
    description: "Constant improvement through testing and user feedback",
    number: "04",
  },
];

export default function MagneticCardDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Initialize card animations
  useEffect(() => {
    if (!deckRef.current) return;

    // Initial stagger animation
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
    });

    // Set initial 3D transforms
    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        z: -index * 10,
      });
    });
  }, []);

  // Magnetic effect on mouse move
  useEffect(() => {
    if (!deckRef.current || expandedCard !== null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = deckRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

        const distanceX = x - cardCenterX;
        const distanceY = y - cardCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const moveX = distanceX * force * 0.2;
          const moveY = distanceY * force * 0.2;

          gsap.to(card, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    const deck = deckRef.current;
    deck.addEventListener("mousemove", handleMouseMove);
    deck.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      deck.removeEventListener("mousemove", handleMouseMove);
      deck.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [expandedCard]);

  // Handle card expansion
  const handleCardClick = (index: number) => {
    if (expandedCard === index) {
      // Collapse
      setExpandedCard(null);

      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          z: -i * 10,
          zIndex: cardsRef.current.length - i,
          duration: 0.5,
          ease: "power2.inOut",
        });
      });
    } else {
      // Expand
      setExpandedCard(index);

      cardsRef.current.forEach((card, i) => {
        if (i === index) {
          gsap.to(card, {
            z: 50,
            zIndex: 100,
            duration: 0.5,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(card, {
            z: -50 - Math.abs(i - index) * 10,
            zIndex: i,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={deckRef}
        className="relative h-[400px] flex items-center justify-center"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {defaultCards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            onClick={() => handleCardClick(index)}
            className="absolute w-72 h-80 cursor-pointer group"
            style={{
              transformStyle: "preserve-3d",
              zIndex: defaultCards.length - index,
            }}
          >
            {/* Card */}
            <div className="relative w-full h-full border border-black dark:border-white bg-white dark:bg-black transition-colors duration-300">
              {/* Content */}
              <div className="p-6 h-full flex flex-col">
                {/* Number */}
                <div className="text-sm font-mono text-gray-400 mb-4">
                  {card.number}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-black dark:text-white mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-opacity duration-300 ${
                  expandedCard === index ? "opacity-100" : "opacity-70"
                }`}>
                  {card.description}
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-400">
                    {expandedCard === index ? "Click to collapse" : "Click to expand"}
                  </div>
                  <div className="flex gap-1">
                    {defaultCards.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === index
                            ? "bg-black dark:bg-white w-4"
                            : "bg-gray-300 dark:bg-gray-700 w-1"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-black dark:group-hover:border-white transition-colors duration-300 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Move your cursor to interact with the cards</p>
      </div>
    </div>
  );
}
