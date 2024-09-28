import { useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onEnter }: { onEnter: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEnter = () => {
    setIsLoaded(true);
    setTimeout(onEnter, 500); // Delay to allow animation to finish
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      {!isLoaded && (
        <motion.div
          className="relative text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="inline-block cursor-pointer"
            onClick={handleEnter}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-4xl font-bold">Press to Enter</h1>
            </motion.div>
            <svg
              width="400"
              height="400"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <motion.circle
                cx="60"
                cy="60"
                r="48"
                stroke="#FFD700" // Sunflower yellow color
                strokeWidth="2"
                fill="transparent"
                initial={{ strokeDasharray: 301.6, strokeDashoffset: 301.6 }}
                animate={isHovered ? { strokeDashoffset: 0 } : { strokeDashoffset: 301.6 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {[...Array(12)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`
                    M${60 + 48 * Math.cos((i * Math.PI) / 6)} ${60 + 48 * Math.sin((i * Math.PI) / 6)}
                    Q${60 + 75 * Math.cos((i * Math.PI) / 6 + 0.2)} ${60 + 75 * Math.sin((i * Math.PI) / 6 + 0.2)},
                    ${60 + 50 * Math.cos((i * Math.PI) / 6 + 0.4)} ${60 + 50 * Math.sin((i * Math.PI) / 6 + 0.4)}
                  `}
                  stroke="#FF4500" // Vibrant petal color (orange-red)
                  strokeWidth="2"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    isHovered
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: isHovered ? 0.1 * i : 0, // Staggered animation for each petal
                  }}
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
