'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface FullScreenLoaderProps {
  isLoading: boolean;
}

export default function FullScreenLoader({ isLoading }: FullScreenLoaderProps) {
  const [isVisible, setIsVisible] = useState(isLoading);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isLoading) {
      setIsVisible(true);
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setIsVisible(false),
      });
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing Circle */}
        <div className="absolute w-24 h-24 rounded-full bg-primary opacity-20 animate-pulse" />
        <div className="absolute w-16 h-16 rounded-full bg-primary opacity-40 animate-pulse animation-delay-200" />
        <div className="absolute w-8 h-8 rounded-full bg-primary opacity-60 animate-pulse animation-delay-400" />

        {/* Loading Message */}
        <p className="text-white text-xl font-semibold z-10">Cargando...</p>
      </div>
    </div>
  );
}
