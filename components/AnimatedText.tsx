// components/InteractiveText3D.tsx

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls } from '@react-three/drei'; // Drei provides easier abstractions for three.js
import { gsap } from 'gsap';

const Letter = ({ letter, index, onClick }: { letter: string, index: number, onClick: () => void }) => {
  const letterRef = useRef(); // Ref for the individual letter mesh

  // Animating rotation with useFrame (executed on each frame)
  useFrame(() => {
    if (letterRef.current) {
      letterRef.current.rotation.y += 0.01; // Continuous slow rotation
      letterRef.current.rotation.x += 0.005;
    }
  });

  // Function to apply hover effects
  const handleHover = () => {
    if (letterRef.current) {
      gsap.to(letterRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
      });
    }
  };

  // Function to reset after hover
  const handleLeave = () => {
    if (letterRef.current) {
      gsap.to(letterRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <mesh
      ref={letterRef}
      position={[index - 2, 0, 0]} // Spacing out letters
      onClick={onClick}
      onPointerOver={handleHover}
      onPointerOut={handleLeave}
    >
      <Text3D font="/fonts/helvetiker_bold.typeface.json" size={0.5}>
        {letter}
        <meshStandardMaterial color="white" />
      </Text3D>
    </mesh>
  );
};

const InteractiveText3D = () => {
  const letters = ['H', 'E', 'L', 'L', 'O'];
  const [clicked, setClicked] = useState(false);

  // Function to animate all letters on click
  const animateLetters = (letterRefs) => {
    letterRefs.current.forEach((letter, index) => {
      const randomX = Math.random() * 3 - 1.5;
      const randomY = Math.random() * 3 - 1.5;
      const randomZ = Math.random() * 3 - 1.5;

      gsap.to(letter.position, {
        x: randomX,
        y: randomY,
        z: randomZ,
        duration: 2 + Math.random(),
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(letter.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'bounce.out',
          });
        },
      });

      gsap.to(letter.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.5,
        repeat: 1,
        yoyo: true,
        delay: index * 0.1,
      });
    });
  };

  const letterRefs = useRef([]); // Store references to all letter meshes

  const handleClick = () => {
    setClicked(!clicked);
    animateLetters(letterRefs); // Trigger animation on all letters
  };

  return (
    <Canvas style={{ height: '100vh', background: '#111' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Render each letter */}
      {letters.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          index={index}
          onClick={handleClick}
          ref={(el) => (letterRefs.current[index] = el)}
        />
      ))}

      {/* Optional controls to allow user to orbit around */}
      <OrbitControls />
    </Canvas>
  );
};

export default InteractiveText3D;
