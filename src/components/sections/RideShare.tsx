'use client';

import { useState } from 'react';
import { Send, ShieldCheck, UsersRound } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { submitRideShare } from '@/lib/supabase/rideshare';

export default function RideShare() {
  const [role, setRole] = useState<'offering' | 'joining'>('joining');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const passengerVerification = Boolean(data.get('passengerVerification'));
    setError(undefined);
    if (!passengerVerification) {
      setError('You must confirm you are open to passenger verification and consent before submitting.');
      return;
    }
    try {
      await submitRideShare({
        role,
        customerName: String(data.get('customerName') || '').trim(),
        phoneNumber: String(data.get('phoneNumber') || '').trim(),
        pickupLocation: String(data.get('pickupLocation') || '').trim(),
        destination: String(data.get('destination') || '').trim() || undefined,
        journeyDate: String(data.get('journeyDate') || '').trim() || undefined,
        seatsAvailable: role === 'offering' ? Number(data.get('seatsAvailable')) || undefined : undefined,
        passengerVerification,
        consentSharesContact: Boolean(data.get('consentSharesContact')),
        notes: String(data.get('notes') || '').trim() || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit ride-share request.');
    }
  }

  return (
    <section id="rideshare" className="scroll-mt-16 bg-[#030712] py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="eyebrow">Sharing rides</p>
          <h2 className="section-title mt-4">Split the fare on a journey that fits your route.</h2>
          <p className="section-copy">
            Offer a spare seat or join an available journey. We never display fake availability - every match happens through our
            team, with safety and consent at the centre.
          </p>
          <div className="mt-6 grid gap-4">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-cyan-200" />
              <p className="text-sm leading-6 text-slate-300">
                <span className="font-semibold text-white">Passenger verification.</span> Participants confirm identity details before
                a journey is matched.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <UsersRound className="h-5 w-5 shrink-0 text-cyan-200" />
              <p className="text-sm leading-6 text-slate-300">
                <span className="font-semibold text-white">Consent to share contact.</span> Only when you opt in do we relay contact
                details between the parties.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="rounded-[2rem] border border-cyan-200/20 bg-cyan-200/5 p-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Request received</p>
              <h3 className="mt-3 font-[Manrope] text-2xl font-semibold text-white">Our team will review it.</h3>
              <p className="mt-3 text-sm text-slate-300">
                Thanks for your ride-share request. We confirm matches personally - there is no automatic or fake availability.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-[#071225] p-7 sm:p-9">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('offering')}
                  className={`rounded-2xl border p-4 text-left transition ${
                    role === 'offering' ? 'border-cyan-300 bg-cyan-200/10' : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <p className="font-semibold text-white">Offer a seat</p>
                  <p className="mt-1 text-xs text-slate-400">I have spare seats on my journey</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('joining')}
                  className={`rounded-2xl border p-4 text-left transition ${
                    role === 'joining' ? 'border-cyan-300 bg-cyan-200/10' : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <p className="font-semibold text-white">Join a ride</p>
                  <p className="mt-1 text-xs text-slate-400">I want to join an available journey</p>
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label">Your name</span>
                  <input name="customerName" required className="input" placeholder="Full name" />
                </label>
                <label className="block">
                  <span className="label">Phone</span>
                  <input name="phoneNumber" required inputMode="tel" className="input" placeholder="+91 98765 43210" />
                </label>
                <label className="block">
                  <span className="label">Pickup</span>
                  <input name="pickupLocation" required className="input" placeholder="Pickup point" />
                </label>
                <label className="block">
                  <span className="label">Destination</span>
                  <input name="destination" className="input" placeholder="Where you are headed" />
                </label>
                <label className="block">
                  <span className="label">Journey date</span>
                  <input name="journeyDate" type="date" className="input" />
                </label>
                {role === 'offering' && (
                  <label className="block">
                    <span className="label">Seats available</span>
                    <input name="seatsAvailable" type="number" min={1} max={11} className="input" placeholder="1-11" />
                  </label>
                )}
              </div>

              <label className="mt-5 flex items-start gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="passengerVerification"
                  className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-950 accent-cyan-300"
                />
                I am open to passenger verification and sharing my details with the ride provider / request.
              </label>
              <label className="mt-3 flex items-start gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="consentSharesContact"
                  className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-950 accent-cyan-300"
                />
                I consent to my contact being shared to complete this match.
              </label>

              {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

              <button type="submit" className="btn-primary mt-6 w-full">
                Submit ride-share request <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
