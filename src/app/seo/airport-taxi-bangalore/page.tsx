import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Airport Taxi in Bangalore - Kempegowda (BLR) Transfers',
  description:
    'Bangalore airport taxi service for Kempegowda International Airport (BLR) pickups and drops. Early morning and late-night journeys, with flight details and pickup coordination.',
};

export default function AirportTaxi() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Airport transfers</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Bangalore airport taxi - Kempegowda (BLR) pickup and drop
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Flights don&apos;t wait. Plan your airport pickup or drop-off with flight-number support, early-morning and late-night
          journeys, and clear pickup coordination. Fares, inclusions and any extra charges are confirmed before you travel.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {['Airport pickup (arrival)', 'Airport drop (departure)', 'Early morning & late night', 'Flight-detail support', 'Vehicle selection', 'Pickup coordination'].map((f) => (
            <li key={f} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-200">{f}</li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=AIRPORT&service=airport" className="btn-primary">Book an airport transfer</Link>
          <Link href="/seo/cab-service-bangalore" className="btn-secondary">All Bangalore cab services</Link>
        </div>
        <p className="mt-8 text-xs text-slate-500">Fare and 24/7 availability are confirmed by the operator per booking.</p>
      </div>
    </main>
  );
}
