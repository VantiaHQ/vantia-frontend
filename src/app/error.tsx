'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <AlertTriangle className="w-14 h-14 text-violet-400 mb-6 opacity-80" />
      <h1 className="text-3xl font-extrabold text-white/90 mb-3">Algo ha ido mal</h1>
      <p className="text-foreground/60 mb-8 max-w-md">
        Ha ocurrido un error inesperado. Puedes intentar recargar la página o volver al inicio.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={reset}
          className="cursor-target bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full px-6"
        >
          Reintentar
        </Button>
        <Button asChild variant="outline" className="cursor-target rounded-full px-6">
          <Link href="/">Ir al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
