import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PropChain – Premium Fractional Real Estate in Dubai',
    template: '%s | PropChain',
  },
  description:
    'Invest in Dubai\'s most prestigious real estate from AED 500. Blockchain-powered fractional ownership with VARA compliance.',
  keywords: [
    'real estate tokenization',
    'Dubai property investment',
    'fractional ownership UAE',
    'VARA licensed',
    'blockchain real estate',
    'property tokens',
    'UAE real estate investment',
    'PropChain',
    'Dubai fractional property',
  ],
  authors: [{ name: 'PropChain' }],
  creator: 'PropChain',
  publisher: 'PropChain',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://propchain.ae',
    siteName: 'PropChain',
    title: 'PropChain – Premium Fractional Real Estate in Dubai',
    description:
      'Invest in Dubai\'s most prestigious real estate from AED 500. Blockchain-powered fractional ownership with VARA compliance.',
  },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="font-outfit antialiased bg-[#020617] text-white selection:bg-gold-500/30 selection:text-white noise-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
