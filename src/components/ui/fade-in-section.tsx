'use client';
import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function FadeInSection({ children, direction = 'up', className = '' }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let fadeClass = 'opacity-0 translate-y-8';
  if (direction === 'down') fadeClass = 'opacity-0 -translate-y-8';
  if (direction === 'left') fadeClass = 'opacity-0 -translate-x-8';
  if (direction === 'right') fadeClass = 'opacity-0 translate-x-8';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform will-change-opacity ${className} ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : fadeClass
      }`}
    >
      {children}
    </div>
  );
}
