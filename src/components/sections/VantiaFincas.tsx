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
import { vantiaFincasContent } from './VantiaFincas.content';

const funcionalidadIcons = [Phone, MessageSquare, Database, Mail];
const beneficioIcons = [Clock, PhoneCall, FileCheck, Timer, Plug];

export default function VantiaFincas() {
  return (
    <section id="vantia-fincas" className="bg-[#070916] py-20 sm:py-28">
      <div className="container mx-auto px-6">
        {/* Contexto */}
        <div className="mx-auto max-w-3xl mb-16">
          <span className="block text-sm font-medium uppercase tracking-widest text-primary/90 mb-4">
            Contexto
          </span>
          <p className="text-lg text-foreground/90 mb-6">
            {vantiaFincasContent.context.intro}
          </p>
          <ul className="space-y-2 mb-8">
            {vantiaFincasContent.context.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/85">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary/80 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold text-white/95 mb-2">
            {vantiaFincasContent.context.familiar}
          </p>
          <p className="text-lg text-foreground/80">
            {vantiaFincasContent.context.question}
          </p>
        </div>

        {/* Producto: Vantia Fincas / Bruno */}
        <div className="mx-auto max-w-4xl text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 mb-4">
            {vantiaFincasContent.product.name}
          </h2>
          <p className="text-lg text-foreground/85 max-w-2xl mx-auto">
            {vantiaFincasContent.product.tagline}
          </p>
        </div>

        {/* Definición */}
        <div className="mx-auto max-w-3xl mb-16 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-foreground/90 leading-relaxed">
            {vantiaFincasContent.definition}
          </p>
        </div>

        {/* Funcionalidades */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white/95 text-center mb-10">
            Funcionalidades
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vantiaFincasContent.funcionalidades.map((item, index) => {
              const Icon = funcionalidadIcons[index] ?? CheckCircle;
              return (
                <div
                  key={item.title}
                  className="flex flex-col p-6 rounded-xl bg-background/60 border border-border/50 shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-white/95 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-foreground/80">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Beneficios directos */}
        <div>
          <h3 className="text-2xl font-bold text-white/95 text-center mb-10">
            Beneficios directos
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vantiaFincasContent.beneficios.map((item, index) => {
              const Icon = beneficioIcons[index] ?? CheckCircle;
              return (
                <div
                  key={item.title}
                  className="flex flex-col p-6 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-white/95 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-foreground/80">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
