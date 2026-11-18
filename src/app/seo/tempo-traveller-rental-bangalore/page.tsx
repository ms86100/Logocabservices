import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tempo Traveller Rental in Bangalore',
  description:
    'Tempo Traveller rental in Bangalore for groups of up to 12 - family trips, team outings, events and outstation sightseeing. Availability confirmed per booking.',
};

export default function TempoTraveller() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Group travel</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Tempo Traveller rental in Bangalore</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Travel together comfortably. Our 12-seater Tempo Traveller suits family holidays, corporate outings, events and outstation
          group sightseeing, with extra luggage room.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Seats', v: 'Up to 12' },
            { k: 'Luggage', v: 'Extra room' },
            { k: 'Use cases', v: 'Family, team, events' },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{x.k}</p>
              <p className="mt-2 font-[Manrope] text-xl font-semibold text-cyan-200">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=OUTSTATION&service=group" className="btn-primary">Book a Tempo Traveller</Link>
          <Link href="/seo/innova-crysta-rental-bangalore" className="btn-secondary">Innova Crysta rental</Link>
        </div>
        <p className="mt-8 text-xs text-slate-500">Fare and availability are confirmed by the operator before allocation.</p>
      </div>
    </main>
  );
}
