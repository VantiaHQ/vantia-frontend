import Link from 'next/link';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { columnOneLinks, footerText } from './footer.content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Logo & Social Column */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              <Image
                src="/images/logo-negativo-color.png"
                alt="Vantia Logo"
                width={180}
                height={30}
                className="cursor-target"
              />
            </Link>
            <div className="flex items-center gap-4">
              <a 
                href={footerText.linkedinLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cursor-target text-foreground/40 hover:text-[#0a66c2] transition-colors"
                title="Sígenos en LinkedIn"
              >
                <Linkedin className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-24 lg:gap-32">
            {/* Soluciones Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white tracking-wider mb-2">{footerText.solutionsTitle}</h3>
              <ul className="space-y-2 text-sm">
                {columnOneLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="cursor-target text-foreground/70 hover:text-primary transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white tracking-wider mb-2">{footerText.contactTitle}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contacto?tab=booking" className="cursor-target text-foreground/70 hover:text-primary transition-colors block">
                    {footerText.contactLinkText}
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${footerText.email}`} className="cursor-target text-foreground/70 hover:text-primary transition-colors block">
                    {footerText.email}
                  </a>
                </li>
                <li className="text-foreground/50 pt-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-violet-500 rounded-full" />
                  {footerText.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-4 border-t border-border/50 text-center text-[10px] sm:text-xs text-foreground/50">
          <p>&copy; {currentYear} {footerText.copyrightPrefix} <a href={footerText.designerHref} className="hover:text-primary transition-colors">{footerText.designerName}</a></p>
        </div>
      </div>
    </footer>
  )
};
