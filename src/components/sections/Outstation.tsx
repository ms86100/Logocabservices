'use client';

import { ArrowUpRight, Clock } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { DESTINATIONS } from '@/content/destinations';
import { OUTSTATION_PACKAGES, FARE_DISCLAIMER } from '@/content/pricing';
import { requestBookingSelection } from '@/components/sections/Services';

export default function Outstation() {
  return (
    <section id="outstation" className="scroll-mt-16 overflow-hidden bg-[#061226] py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Outstation journeys</p>
          <h2 className="section-title mt-4">Make the journey part of the holiday.</h2>
          <p className="section-copy">
            A comfortable, one-way or round-trip escape to the places Bangaloreans love to visit.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((dest, i) => {
            const pkg = OUTSTATION_PACKAGES.find((p) => p.destinationId === dest.id);
            return (
              <Reveal key={dest.id} delay={i * 0.05} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = '/icons/app-icon.svg';
                    }}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="relative p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{dest.region}</p>
                    <h3 className="mt-2 font-[Manrope] text-2xl font-semibold text-white">{dest.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{dest.blurb}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                      {dest.distanceKm && (
                        <span>
                          ≈{dest.distanceKm} km {dest.verified ? '' : '(indicative)'}
                        </span>
                      )}
                      {dest.driveTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {dest.driveTime}
                          {!dest.verified && ' (indicative)'}
                        </span>
                      )}
                    </div>
                    {pkg && !pkg.verified && (
                      <p className="mt-3 text-xs text-slate-400">Package pricing to be confirmed for this route.</p>
                    )}
                    <button
                      type="button"
                      onClick={() => requestBookingSelection({ tripType: 'OUTSTATION', serviceId: 'outstation', destination: dest.name })}
                      className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200 px-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      Book to {dest.name} <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-xs leading-5 text-slate-500">
            One-way and round-trip options available. Vehicle category, tolls, driver allowance and final fare are confirmed with
            you before the journey. {FARE_DISCLAIMER}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
