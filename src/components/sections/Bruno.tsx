'use client';

import {
  Phone,
  MessageSquare,
  Database,
  Mail,
  Clock,
  PhoneCall,
  FileCheck,
  Timer,
  Plug,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import { AppImages } from '@/lib/appImages';
import { brunoContent } from './Bruno.content';
import BrunoHeroAnimation from './BrunoHeroAnimation';
import BrunoDemo from './BrunoDemo';

const funcionalidadIcons = [Phone, MessageSquare, Database, Mail, Mail];
const beneficioIcons = [Clock, PhoneCall, FileCheck, Timer, Plug];

export default function Bruno() {
  return (
    <section id="bruno" className="bg-[#050510] py-20 sm:py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Bruno: estilo similar a Consultoría IA */}
        <div className="mx-auto max-w-3xl text-left sm:text-center mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-white/90 mb-4 drop-shadow-[0_0_24px_rgba(139,92,246,0.5)]">
            {brunoContent.product.name}
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-8 text-foreground/80">
            {brunoContent.product.tagline}
          </p>
        </div>

        {/* Hero animation */}
        <div className="mx-auto max-w-5xl mb-16">
          <BrunoHeroAnimation />
        </div>

        {/* Definición */}
        <div className="mx-auto max-w-4xl mb-16 p-8 md:p-10 rounded-2xl bg-[#0F0F25]/80 border border-violet-500/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
          <p className="text-foreground/90 leading-relaxed text-xl sm:text-2xl text-center font-light tracking-wide italic">
            "{brunoContent.definition}"
          </p>
        </div>

        {/* Funcionalidades */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white/90 text-center mb-10">
            Funcionalidades
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {brunoContent.funcionalidades.map((item) => {
              const placeholder = AppImages.find((p) => p.id === item.imageId);
              return (
                <div
                  key={item.title}
                  className="group flex flex-col bg-[#101025]/60 rounded-xl border border-white/5 shadow-lg overflow-hidden hover:bg-[#151530]/80 hover:border-violet-500/30 transition-all duration-500 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {placeholder && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101025] to-transparent opacity-80" />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow p-7 relative">
                    <h3 className="text-xl font-bold text-white/90 mb-3 group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h3>
                    <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Beneficios directos — Refactored to Side-by-Side Layout */}
        <div className="mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Big Illustrative Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30" />
              <div className="relative rounded-2xl border border-violet-400/20 overflow-hidden shadow-2xl">
                <Image
                  src="/images/bruno-benefits-showcase.png"
                  alt="Bruno Benefits Showcase"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070916] via-transparent to-transparent" />
              </div>
            </div>

            {/* Right: Detailed List of Benefits */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-white/90 mb-8 lg:text-left text-center">
                Beneficios <span className="text-violet-400">Directos</span>
              </h2>
              <div className="space-y-10">
                {brunoContent.beneficios.map((item, index) => {
                  const Icon = beneficioIcons[index] ?? CheckCircle;
                  return (
                    <div key={item.title} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#101025] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:border-violet-400">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-bold text-white/90 mb-2 group-hover:text-violet-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed max-w-md">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Demo en Vivo */}
        <BrunoDemo />
      </div>
    </section>
  );
}

