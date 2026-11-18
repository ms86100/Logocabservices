import type { Metadata } from 'next';
import Link from 'next/link';
import { DESTINATIONS } from '@/content/destinations';

export const metadata: Metadata = {
  title: 'Bangalore Outstation Cab Service',
  description:
    'Outstation cab service from Bangalore to Mysore, Coorg, Nandi Hills, Adiyogi and more. One-way and round-trip, with vehicle choice and confirmed pricing before you travel.',
};

export default function OutstationPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Outstation journeys</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Bangalore outstation cab service
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Make the journey part of the holiday. One-way or round-trip outstation cabs to the destinations Bangaloreans love, with a
          vehicle that fits your group. Tolls, driver allowance and final fare are confirmed before the trip.
        </p>

        <h2 className="mt-14 font-[Manrope] text-2xl font-semibold">Popular outstation destinations</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <div key={d.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="font-[Manrope] text-lg font-semibold text-cyan-200">{d.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{d.region}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{d.blurb}</p>
              {d.distanceKm && (
                <p className="mt-3 text-xs text-slate-400">
                  ≈{d.distanceKm} km{d.verified ? '' : ' (indicative)'}
                  {d.driveTime ? ` · ${d.driveTime}` : ''}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=OUTSTATION&service=outstation" className="btn-primary">Book an outstation trip</Link>
          <Link href="/seo/bangalore-to-mysore-cab" className="btn-secondary">Bangalore to Mysore</Link>
          <Link href="/seo/bangalore-to-coorg-cab" className="btn-secondary">Bangalore to Coorg</Link>
        </div>
      </div>
    </main>
  );
}
