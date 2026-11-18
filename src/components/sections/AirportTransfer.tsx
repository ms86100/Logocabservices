'use client';

import { Moon, Plane, PlaneLanding, PlaneTakeoff, Sunrise } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { AIRPORT_FARES, FARE_DISCLAIMER } from '@/content/pricing';
import { requestBookingSelection } from '@/components/sections/Services';

const highlights = [
	{ icon: PlaneLanding, title: 'Airport pickup', copy: 'We coordinate your arrival pickup, with flight details where you share them.' },
	{ icon: PlaneTakeoff, title: 'Airport drop', copy: 'A planned drop-off so you reach the terminal comfortably before departure.' },
	{ icon: Sunrise, title: 'Early morning journeys', copy: 'Red-eye arrivals and early departures, planned around your schedule.' },
	{ icon: Moon, title: 'Late-night journeys', copy: 'Late arrivals handled with the same pickup coordination.' },
];

export default function AirportTransfer() {
	return (
		<section id="airport" className="scroll-mt-16 overflow-hidden bg-[#061226] py-24 sm:py-32">
			<div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
				<Reveal>
					<p className="eyebrow">Airport transfers</p>
					<h2 className="section-title mt-4">Flights don&apos;t wait. Your plans shouldn&apos;t depend on last-minute cab availability.</h2>
					<p className="section-copy">
						Share your flight details and pickup point, and our team coordinates the journey before you land or need to leave.
					</p>
					<button
						type="button"
						onClick={() => requestBookingSelection({ tripType: 'AIRPORT', serviceId: 'airport' })}
						className="btn-primary mt-8"
					>
						Plan an airport transfer
					</button>
					<p className="mt-4 max-w-md text-xs leading-5 text-slate-500">{FARE_DISCLAIMER}</p>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="grid gap-4 sm:grid-cols-2">
						{highlights.map((item) => {
							const Icon = item.icon;
							return (
								<div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
									<span className="grid h-11 w-11 place-items-center rounded-full border border-cyan-200/20 bg-cyan-200/10 text-cyan-200">
										<Icon className="h-5 w-5" />
									</span>
									<h3 className="mt-4 font-[Manrope] text-lg font-semibold text-white">{item.title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</p>
								</div>
							);
						})}
					</div>

					<div className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-200/5 p-6">
						<p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Airport transfer fares</p>
						<ul className="mt-4 grid gap-3 sm:grid-cols-2">
							{AIRPORT_FARES.map((fare) => (
								<li key={fare.vehicleLabel} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
									<p className="font-semibold text-white">{fare.vehicleLabel}</p>
									<p className="mt-1 text-sm text-slate-300">
										{fare.verified && fare.startPrice ? `From ₹${fare.startPrice}` : 'Price to be confirmed'}
									</p>
									{!fare.verified && <p className="mt-1 text-xs text-slate-500">{fare.note}</p>}
								</li>
							))}
						</ul>
						<p className="mt-4 flex items-start gap-2 text-xs text-slate-400">
							<Plane className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-200" />
							What is included and what extra charges may apply (tolls, night charge) are confirmed with you before the journey.
						</p>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
