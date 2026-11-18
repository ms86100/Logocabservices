import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import '../globals.css';
import ServiceWorker from '@/components/ui/ServiceWorker';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CityCab - Premium Cab Booking & Travel Platform',
    template: '%s | CityCab',
  },
  description:
    'From airport transfers to hourly city rides and outstation journeys, travel comfortably with a premium booking experience designed around you.',
  openGraph: {
    title: 'CityCab - Your Journey. Your Time. Your Way.',
    description:
      'Premium cab booking: hourly rentals, airport transfers, outstation trips. Bangalore and beyond.',
    url: '/',
    siteName: 'CityCab',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
    title: 'CityCab',
  },
  icons: [
    { rel: 'icon', type: 'image/svg+xml', url: '/icons/app-icon.svg' },
    { rel: 'apple-touch-icon', type: 'image/svg+xml', url: '/icons/app-icon.svg' },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#030712',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="bg-white text-slate-900 antialiased font-[Inter]">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
