import { Globe, Mail } from 'lucide-react';
import { WhatsappIcon, TelegramIcon, SlackIcon } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';

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
				<div className="mt-16">
					<Card className="bg-card/80 backdrop-blur-sm">
						<CardContent className="p-8">
							<div className="grid grid-cols-2 place-items-center gap-8 md:grid-cols-5">
								{channels.map((channel) => (
									<div
										key={channel.name}
										className="flex flex-col items-center gap-2 text-center"
									>
										<channel.icon className="h-10 w-10 text-blue-200" />
										<span className="text-sm font-medium text-foreground/90">
											{channel.name}
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
