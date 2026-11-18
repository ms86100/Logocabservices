import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bangalore to Nandi Hills Cab',
  description:
    'Bangalore to Nandi Hills cab for a misty hill-station sunrise drive. Indicative distance ≈62 km. One-way and round-trip, pricing confirmed before the trip.',
};

export default function NandiHills() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Hill station day trip</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Bangalore to Nandi Hills cab</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          A short, scenic drive from the Bangalore plains to the Nandi Hills. Ideal for sunrise views and a relaxed half-day or
          full-day outing. One-way or round-trip, in a vehicle that suits your group.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Indicative distance', v: '≈62 km' },
            { k: 'Indicative drive time', v: 'about 2 hrs' },
            { k: 'Options', v: 'One-way & round-trip' },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{x.k}</p>
              <p className="mt-2 font-[Manrope] text-2xl font-semibold text-cyan-200">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=OUTSTATION&service=outstation&destination=Nandi%20Hills" className="btn-primary">
            Book Bangalore to Nandi Hills
          </Link>
          <Link href="/seo/bangalore-outstation-cab-service" className="btn-secondary">All outstation routes</Link>
        </div>
      </div>
    </main>
  );
}
