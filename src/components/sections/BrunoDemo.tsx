'use client';

import { Phone, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { brunoContent } from './Bruno.content';
import { Button } from '@/components/ui/button';
import FadeInSection from '@/components/ui/fade-in-section';

export default function BrunoDemo() {
  const { demo } = brunoContent;

  if (!demo) return null;

  return (
    <div className="mt-32 mb-20 px-6 sm:px-12 lg:px-20">
      <FadeInSection direction="up">
        <div className="relative isolate overflow-hidden bg-[#0F0F25]/40 px-8 md:px-20 py-10 md:py-16 shadow-2xl rounded-[2.5rem] border border-violet-500/10 backdrop-blur-xl group max-w-6xl mx-auto">
          {/* Refined Ambient Glows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-full bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-full bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side: Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <Sparkles className="w-3 h-3" />
                Demo Interactiva
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4 leading-tight">
                {demo.title.split(' Bruno ')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400"> Bruno </span>
                en vivo
              </h2>
              
              <p className="text-lg leading-relaxed text-foreground/60 max-w-xl mx-auto lg:mx-0">
                {demo.subtitle}
              </p>

              <div className="hidden lg:flex items-center gap-8 mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                    Llamada Segura
                </div>
                <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                    <Zap className="w-4 h-4 text-violet-500/50" />
                    Respuesta Inmediata
                </div>
              </div>
            </div>
            
            {/* Right side: CTA */}
            <div className="flex flex-col items-center lg:items-end gap-6 shrink-0 lg:pl-12 lg:border-l lg:border-white/5">
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] whitespace-nowrap uppercase">
                  {demo.phoneNumber}
                </span>
                <span className="text-[10px] text-cyan-400/50 font-black flex items-center gap-2 uppercase tracking-[0.3em] mt-2 whitespace-nowrap">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   Disponibilidad 24/7
                </span>
              </div>

              <Button
                asChild
                size="lg"
                className="cursor-target w-full sm:w-auto h-16 px-10 rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-black text-lg shadow-[0_10px_30px_-5px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(124,58,237,0.5)] transition-all duration-500 border-t border-white/20 group/btn active:scale-[0.98]"
              >
                <a href={`tel:${demo.phoneNumber.replace(/\s/g, '')}`}>
                  <Phone className="mr-3 h-6 w-6 group-hover/btn:rotate-12 transition-transform duration-300" />
                  {demo.cta}
                </a>
              </Button>
            </div>

            {/* Mobile badges */}
            <div className="lg:hidden flex sm:flex-row items-center justify-center gap-8 pt-6 border-t border-white/5 w-full">
              <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                Llamada Segura
              </div>
              <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                <Zap className="w-4 h-4 text-violet-500/50" />
                Respuesta Inmediata
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
