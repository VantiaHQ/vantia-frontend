import type { SVGProps } from 'react';

export default function VantiaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 130 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="23"
        fontFamily="'Inter', sans-serif"
        fontSize="24"
        fontWeight="800"
        fill="url(#grad1)"
      >
        VANTIA
      </text>
      <text
        x="100"
        y="23"
        fontFamily="'Inter', sans-serif"
        fontSize="24"
        fontWeight="800"
        fill="hsl(var(--primary))"
      >
        .AI
      </text>
    </svg>
  );
}
