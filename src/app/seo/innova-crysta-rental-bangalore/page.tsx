import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Innova Crysta Rental in Bangalore',
  description:
    'Book an Innova Crysta (7-seater MPV) in Bangalore for family travel, airport transfers and outstation trips. Comfortable, spacious and suitable for luggage.',
};

export default function InnovaCrysta() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">7-seater comfort</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Innova Crysta rental in Bangalore</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          A comfortable 7-seater for family journeys, airport transfers and outstation trips - more space than a sedan without the
          bulk of a Tempo Traveller.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'Passengers', v: 'Up to 7' },
            { k: 'Best for', v: 'Family & outstation' },
            { k: 'Luggage', v: 'Comfortable space' },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{x.k}</p>
              <p className="mt-2 font-[Manrope] text-xl font-semibold text-cyan-200">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=AIRPORT&service=airport" className="btn-primary">Book a 7-seater</Link>
          <Link href="/seo/tempo-traveller-rental-bangalore" className="btn-secondary">Tempo Traveller instead</Link>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          Specific model availability (e.g. Innova Crysta) is confirmed by the operator per booking.
        </p>
      </div>
    </main>
  );
}
