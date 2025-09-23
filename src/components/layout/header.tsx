'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
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

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 w-full transition-all duration-300 ${
				isScrolled
					? 'bg-background/80 shadow-md backdrop-blur-md'
					: 'bg-transparent'
			}`}
		>
			<div className="container mx-auto flex h-20 items-center justify-between px-6">
				<Link href="/" className="flex items-center gap-2">
					<VantiaLogo />
				</Link>
				<nav className="hidden items-center gap-6 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
						>
							{link.name}
						</Link>
					))}
				</nav>
				<div className="hidden items-center gap-4 md:flex">
					<Button asChild className="bg-accent text-neutral-900 hover:text-white hover:shadow-[0_0_16px_3px_rgba(255,255,255,0.18)] transition-colors">
						<Link href="#contact">Contáctanos</Link>
					</Button>
				</div>
				<div className="md:hidden">
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Abrir menú</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<div className="flex h-full flex-col p-6">
								<Link
									href="/"
									className="mb-8 flex items-center justify-between"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									<VantiaLogo />
								</Link>
								<nav className="flex flex-col gap-6">
									{navLinks.map((link) => (
										<Link
											key={link.name}
											href={link.href}
											className="text-lg font-medium text-foreground transition-colors hover:text-primary"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											{link.name}
										</Link>
									))}
								</nav>
								<Button asChild className="mt-auto bg-accent text-neutral-900 hover:text-white hover:shadow-[0_0_16px_3px_rgba(255,255,255,0.18)] transition-colors">
									<Link
										href="#contact"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Contáctanos
									</Link>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
