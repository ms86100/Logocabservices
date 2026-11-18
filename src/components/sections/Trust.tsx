'use client';

import { Check, Clock, MapPin, MessageCircle, ShieldCheck, Ticket } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { OPERATIONAL } from '@/content/brand';

const FLOW = [
  { icon: Ticket, title: 'You submit a request', copy: 'A booking reference is generated. This is a request, not yet a confirmed cab.' },
  { icon: Clock, title: 'We review availability', copy: 'Our team checks the route, vehicle and timing before confirming.' },
  { icon: MapPin, title: 'Pickup is coordinated', copy: 'You receive clear pickup details, and a driver is assigned where confirmed.' },
  { icon: MessageCircle, title: 'You are kept informed', copy: 'Status updates by phone or WhatsApp, including how cancellations are handled.' },
];

const POLICIES = [
  {
    title: 'Cancellations & reschedules',
    copy: 'Changes are possible while a ride has not been assigned. Confirm timing with our team; exact cancellation terms are confirmed per booking.',
    needsOperator: true,
  },
  {
    title: 'Extra charges',
    copy: 'Tolls, parking, night charges, extra kilometres and driver allowance are agreed with you before the journey - no surprise charges on the day.',
    needsOperator: false,
  },
  {
    title: 'Availability & punctuality',
    copy: 'We confirm availability case by case. We do not promise guaranteed punctuality or availability that the business cannot operationally support.',
    needsOperator: false,
  },
];

export default function Trust() {
  return (
    <section id="trust" className="scroll-mt-16 bg-[#e8edf5] py-24 text-slate-950 sm:py-32">
      <div className="container">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">How booking works</p>
          <h2 className="mt-4 max-w-3xl font-[Manrope] text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
            Clear at every step, from request to ride.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {FLOW.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-slate-300 bg-white p-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.5)]">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-bold tracking-[0.16em] text-blue-700">0{i + 1}</p>
                  <h3 className="mt-2 font-[Manrope] text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {POLICIES.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-300 bg-white p-6">
                <h3 className="flex items-center gap-2 font-[Manrope] text-lg font-semibold">
                  <ShieldCheck className="h-5 w-5 text-blue-700" />
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.copy}</p>
                {p.needsOperator && (
                  <p className="mt-3 text-xs font-semibold text-amber-700">
                    <Check className="mr-1 inline h-3 w-3" /> To be finalised by the operator before publishing.
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-slate-500">Support hours: {OPERATIONAL.availabilityHours}.</p>
        </Reveal>
      </div>
    </section>
  );
}
