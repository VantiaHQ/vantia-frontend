'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function VantiaLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = theme === 'system' ? resolvedTheme : theme;
  
  const logoSrc = effectiveTheme === 'dark' ? '/vantia-logo-negativo.png' : '/vantia-logo-plano.png';

  if (!mounted) {
    return (
        <Image
            src="/vantia-logo-negativo.png"
            alt="Vantia Logo"
            width={130}
            height={32}
            className="h-8 w-auto"
            priority
        />
    );
  }

  return (
    <Image
      src={logoSrc}
      alt="Vantia Logo"
      width={130}
      height={32}
      className="h-8 w-auto"
      priority
    />
  );
}
