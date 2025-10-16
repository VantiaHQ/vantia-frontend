import { Globe, Mail } from 'lucide-react';
import { WhatsappIcon, TelegramIcon, SlackIcon } from '@/components/Icons';

export const channelsContent = {
  title: "Canales de Integración",
  subtitle: "Conecta con tus clientes estén donde estén.",
  channels: [
    { name: 'Web', icon: Globe },
    { name: 'Whatsapp', icon: WhatsappIcon },
    { name: 'Slack', icon: SlackIcon },
    { name: 'Telegram', icon: TelegramIcon },
    { name: 'Email', icon: Mail },
  ]
};