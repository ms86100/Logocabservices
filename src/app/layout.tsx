import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import '../globals.css';
import ServiceWorker from '@/components/ui/ServiceWorker';
import { BRAND, CONTACT } from '@/content/brand';

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

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BRAND.name,
  description:
    'Airport transfers, hourly city rides, outstation journeys and self-drive rentals in Bangalore.',
  telephone: CONTACT.phoneDisplay,
  areaServed: 'Bangalore, Karnataka, India',
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cab booking in Bangalore',
  provider: { '@type': 'LocalBusiness', name: BRAND.name },
  serviceType: 'Airport transfer, hourly rental, outstation trip, self-drive and driver on hire',
  areaServed: 'Bangalore, Karnataka, India',
};

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} - ${BRAND.headline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    'Airport transfers, comfortable city rides, outstation journeys and convenient rentals in Bangalore. Transparent fares, professional drivers and real human booking assistance.',
  openGraph: {
    title: `${BRAND.name} - ${BRAND.headline}`,
    description: BRAND.supporting,
    url: '/',
    siteName: BRAND.name,
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
    title: BRAND.shortName,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
