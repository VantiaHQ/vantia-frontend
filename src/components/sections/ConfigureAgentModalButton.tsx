
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

type ConfigureAgentModalButtonProps = {
  preSelectedModules: string[];
};

export default function ConfigureAgentModalButton({ preSelectedModules }: ConfigureAgentModalButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="mt-16 w-full md:w-auto cursor-target group bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
    >
      <Link href="/calculadora-ahorro">
        <Calculator className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
        Calcular Ahorro
      </Link>
    </Button>
  );
}
