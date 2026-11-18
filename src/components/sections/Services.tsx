'use client';

import { ArrowUpRight, Check, Clock3, Plane, Route, UsersRound } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { BOOKING_SERVICES } from '@/constants';
import type { CabCategory, TripType, VehicleType } from '@/types';

export type BookingSelection = {
  tripType: TripType;
  destination?: string;
  category?: CabCategory;
  vehicleType?: VehicleType;
};

const icons = {
  airport: Plane,
  outstation: Route,
  hourly: Clock3,
  group: UsersRound,
};

export function requestBookingSelection(selection: BookingSelection) {
  window.dispatchEvent(new CustomEvent<BookingSelection>('citycab:select-booking', { detail: selection }));
  const params = new URLSearchParams({ trip: selection.tripType });
  if (selection.destination) params.set('destination', selection.destination);
  if (selection.category) params.set('category', selection.category);
  if (selection.vehicleType) params.set('vehicle', selection.vehicleType);
  window.history.replaceState(null, '', `#book?${params.toString()}`);
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Services() {
  return (
    <section id="journeys" className="scroll-mt-16 overflow-hidden bg-[#030712] py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Choose your journey</p>
          <h2 className="section-title mt-4 max-w-4xl">One service for every kind of road ahead.</h2>
          <p className="section-copy max-w-2xl">Select the journey that fits your day. Our team will review availability and confirm the final cab allocation.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {BOOKING_SERVICES.map((service, index) => {
            const Icon = icons[service.id as keyof typeof icons] || Route;
            return (
              <Reveal key={service.id} delay={index * 0.08} className={index === 0 ? 'lg:row-span-1' : ''}>
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,20,38,0.96),rgba(4,10,24,0.96))] p-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-200/30 hover:shadow-[0_28px_90px_-48px_rgba(103,232,249,0.55)] sm:p-8">
                  <div className="radial-grid pointer-events-none absolute inset-0 opacity-30" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-300">0{index + 1}</span>
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{service.eyebrow}</p>
                    <h3 className="mt-3 font-[Manrope] text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{service.title}</h3>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">{service.description}</p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-slate-200">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan-200/10 text-cyan-200"><Check className="h-3 w-3" /></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => requestBookingSelection({ tripType: service.tripType, category: service.category, vehicleType: service.vehicleType })}
                      className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200 px-5 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      Request this journey <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs leading-5 text-slate-500">Service requests are subject to route, vehicle and operator availability.</p>
      </div>
    </section>
  );
}
