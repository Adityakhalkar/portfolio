import React, { useEffect, useState } from 'react';

type MaskTransitionProps = {
  onTransitionComplete?: () => void;
  className?: string;
};

const MaskTransition = ({ onTransitionComplete, className = '' }: MaskTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScale(100);
      setTimeout(() => {
        setIsTransitioning(false);
        if (onTransitionComplete) onTransitionComplete();
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, [onTransitionComplete]);

  if (!isTransitioning) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black ${className}`}
      style={{
        maskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45 0h10v100H45z'/%3E%3Cpath d='M0 45h100v10H0z'/%3E%3C/svg%3E")`,
        maskSize: `${scale * 100}px`,
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45 0h10v100H45z'/%3E%3Cpath d='M0 45h100v10H0z'/%3E%3C/svg%3E")`,
        WebkitMaskSize: `${scale * 100}px`,
        WebkitMaskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        transition: 'mask-size 1s cubic-bezier(0.65, 0, 0.35, 1), -webkit-mask-size 1s cubic-bezier(0.65, 0, 0.35, 1)'
      }}
    />
  );
};

export default MaskTransition;