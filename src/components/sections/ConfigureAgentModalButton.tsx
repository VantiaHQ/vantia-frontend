
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ConfigurarAgenteContent from '@/app/configurar-agente/ConfigurarAgenteContent';
import { Settings, X } from 'lucide-react';

type ConfigureAgentModalButtonProps = {
  preSelectedModules: string[];
};

export default function ConfigureAgentModalButton({ preSelectedModules }: ConfigureAgentModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="mt-16 w-full md:w-auto cursor-target group bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
        >
          <Settings className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          Ver Presupuesto y Configurar Agente
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto rounded-t-xl p-0">
        <SheetHeader className="sticky top-0 z-10 bg-[#070916] p-4 flex items-center justify-between rounded-t-xl">
          <div className="text-center">
            <SheetTitle className="text-white">Configurar Agente</SheetTitle>
            <SheetDescription className="text-gray-400">
              Ajusta los módulos de IA para tu agente.
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 rounded-full border border-gray-600 w-10 h-10">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="overflow-y-auto py-4" style={{ maxHeight: 'calc(90vh - 70px)' }}>
          <ConfigurarAgenteContent initialSelectedModules={preSelectedModules} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
