'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { AppImages } from '@/lib/appImages';
import { Rocket } from 'lucide-react';

export default function hero() {

  return (
  <section className="relative mt-[-16px] w-full px-8 min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 dotted-bg">
  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-transparent z-10"></div>
  <div className="container mx-auto px-6 pt-12 lg:pt-0 relative h-full flex items-center max-w-[800px] lg:max-w-[1100px]">
            <div className="grid lg:grid-cols-2 items-start w-full min-h-[100vh] mt-[15vh] md:mt-[20vh]">
                <div className="text-center lg:text-left z-20">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-extrabold tracking-tight text-white/90 drop-shadow-[0_0_24px_rgba(139,92,246,0.3)] transition duration-300 ease-in-out">
            <span className="text-primary drop-shadow-[0_0_32px_rgba(139,92,246,0.2)]">Recupera tu tiempo</span> con IA.
          </h1>
                    <p className="mt-6 text-lg sm:text-xl md:text-2xl text-foreground/80">
                        Vantia optimiza tu tiempo y el de tu organización con soluciones de IA innovadoras, transformando la gestión de recursos en una ventaja competitiva.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Button
                          asChild
                          size="lg"
                          className="cursor-target group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white/90 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow"
                        >
                          <Link href="/contacto" className="transition duration-300 ease-in-out">
                            Habla con un experto <Rocket className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:animate-icon-pulse" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="secondary"
                          size="lg"
                          className="cursor-target bg-secondary text-white/90 font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow hover:border-primary"
                        >
                          <Link href="#case-study" className="transition duration-300 ease-in-out">Ver caso de éxito</Link>
                        </Button>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-start justify-center z-0 pt-32 lg:pt-8  lg:relative lg:h-full h-96 w-full">
          <Image
            src="/images/star-3d.png"
            alt="Estrella tridimensional flotante"
            width={600}
            height={600}
            className="object-contain animate-float-slow transition-transform duration-500 hover:scale-110 drop-shadow-[0_32px_128px_rgba(139,92,246,0.4)] pt-24 lg:pt-0 brightness-[70%] lg:brightness-110 lg:saturate-125 lg:opacity-100"
            data-ai-hint="3d star"
          />
                </div>
            </div>
        </div>
    </section>
  );
}

