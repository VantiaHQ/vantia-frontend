import { Globe, Mail } from 'lucide-react';
import { WhatsappIcon, TelegramIcon, SlackIcon } from '@/components/icons';

const channels = [
	{ name: 'Web', icon: Globe },
	{ name: 'Whatsapp', icon: WhatsappIcon },
	{ name: 'Telegram', icon: TelegramIcon },
	{ name: 'Email', icon: Mail },
	{ name: 'Slack', icon: SlackIcon },
];

export default function Channels() {
	return (
		<section id="channels" className="bg-[#070916] py-20 sm:py-28">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-blue-200 sm:text-4xl">
						Canales de Integración
					</h2>
					<p className="mt-4 text-lg leading-8 text-foreground/80">
						Conecta con tus clientes dondequiera que estén. Integramos nuestras
						 soluciones de IA en las plataformas que ya utilizas.
					</p>
				</div>
                {/* --- NEW RESPONSIVE LAYOUT --- */}
				<div className="mx-auto mt-16">
                    <div className="grid grid-cols-1 gap-8 max-w-[220px] mx-auto md:max-w-none md:grid-cols-5">
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
