import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Bruno from '@/components/sections/bruno/Bruno';
import Contact from '@/components/sections/contact/contact';
import Partners from '@/components/sections/home/Partners';
import TargetCursor from '@/components/ui/TargetCursor';

export const metadata: Metadata = {
  title: 'Bruno',
  description:
    'Bruno es el trabajador digital para administradores de fincas: atiende incidencias 24/7 por telefono y WhatsApp, recopila datos y los registra en tu software.',
  keywords: [
    'administradores de fincas',
    'gestion de incidencias',
    'asistente virtual para fincas',
    'atencion al vecino',
    'automatizacion despacho administracion de fincas',
    'Bruno Vantia',
  ],
  alternates: {
    canonical: '/bruno',
  },
  openGraph: {
    title: 'Bruno para Administradores de Fincas | Vantia',
    description:
      'Digitaliza la recepcion de incidencias de tu despacho con Bruno: atencion 24/7, captura inteligente de datos e integracion con tu gestion.',
    url: '/bruno',
    type: 'website',
  },
  twitter: {
    title: 'Bruno para Administradores de Fincas | Vantia',
    description:
      'Atiende incidencias y registra avisos automaticamente con Bruno, el trabajador digital para administradores de fincas.',
  },
};

export default function BrunoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 mt-[-80px]">
        <TargetCursor />
        <Bruno />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

