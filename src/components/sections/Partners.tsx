'use client';

import Image from 'next/image';
import FadeInSection from '@/components/ui/fade-in-section';

const partner = {
  name: 'COAFA',
  fullName: 'Colegio de Administradores de Fincas de Alicante',
  logo: '/images/logo-coafa.png',
  role: 'Colaborador Oficial',
  description: 'Vantia colabora estrechamente con el Colegio de Administradores de Fincas de Alicante para impulsar la digitalización y la eficiencia en el sector mediante soluciones de Inteligencia Artificial.'
};

export default function Partners() {
  return (
    <section id="partners" className="bg-[#070916] py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeInSection direction="up">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-sm font-bold tracking-[0.2em] text-violet-400 uppercase mb-4">
              Confianza y Respaldo Institucional
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white/90">
              Colaboradores <span className="text-cyan-400">Oficiales</span>
            </h3>
          </div>
        </FadeInSection>

        <FadeInSection direction="up" delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="relative group rounded-3xl border border-white/5 bg-[#0F0F25]/60 p-8 md:p-12 overflow-hidden backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-violet-500/20">
              {/* Refined Internal Glow */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-violet-600/20 transition-all duration-700" />
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-600/20 transition-all duration-700" />
              
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="flex-shrink-0 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 shadow-xl">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    width={180}
                    height={180}
                    className="w-32 h-auto md:w-40 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-violet-400 text-xs font-black uppercase tracking-widest bg-violet-400/10 px-3 py-1 rounded-full w-fit mx-auto md:mx-0">
                      {partner.role}
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-2 leading-tight">
                      {partner.fullName}
                    </h4>
                  </div>
                  <p className="text-foreground/70 leading-relaxed text-lg font-light">
                    {partner.description}
                  </p>
                </div>
              </div>
              
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600/0 via-violet-500/40 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
