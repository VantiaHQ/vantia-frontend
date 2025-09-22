import type { SVGProps } from 'react';

export default function VantiaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className="h-8 w-8 text-primary"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(240, 50%, 70%)' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(240, 50%, 90%)' }} />
        </linearGradient>
        <linearGradient id="grad2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(240, 50%, 20%)' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(240, 50%, 40%)' }} />
        </linearGradient>
      </defs>
      <path d="M50 0 L 20 50 L 50 100 L 80 50 Z" fill="url(#grad2)" />
      <path d="M0 50 L 50 20 L 100 50 L 50 80 Z" fill="url(#grad1)" />
    </svg>
  );
}
