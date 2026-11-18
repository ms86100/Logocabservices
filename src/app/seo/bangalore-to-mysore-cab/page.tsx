import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bangalore to Mysore Cab',
  description:
    'Comfortable Bangalore to Mysore cab, one-way or round-trip. Indicative distance ≈280 km (4-5 hrs). Package pricing and driver allowance confirmed before the journey.',
};

export default function BangaloreToMysore() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Bangalore to Mysore</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Bangalore to Mysore cab</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          A comfortable road to Mysore - palaces, gardens and heritage. One-way or round-trip, in a 5-seater, 7-seater or
          Tempo Traveller for groups. Distance is indicative; final fare, tolls and driver allowance are confirmed before you travel.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Indicative distance', v: '≈280 km' },
            { k: 'Indicative drive time', v: '4-5 hrs' },
            { k: 'Options', v: 'One-way & round-trip' },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{x.k}</p>
              <p className="mt-2 font-[Manrope] text-2xl font-semibold text-cyan-200">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=OUTSTATION&service=outstation&destination=Mysore" className="btn-primary">
            Book Bangalore to Mysore
          </Link>
          <Link href="/seo/bangalore-outstation-cab-service" className="btn-secondary">All outstation routes</Link>
        </div>
      </div>
    </main>
  );
}
