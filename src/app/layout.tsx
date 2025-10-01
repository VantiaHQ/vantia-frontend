import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AgentConfigProvider } from '@/context/AgentConfigContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <AgentConfigProvider>
          {children}
          <Toaster />
        </AgentConfigProvider>
      </body>
    </html>
  );
}
