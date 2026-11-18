import type { Metadata } from 'next';
import Link from 'next/link';
import { LOCALITIES, COVERAGE_DISCLAIMER } from '@/content/localities';

export const metadata: Metadata = {
  title: 'Bangalore Local Cab Rental',
  description:
    'Local cab rental in Bangalore for commutes, shopping and city days. Choose a ride that fits your plans, with coverage across major localities being confirmed.',
};

export default function LocalCab() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Local city travel</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Bangalore local cab rental</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Your Bangalore day, without the driving stress. Meetings, shopping, family visits or a full day around the city - choose a
          comfortable ride that fits your plans.
        </p>
        <h2 className="mt-14 font-[Manrope] text-2xl font-semibold">Localities we are confirming</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {LOCALITIES.map((l) => (
            <span key={l.id} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              {l.name}
            </span>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-5 text-slate-500">{COVERAGE_DISCLAIMER}</p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=HOURLY&service=local" className="btn-primary">Book a local ride</Link>
          <Link href="/seo/bangalore-hourly-cab-booking" className="btn-secondary">Hourly cab booking</Link>
        </div>
      </div>
    </main>
  );
}
