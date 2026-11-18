import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/content/brand';
import { SERVICES } from '@/constants';

export const metadata: Metadata = {
  title: 'Cab Service in Bangalore - LOGO CAB SERVICES',
  description:
    'Cab service in Bangalore for airport transfers, hourly city rides, outstation trips, self-drive and driver-on-hire. Transparent fares and real human booking assistance.',
};

export default function CabServiceBangalore() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Bangalore cab service</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Cab service in Bangalore, planned around your journey.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          {BRAND.name} is a Bangalore-based cab booking service for airport transfers, local and hourly city rides, outstation
          journeys, self-drive rentals and driver-on-hire. Fares and availability are confirmed with you before the journey - no
          last-minute surprises.
        </p>

        <h2 className="mt-14 font-[Manrope] text-2xl font-semibold">Services in Bangalore</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="font-[Manrope] text-lg font-semibold text-cyan-200">{s.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book" className="btn-primary">Book your ride</Link>
          <Link href="/seo/airport-taxi-bangalore" className="btn-secondary">Airport taxi in Bangalore</Link>
          <Link href="/seo/bangalore-outstation-cab-service" className="btn-secondary">Outstation cabs</Link>
        </div>

        <p className="mt-10 text-xs leading-5 text-slate-500">
          Availability, exact fares, tolls, driver allowance and operating hours are confirmed by the operator before each booking.
          Service coverage across specific Bangalore localities is being verified.
        </p>
      </div>
    </main>
  );
}
