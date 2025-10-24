import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { coreModules, extraModules, agenteModularContent } from './AgenteModular.content';
import { FadeInSection } from '@/components/ui/fade-in-section';

export default function AgenteModular1Col() {
	return (
		<section id="agente-modular-1-col" className="bg-[#070916] py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-3xl text-left">
					<FadeInSection>
						<h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl max-w-full sm:max-w-xl font-extrabold tracking-tight text-white/90 mb-8 drop-shadow-[0_0_16px_rgba(80,200,255,0.3)]">
							{agenteModularContent.mainTitle}
						</h2>
					</FadeInSection>
					<FadeInSection>
						<p className="mt-4 text-lg sm:text-xl md:text-2xl leading-9 text-foreground/80">
							{agenteModularContent.mainParagraph}
						</p>
					</FadeInSection>
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
						{agenteModularContent.stats.map((stat, i) => (
							<FadeInSection key={i}>
								<div className="bg-blue-950/70 rounded-xl border border-blue-400/30 p-6 shadow-lg flex flex-col justify-center">
									<span className="text-4xl font-extrabold text-blue-200 mb-2">{stat.value}</span>
									<span className="text-blue-100/90 text-base">{stat.label}</span>
								</div>
							</FadeInSection>
						))}
					</div>
				</div>
				<FadeInSection>
					<div className="mx-auto w-full mt-14 mb-24 bg-background/80 rounded-xl shadow-lg p-0 border border-blue-400/20 overflow-hidden">
						<div className="flex flex-col">
							<div className="w-full">
								<img
									src="/images/workflow.png"
									alt="Agente n8n"
									className="w-full h-auto object-cover p-8"
								/>
							</div>
							<div className="flex flex-col md:flex-row items-center p-8">
								<div className="flex-1 md:pr-8">
									<div className="flex flex-col md:flex-row gap-8">
										<div className="flex-1">
											<span className="block text-base font-semibold text-blue-200 tracking-wide mb-1">
												{agenteModularContent.example.label}
											</span>
											<h3 className="text-2xl font-bold text-white/90 mb-2">
												{agenteModularContent.example.title}
											</h3>
											<p className="text-foreground/80">
												{agenteModularContent.example.paragraph}
											</p>
											<div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
												<Link href="/generar-agente" passHref>
													<Button asChild className="cursor-target bg-pink-500 hover:bg-pink-500 text-white/90 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/40 transition duration-300 ease-in-out hover:animate-shadow-glow">
														<span>{agenteModularContent.example.cta}</span>
													</Button>
												</Link>
											</div>
										</div>
										<div className="flex-1 md:border-l md:border-blue-400/20 md:pl-8">
											<span className="block text-base font-semibold text-blue-200 tracking-wide mb-2">
												{agenteModularContent.example.featuresLabel}
											</span>
											<ul className="space-y-3">
												{agenteModularContent.example.features.map((feature, i) => (
													<li key={i} className="grid grid-cols-[auto,1fr] items-start gap-3">
														<CheckCircle className="mt-2 h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
														<span className="text-blue-100/90">{feature}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</FadeInSection>
				<div className="grid gap-8 py-20 sm:py-28">
					<div>
						<FadeInSection>
							<span className="block text-5xl font-extralight uppercase text-blue-200/80 tracking-tighter mb-4">
								{agenteModularContent.coreModulesTitle}
							</span>
						</FadeInSection>
						<div className="grid grid-cols-1 gap-6">
							{coreModules.map((mod, i) => (
								<FadeInSection key={i}>
									<div
										className="group bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400/30 p-6 flex items-center gap-6 shadow-lg aspect-square w-[400px] mx-auto"
									>
										<mod.icon className="h-20 w-20 text-blue-200 drop-shadow-[0_0_18px_rgba(80,200,255,0.8)]" />
										<div>
											<div className="font-bold text-lg text-white/90 mb-1 text-left">
												{mod.title}
											</div>
											<div className="text-blue-100/90 text-left">
												{mod.description}
											</div>
										</div>
									</div>
								</FadeInSection>
							))}
						</div>
					</div>
					<div>
						<FadeInSection>
							<span className="block text-5xl font-extralight uppercase text-blue-200/80 tracking-tighter mb-4 mt-8">
								{agenteModularContent.extraModulesTitle}
							</span>
						</FadeInSection>
						<div className="grid grid-cols-1 gap-6">
							{extraModules.map((mod, i) => (
								<FadeInSection key={i}>
									<div
										className="group bg-blue-950/60 backdrop-blur rounded-xl border border-blue-400 p-6 flex items-center gap-6 shadow-lg shadow-blue-400/20 aspect-square"
									>
										<mod.icon className="h-20 w-20 text-blue-200 drop-shadow-[0_0_32px_rgba(80,200,255,1)]" />
										<div>
											<div className="font-bold text-lg text-white/90 mb-1 text-left">
												{mod.title}
											</div>
											<div className="text-blue-100/90 text-left">
												{mod.description}
											</div>
										</div>
									</div>
								</FadeInSection>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
