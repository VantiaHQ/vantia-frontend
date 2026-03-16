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

const funcionalidadIcons = [Phone, MessageSquare, Database, Mail, Mail];
const beneficioIcons = [Clock, PhoneCall, FileCheck, Timer, Plug];

export default function Bruno() {
  return (
    <section id="bruno" className="bg-[#070916] py-20 sm:py-28 relative">
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
        <div className="mx-auto max-w-3xl mb-16 p-6 md:p-8 rounded-2xl bg-blue-950/40 border border-blue-400/20 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          <p className="text-foreground/90 leading-relaxed text-lg text-center font-medium">
            {brunoContent.definition}
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
                  className="group flex flex-col bg-blue-950/40 rounded-xl border border-blue-400/20 shadow-lg overflow-hidden hover:bg-blue-900/40 hover:border-blue-400/40 transition-all duration-300 relative"
                >
                  {placeholder && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow p-6 relative">
                    <h3 className="text-xl font-bold text-white/90 mb-3">{item.title}</h3>
                    <p className="text-foreground/80 leading-relaxed">{item.description}</p>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-3xl rounded-full opacity-30" />
              <div className="relative rounded-2xl border border-blue-400/20 overflow-hidden shadow-2xl">
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
                Beneficios <span className="text-blue-400">Directos</span>
              </h2>
              <div className="space-y-8">
                {brunoContent.beneficios.map((item, index) => {
                  const Icon = beneficioIcons[index] ?? CheckCircle;
                  return (
                    <div key={item.title} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-950/50 border border-blue-400/30 flex items-center justify-center text-blue-300 group-hover:bg-blue-400 group-hover:text-blue-950 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white/90 mb-1 group-hover:text-blue-300 transition-colors">
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
      </div>
    </section>
  );
}

