import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Opt Wide Outside FF',
  description: 'Greatest Fantasy Football League',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider defaultColorScheme="dark">
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
