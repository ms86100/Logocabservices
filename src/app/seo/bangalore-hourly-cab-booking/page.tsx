import type { Metadata } from 'next';
import Link from 'next/link';
import { HOURLY_PACKAGES, FARE_DISCLAIMER } from '@/content/pricing';

export const metadata: Metadata = {
  title: 'Bangalore Hourly Cab Booking',
  description:
    'Book a cab by the hour in Bangalore. Reference packages: 4 hrs / 40 km and 8 hrs / 80 km. Confirm applicability and extras with our team before booking.',
};

export default function HourlyCab() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Hourly rentals</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Bangalore hourly cab booking</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Your car, your schedule. Keep a vehicle and driver available for your planned hours, with clear included kilometres.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {HOURLY_PACKAGES.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {p.hours} hours / {p.kmIncluded} km
              </p>
              <p className="mt-3 font-[Manrope] text-4xl font-bold text-cyan-200">₹{p.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{p.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-5 text-slate-500">{FARE_DISCLAIMER}</p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=HOURLY&service=hourly" className="btn-primary">Book an hourly cab</Link>
          <Link href="/seo/bangalore-local-cab-rental" className="btn-secondary">Local cab rental</Link>
        </div>
      </div>
    </main>
  );
}
