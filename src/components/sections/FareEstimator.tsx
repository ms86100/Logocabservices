'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { HOURLY_PACKAGES, FARE_DISCLAIMER } from '@/content/pricing';
import { requestBookingSelection } from '@/components/sections/Services';

export default function FareEstimator() {
  const [pkgId, setPkgId] = useState(HOURLY_PACKAGES[0].id);
  const pkg = HOURLY_PACKAGES.find((p) => p.id === pkgId) ?? HOURLY_PACKAGES[0];

  return (
    <section className="bg-[#030712] py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Fare reference</p>
            <h2 className="section-title mt-4">A fare you can understand before you book.</h2>
            <p className="section-copy">
              We publish reference pricing only. Anything not yet confirmed by the operator is clearly marked, so nothing is
              presented as a price you can rely on.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-[#071225] p-7 sm:p-10">
            <div className="flex flex-wrap gap-3">
              {HOURLY_PACKAGES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPkgId(p.id)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    p.id === pkg.id
                      ? 'bg-cyan-200 text-slate-950'
                      : 'border border-white/15 text-slate-300 hover:border-cyan-200/40 hover:text-white'
                  }`}
                >
                  {p.hours} hours / {p.kmIncluded} km
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Package reference</p>
                <p className="mt-2 font-[Manrope] text-4xl font-bold text-white">
                  ₹{pkg.price}
                  <span className="ml-2 text-sm font-semibold text-slate-400">
                    {pkg.hours} hrs · {pkg.kmIncluded} km
                  </span>
                </p>
                <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-400">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-200" />
                  {!pkg.verified ? pkg.note : 'Confirmed reference price.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">What may apply</p>
                <ul className="mt-3 space-y-1.5 text-xs leading-5 text-slate-300">
                  <li>· Additional km beyond {pkg.kmIncluded} (rate to be confirmed)</li>
                  <li>· Additional hour beyond {pkg.hours} hrs (rate to be confirmed)</li>
                  <li>· Tolls, parking and night charges, where applicable</li>
                  <li>· Driver allowance for outstation journeys</li>
                </ul>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">{FARE_DISCLAIMER}</p>
            <button
              type="button"
              onClick={() => requestBookingSelection({ tripType: 'HOURLY', serviceId: pkg.hours === 4 ? 'local' : 'hourly' })}
              className="btn-primary mt-6"
            >
              Book this package
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
