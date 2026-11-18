'use client';

import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { POPULAR_ROUTES } from '@/constants';
import { requestBookingSelection } from '@/components/sections/Services';

export default function PopularRoutes() {
  return (
    <section id="experience" className="scroll-mt-16 overflow-hidden bg-[#061226] py-24 sm:py-32">
      <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Popular escapes</p>
          <h2 className="section-title mt-4">A route for moments worth travelling.</h2>
          <p className="section-copy">Choose a familiar destination and begin an outstation request with it already filled in.</p>
          <div className="mt-8 grid gap-3">
            {POPULAR_ROUTES.map((route) => (
              <button
                key={route.to}
                type="button"
                onClick={() => requestBookingSelection({ tripType: 'OUTSTATION', destination: route.to })}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-left transition duration-300 hover:border-cyan-200/30 hover:bg-cyan-200/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <span>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">Bangalore to {route.to}</span>
                  <span className="mt-1 block text-sm text-slate-300">Typical road time {route.duration}</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-200 transition group-hover:border-cyan-200/40 group-hover:text-cyan-200">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a1b34] p-6 sm:min-h-[500px] sm:p-10">
            <div className="radial-grid absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(59,130,246,0.28),transparent_34%)]" />
            <svg viewBox="0 0 640 430" className="relative h-full w-full" aria-label="Illustrative route from pickup to destination">
              <path d="M72 328 C160 300, 127 128, 270 164 S340 352, 455 277 S496 99, 575 107" fill="none" stroke="rgba(103,232,249,0.15)" strokeWidth="20" strokeLinecap="round" />
              <path className="route-dash" d="M72 328 C160 300, 127 128, 270 164 S340 352, 455 277 S496 99, 575 107" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
              <circle cx="72" cy="328" r="11" fill="#67e8f9" /><circle cx="575" cy="107" r="11" fill="#f8fafc" /><circle cx="308" cy="236" r="7" fill="#3b82f6" className="animate-pulse" />
            </svg>
            <div className="absolute bottom-7 left-7 rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-xs backdrop-blur">
              <p className="font-bold uppercase tracking-[0.16em] text-cyan-200">Journey signal</p>
              <p className="mt-1 text-slate-300">Route duration and fare are confirmed by the operator.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
