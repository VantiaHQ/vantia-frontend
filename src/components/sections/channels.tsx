import { Globe, Mail } from 'lucide-react';
import { WhatsappIcon, TelegramIcon, SlackIcon } from '@/components/Icons';

const channels = [
	{ name: 'Web', icon: Globe },
	{ name: 'Whatsapp', icon: WhatsappIcon },
	{ name: 'Slack', icon: SlackIcon },
	{ name: 'Telegram', icon: TelegramIcon },
	{ name: 'Email', icon: Mail },
];

export default function Channels() {
	return (
		<section id="channels" className="relative py-20 sm:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/canales.webp')" }}>
			<div className="absolute inset-0 bg-black/70"></div>
			<div className="container mx-auto px-6 relative z-10">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
						Canales de Integración
					</h2>
					<p className="mt-4 text-lg leading-8 text-foreground/80">
						Conecta con tus clientes estén donde estén.
					</p>
				</div>
                {/* --- NEW RESPONSIVE LAYOUT --- */}
				<div className="mx-auto mt-16">
                    <div className="grid grid-cols-1 gap-8 max-w-[160px] mx-auto md:max-w-none md:grid-cols-5">
						{channels.map((channel) => (
							<div
								key={channel.name}
								className="flex flex-row items-center gap-4 md:flex-col md:gap-2"
							>
								<channel.icon className="h-10 w-10 text-blue-200" />
								<span className="font-medium text-foreground/90 text-lg md:text-sm">
									{channel.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
