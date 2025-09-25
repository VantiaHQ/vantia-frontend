import Link from 'next/link';
import VantiaLogo from '@/components/vantia-logo';
import { Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

const columnOneLinks = [
  { name: 'Agente Modular', href: '#agente-modular' },
  { name: 'Caso de Estudio', href: '#case-study' },
];

const columnTwoLinks = [
  { name: 'Consultoría IA', href: '#consultoria-ia' },
  { name: 'Filosofía', href: '#philosophy' },
];

const legalLinks = [
  { name: 'Política de Privacidad', href: '/privacidad' },
  { name: 'Términos de Servicio', href: '/terminos' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-6 pt-12 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Image
              src="/images/logo-negativo-color.png"
              alt="Vantia Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            {/* <div className="flex space-x-4">
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div> */}
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-white tracking-wider">Soluciones</h3>
              <ul className="space-y-3">
                {columnOneLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-white tracking-wider">Acerca de</h3>
              <ul className="space-y-3">
                {columnTwoLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-8 border-t border-border/50 text-center text-sm text-foreground/70">
          <p>&copy; {currentYear} Vantia AI Solutions. Todos los derechos reservados. Diseño: <a href="https://cokecancook.github.io/" className="hover:text-primary transition-colors">cokecancook</a></p>
        </div>
      </div>
    </footer>
  );
}