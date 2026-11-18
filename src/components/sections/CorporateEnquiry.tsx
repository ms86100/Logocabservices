'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { submitCorporate } from '@/lib/supabase/corporate';

const REQUEST_TYPES = [
  'Employee transportation',
  'Airport transfers',
  'Business meetings',
  'Regular vehicle arrangements',
  'Monthly billing discussion',
];

export default function CorporateEnquiry() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>();

  const toggle = (item: string) =>
    setSelected((prev) => (prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]));

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setError(undefined);
    try {
      await submitCorporate({
        companyName: String(data.get('companyName') || '').trim(),
        contactName: String(data.get('contactName') || '').trim(),
        email: String(data.get('email') || '').trim(),
        phoneNumber: String(data.get('phoneNumber') || '').trim(),
        requirements: [
          selected.join(', '),
          String(data.get('requirements') || '').trim(),
        ]
          .filter(Boolean)
          .join('\n') || undefined,
        monthlyBilling: selected.includes('Monthly billing discussion'),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit corporate enquiry.');
    }
  }

  return (
    <section id="corporate" className="scroll-mt-16 bg-[#061226] py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="eyebrow">Corporate & business travel</p>
          <h2 className="section-title mt-4">A dependable arrangement for your team, on your terms.</h2>
          <p className="section-copy">
            Tell us what your business needs. We do not assume billing or credit terms until they are agreed, so you get a clear
            answer instead of a vague promise.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {REQUEST_TYPES.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan-200/10 text-cyan-200">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Corporate billing or credit facilities are discussed and approved per account - not offered automatically.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="rounded-[2rem] border border-cyan-200/20 bg-cyan-200/5 p-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Enquiry received</p>
              <h3 className="mt-3 font-[Manrope] text-2xl font-semibold text-white">Our team will reach out.</h3>
              <p className="mt-3 text-sm text-slate-300">
                Thanks for the corporate enquiry. A member of our team will contact you about next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-[#071225] p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label">Company name</span>
                  <input name="companyName" required className="input" placeholder="Your company" />
                </label>
                <label className="block">
                  <span className="label">Contact name</span>
                  <input name="contactName" required className="input" placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="label">Phone</span>
                  <input name="phoneNumber" required inputMode="tel" className="input" placeholder="+91 98765 43210" />
                </label>
                <label className="block">
                  <span className="label">Email (optional)</span>
                  <input name="email" inputMode="email" className="input" placeholder="you@company.com" />
                </label>
              </div>

              <div className="mt-5">
                <span className="label">What do you need?</span>
                <div className="flex flex-wrap gap-2">
                  {REQUEST_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggle(t)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                        selected.includes(t)
                          ? 'bg-cyan-200 text-slate-950'
                          : 'border border-white/15 text-slate-300 hover:border-cyan-200/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-5 block">
                <span className="label">Anything else (optional)</span>
                <textarea name="requirements" className="input min-h-24 resize-y" placeholder="Number of employees, frequency, routes, etc." />
              </label>

              {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

              <button type="submit" className="btn-primary mt-6 w-full">
                Send corporate enquiry <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
