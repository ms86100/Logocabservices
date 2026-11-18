import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Driver on Hire in Bangalore',
  description:
    'Driver on hire in Bangalore - a professional, courteous driver for your own vehicle, for any journey. Availability confirmed before the trip.',
};

export default function DriverOnHire() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="container py-20">
        <p className="eyebrow">Your vehicle, our driver</p>
        <h1 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Driver on hire in Bangalore</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Need a professional driver for your own car? We arrange a courteous, experienced driver for your journey - local, airport
          or outstation. Tell us your vehicle and the journey, and we confirm availability.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { k: 'For', v: 'Your own vehicle' },
            { k: 'Driver', v: 'Professional & courteous' },
            { k: 'Journey', v: 'City, airport or outstation' },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{x.k}</p>
              <p className="mt-2 font-[Manrope] text-xl font-semibold text-cyan-200">{x.v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/#/book?trip=DRIVER_ON_HIRE&service=driver-on-hire" className="btn-primary">Request a driver</Link>
          <Link href="/seo/cab-service-bangalore" className="btn-secondary">All services</Link>
        </div>
      </div>
    </main>
  );
}
