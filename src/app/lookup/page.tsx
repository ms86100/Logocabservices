'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Search, ShieldCheck } from 'lucide-react';
import { lookupBooking, STATUS_LABELS, type BookingStatusInfo } from '@/lib/supabase/lookup';

export default function LookupPage() {
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingStatusInfo | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setNotFound(false);
    setResult(null);
    try {
      const info = await lookupBooking(reference);
      if (info) setResult(info);
      else setNotFound(true);
    } catch {
      setError('Could not look up this reference right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] px-5 py-20 text-white">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">Booking status</p>
        <h1 className="mt-3 font-[Manrope] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Track your booking</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Enter the booking reference you received after submitting your request. Only status and journey details are shown - never
          other customers&apos; data.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={reference}
            onChange={(e) => setReference(e.target.value.toUpperCase())}
            placeholder="CC-XXXXXXXX"
            className="input flex-1"
            aria-label="Booking reference"
          />
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Looking up…' : 'Look up'} <Search className="h-4 w-4" />
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
        {notFound && (
          <p className="mt-4 flex items-start gap-2 text-sm text-slate-300">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
            No booking found for that reference. Check it matches exactly, or message us with your details.
          </p>
        )}

        {result && (
          <div className="mt-8 rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Booking reference</p>
            <p className="mt-1 font-[Manrope] text-2xl font-bold tracking-[0.1em]">{result.bookingReference}</p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-400">Status</dt>
                <dd className="mt-1 font-semibold text-white">
                  {STATUS_LABELS[result.status] ?? result.status}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Journey</dt>
                <dd className="mt-1 font-semibold text-white">
                  {result.tripType?.replace('_', ' ').toUpperCase()}
                  {result.serviceId ? ` · ${result.serviceId}` : ''}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Date</dt>
                <dd className="mt-1 font-semibold text-white">{result.bookingDate}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Vehicle</dt>
                <dd className="mt-1 font-semibold text-white">{result.vehicleType?.toUpperCase()}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
