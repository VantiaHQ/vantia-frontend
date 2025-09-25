'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect, useRef } from 'react';
import VantiaLogo from '@/components/vantia-logo';


const navLinks = [
	{ name: 'Agente Modular', href: '#agente-modular' },
	{ name: 'Caso de Estudio', href: '#case-study' },
	{ name: 'Consultoría IA', href: '#consultoria-ia' },
	{ name: 'Filosofía', href: '#philosophy' },
];

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const headerRef = useRef<HTMLDivElement>(null);
	const [dropdownTop, setDropdownTop] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	   useEffect(() => {
		   if (isMobileMenuOpen && headerRef.current) {
			   setDropdownTop(headerRef.current.getBoundingClientRect().bottom + window.scrollY);
		   }
	   }, [isMobileMenuOpen]);

	   return (
			  <header
				  className={`sticky top-0 z-50 w-full px-2 md:px-8 left-0 transition-all duration-300 ${
					  isScrolled
						  ? 'bg-background/80 shadow-md backdrop-blur-md'
						  : 'bg-transparent'
				  }`}
				  style={{ left: 0, right: 0 }}
			  >
				  {/* Main bar: logo and button only on md and down */}
				  <div ref={headerRef} className="flex h-24 items-center justify-between px-6 max-w-none w-full mx-0">
				   <Link href="/" className="flex items-center gap-2">
					   <VantiaLogo />
				   </Link>
				   <div className="hidden items-center gap-6 lg:flex">
					   {navLinks.map((link) => (
						   <Link
							   key={link.name}
							   href={link.href}
							   className="text-md font-medium text-foreground/80 transition-colors hover:text-primary"
						   >
							   {link.name}
						   </Link>
					   ))}
				   </div>
				   <Button asChild className="bg-accent text-white text-sm font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow hover:border-primary">
					   <Link href="#contact">Contáctanos</Link>
				   </Button>
			   </div>
			   {/* Subbar for navLinks on md only, hamburger menu for sm */}
			   <div className="hidden md:flex w-full items-center justify-center gap-4 bg-background/80 border-t border-border py-2 px-4 lg:hidden">
				   {navLinks.map((link) => (
					   <Link
						   key={link.name}
						   href={link.href}
						   className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
					   >
						   {link.name}
					   </Link>
				   ))}
			   </div>
			   {/* Hamburger menu for small screens, centered and always visible links */}
			   <div className="flex md:hidden w-full items-center justify-center px-4 bg-background/80 border-t border-border py-2 lg:hidden relative z-30">
				   {!isMobileMenuOpen && (
                       <button
                           className="rounded-full bg-background border border-border p-2 shadow hover:bg-accent/20 transition z-50 flex items-center justify-center"
                           onClick={() => setIsMobileMenuOpen((v) => !v)}
                           aria-label="Abrir menú"
                           type="button"
                       >
                           <Menu className="h-7 w-7" />
                       </button>
                   )}
				   {isMobileMenuOpen && (
					   <div className="fixed left-0 right-0 z-40 flex flex-col items-center" style={{ top: dropdownTop }}>
						   {/* Overlay, but leave space for the button */}
						   <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[-1] pointer-events-auto" style={{top:0}} onClick={()=>setIsMobileMenuOpen(false)} />
						   <div className="w-full flex flex-col items-center">
							   {/* Botón cerrar centrado arriba */}
							   <button
								   className="mt-2 mb-2 rounded-full bg-background border border-border p-2 shadow hover:bg-accent/20 transition z-50 mx-auto block"
								   onClick={() => setIsMobileMenuOpen(false)}
								   aria-label="Cerrar menú"
								   type="button"
							   >
								   <X className="h-7 w-7" />
							   </button>
							   <nav className="flex flex-col gap-4 items-center w-full bg-background/95 border-b border-border shadow-xl py-4 transition-all duration-300 ease-out translate-y-[-16px] opacity-0 animate-[fadeInDown_0.25s_ease-out_forwards]">
								   {navLinks.map((link) => (
									   <Link
										   key={link.name}
										   href={link.href}
										   className="text-base font-medium text-foreground/90 transition-colors hover:text-primary py-2 w-full text-center"
										   onClick={() => setIsMobileMenuOpen(false)}
									   >
										   {link.name}
									   </Link>
								   ))}
							   </nav>
						   </div>
					   </div>
				   )}
			   </div>
		   </header>
	);
}