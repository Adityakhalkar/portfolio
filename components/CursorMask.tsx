"use client";
import React, { useState, useEffect } from 'react';

const CursorMask: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'default'; // Restore default cursor on unmount
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: '32px',
        color: 'white', // Text color
        mixBlendMode: "difference", // Contrast effect
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        zIndex: 100,
        height: '60px',
        pointerEvents: "none", // Cursor does not block interactions
      }}
    >
      +
    </div>
  );
};

export default CursorMask;
