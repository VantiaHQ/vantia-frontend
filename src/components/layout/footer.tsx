import Link from 'next/link';
import Image from 'next/image';
import { columnOneLinks, footerText } from '@/components/layout/footer.content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-6 pt-12 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/images/logo-negativo-color.png"
                alt="Vantia Logo"
                width={200}
                height={33}
                className="mb-4 cursor-target"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-white tracking-wider">{footerText.solutionsTitle}</h3>
              <ul className="space-y-3">
                {columnOneLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="cursor-target text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-semibold text-white tracking-wider">{footerText.contactTitle}</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contacto" className="cursor-target text-foreground/70 hover:text-primary transition-colors">
                    {footerText.contactLinkText}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-8 border-t border-border/50 text-center text-sm text-foreground/70">
          <p>&copy; {currentYear} {footerText.copyrightPrefix} <a href={footerText.designerHref} className="hover:text-primary transition-colors">{footerText.designerName}</a></p>
        </div>
      </div>
    </footer>
  )
};
