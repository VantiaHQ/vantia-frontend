'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const navLinks = [
	{ name: 'Agente Modular', href: '/#agente-modular' },
	{ name: 'Generar Agente', href: '/generate-agent' },
	{ name: 'Consultoría IA', href: '/#consultoria-ia' },
	{ name: 'Filosofía', href: '/#philosophy' },
];

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isFooterReached, setIsFooterReached] = useState(false);
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
			setDropdownTop(headerRef.current.getBoundingClientRect().bottom);
		}
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const footerSection = document.getElementById('footer');
		if (!footerSection) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsFooterReached(entry.isIntersecting);
			},
			{ threshold: 0.1 } // Trigger when 10% of the section is visible
		);

		observer.observe(footerSection);

		return () => {
			observer.unobserve(footerSection);
		};
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 w-full px-2 md:px-8 left-0 transition-all duration-300 ${isScrolled ? 'bg-background/80 shadow-md backdrop-blur-md' : 'bg-transparent'} ${isFooterReached ? '-translate-y-full' : 'translate-y-0'}`}
			style={{ left: 0, right: 0 }}
		>
			<div ref={headerRef} className="flex h-[64px] lg:py-4 py-1 items-center justify-between px-2 lg:px-6 max-w-none w-full mx-0">
				<Link href="/" className="cursor-target">
					<Image
						src={isScrolled ? '/images/logo-negativo.png' : '/images/logo-negativo-color.png'}
						alt="Vantia Logo"
						width={156}
						height={48}
						className="transition-all duration-300 w-[156px] h-[48px]"
						priority						
					/>
				</Link>

				<div className="hidden items-center gap-6 lg:flex">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="cursor-target text-md font-medium text-foreground/80 transition-colors hover:text-primary"
						>
							{link.name}
						</Link>
					))}
				</div>
				<Button asChild className="cursor-target bg-accent text-white text-sm font-bold py-3 px-8 rounded-full shadow-lg border-2 border-transparent transition duration-300 ease-in-out hover:scale-105 hover:animate-shadow-glow hover:border-primary">
					<Link href="/contact">Contacto</Link>
				</Button>
			</div>
			<div className="hidden md:flex w-full items-center justify-center gap-4 bg-transparent mt-[-2px] pb-2 px-4 lg:hidden">
				{navLinks.map((link) => (
					<Link
						key={link.name}
						href={link.href}
						className="cursor-target text-md font-light text-foreground/80 transition-colors hover:text-primary tracking-widest"
					>
						{link.name}
					</Link>
				))}
			</div>
			<div className="flex md:hidden w-full items-center justify-center px-4 bg-transparent py-2 lg:hidden absolute left-0 z-30">
				{!isMobileMenuOpen && (
                    <button
                        className="cursor-target rounded-full bg-background/80 backdrop-blur-md border border-border p-2 shadow hover:bg-accent/20 transition z-50 flex items-center justify-center"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        aria-label="Abrir menú"
                        type="button"
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                )}
				{isMobileMenuOpen && (
					<div className="fixed left-0 right-0 z-40 flex flex-col items-center" style={{ top: dropdownTop, height: `calc(100vh - ${dropdownTop}px)` }}>
						{/* --- CORRECTED BLUR --- */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-[-1] pointer-events-auto" style={{top:0}} onClick={()=>setIsMobileMenuOpen(false)} />
						{/* --- CORRECTED BACKGROUND --- */}
                        <div className="w-full flex flex-col items-center bg-background/95">
							<button
								className="cursor-target mt-2 mb-2 rounded-full bg-background border border-border p-2 shadow hover:bg-accent/20 transition z-50 mx-auto block"
								onClick={() => setIsMobileMenuOpen(false)}
								aria-label="Cerrar menú"
								type="button"
							>
								<X className="h-7 w-7" />
							</button>
							<nav className="flex flex-col gap-4 items-center w-full bg-transparent border-b border-border shadow-xl py-4 transition-all duration-300 ease-out translate-y-[-16px] opacity-0 animate-[fadeInDown_0.25s_ease-out_forwards]">
								{navLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className="cursor-target text-base font-medium text-foreground/90 transition-colors hover:text-primary py-2 w-full text-center"
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