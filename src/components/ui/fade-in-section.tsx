'use client';

import { useRef } from 'react';
import { useLenis } from 'lenis/react';

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll }) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const { top, height } = rect;
    const viewportHeight = window.innerHeight;

    let progress = 0;
    if (top < viewportHeight && top + height > 0) {
      progress = (viewportHeight - top) / (viewportHeight + height);
    }

    const opacity = Math.min(1, Math.max(0, progress * 2));
    const translateY = Math.max(0, 50 * (1 - progress * 1.5));

    sectionRef.current.style.opacity = `${opacity}`;
    sectionRef.current.style.transform = `translateY(${translateY}px)`;
  });

  return (
    <div ref={sectionRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}