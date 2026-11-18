'use client';

import { Clock, Luggage, Users } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { HOURLY_PACKAGES } from '@/content/pricing';
import { LOCALITIES, COVERAGE_DISCLAIMER } from '@/content/localities';
import { requestBookingSelection } from '@/components/sections/Services';

export default function LocalRides() {
  return (
    <section className="scroll-mt-16 bg-[#e8edf5] py-24 text-slate-950 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Local rides & hourly</p>
          <h2 className="mt-4 max-w-3xl font-[Manrope] text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
            Your Bangalore day, without the driving stress.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Meetings, shopping, family visits or a full day exploring the city. Choose the ride that fits your plans.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {HOURLY_PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-300 bg-white p-7 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.5)]">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                    <Clock className="h-4 w-4" /> {pkg.hours} hours · {pkg.kmIncluded} km
                  </p>
                  <span className="font-[Manrope] text-3xl font-bold tracking-tight">₹{pkg.price}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{pkg.note}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> Up to 5 pax (7-seater on request)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Luggage className="h-3.5 w-3.5" /> Luggage allowance confirmed per booking
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => requestBookingSelection({ tripType: 'HOURLY', serviceId: i === 0 ? 'local' : 'hourly' })}
                  className="mt-7 inline-flex min-h-11 w-fit items-center rounded-full bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Book {pkg.hours}-hour ride
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">We are confirming coverage across</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LOCALITIES.map((l) => (
                <span
                  key={l.id}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    l.covered ? 'border-blue-300 bg-blue-50 text-blue-800' : 'border-slate-300 bg-slate-50 text-slate-500'
                  }`}
                >
                  {l.name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">{COVERAGE_DISCLAIMER}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
