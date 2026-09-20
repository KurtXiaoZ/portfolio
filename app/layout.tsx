import type { Metadata } from 'next';
import {
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
} from 'next/font/google';
import './globals.css';

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans-condensed',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Kurt Xiao | Senior Full-Stack Engineer',
  description:
    'Portfolio of Kurt Xiao, a senior full-stack engineer focused on thoughtful products and dependable systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable} ${ibmPlexSansCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
