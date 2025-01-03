"use client";
import React, { useState, useEffect } from 'react';

const CursorMask = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      
      // Get the element under the cursor
      const target = event.target as HTMLElement | null;
      
      if (!target) {
        setCursorState('default');
        return;
      }

      // Safely check for clickable class
      const hasClickableClass = (target?.className !== null && target?.className !== undefined) ? (
        typeof target.className === 'string'
          ? target.className.includes('clickable')
          : target.classList?.contains('clickable')
      ) : false;
      
      // Check for different cursor states
      if (target.tagName === 'A' || 
          target.onclick || 
          target.getAttribute('role') === 'button' || 
          hasClickableClass) {
        setCursorState('pointer');
      } else if (target.tagName === 'INPUT' || 
                 target.tagName === 'TEXTAREA' || 
                 target.getAttribute('contenteditable') === 'true') {
        setCursorState('text');
      } else if (target.tagName === 'SELECT') {
        setCursorState('select');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => {
      setCursorState(prev => prev === 'grab' ? 'grabbing' : 'clicking');
    };

    const handleMouseUp = () => {
      // Restore previous state based on the element under cursor
      handleMouseMove(new MouseEvent('mousemove', {
        clientX: position.x,
        clientY: position.y
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [position.x, position.y]);

  const getCursorContent = () => {
    switch (cursorState) {
      case 'pointer':
        return 'o';
      case 'text':
        return '|';
      case 'select':
        return '⌄';
      case 'grab':
        return '✋';
      case 'grabbing':
        return '✊';
      case 'clicking':
        return '•';
      default:
        return '+';
    }
  };

  const getCursorStyles = () => {
    const baseStyles = {
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: 'translate(-50%, -50%)',
      position: 'fixed' as const,
      fontFamily: "'Press Start 2P', cursive",
      fontSize: '32px',
      color: 'white',
      mixBlendMode: 'difference' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px',
      height: '60px',
      zIndex: 100,
      pointerEvents: 'none' as const,
    };

    switch (cursorState) {
      case 'text':
        return {
          ...baseStyles,
          width: '20px',
          height: '40px',
          animation: 'blink 1s infinite',
        };
      case 'pointer':
        return {
          ...baseStyles,
          transform: 'translate(-50%, -50%) scale(0.7)',
        };
      case 'clicking':
        return {
          ...baseStyles,
          transform: 'translate(-50%, -50%) scale(0.8)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <>
      <style jsx global>{`
      * {
          cursor: none !important;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div
        className="fixed pointer-events-none z-100"
        style={getCursorStyles()}
      >
        {getCursorContent()}
      </div>
    </>
  );
};

export default CursorMask;