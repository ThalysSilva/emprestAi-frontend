import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Providers } from '@/providers';
import type { Metadata } from 'next';
import '../styles/globals.css';
import { Titillium_Web, Alfa_Slab_One } from 'next/font/google';
import { Menu } from '@/components/Menu';
import { cn } from '@/utils/tailwind/className';

export const metadata: Metadata = {
  description: 'Solicite seu empréstimo',
  title: 'Emprestaí',
};

const titillium = Titillium_Web({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-titillium',
  weight: ['200', '300', '400', '600', '700', '900'],
});

const alfaSlab = Alfa_Slab_One({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-alfa-slab',
  weight: ['400'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${titillium.variable} ${alfaSlab.variable} `}>
      <body>
        <Providers>
          <div className={cn('flex flex-col w-full', 'md:flex-row')}>
            <Menu />
            <main className="flex w-full flex-col items-center bg-background-primary min-h-screen">
              {children}
            </main>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
