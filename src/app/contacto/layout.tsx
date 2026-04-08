import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contacto',
};

export default function ContactoLayout({ children }: { children: ReactNode }) {
  return children;
}
