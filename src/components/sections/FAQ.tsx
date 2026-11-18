'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import { useState } from 'react';
import { FAQS } from '@/constants';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-16 bg-[#061226] py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2 className="section-title mt-4">Questions, answered with clarity.</h2>
          <p className="section-copy">
            Where a policy depends on an operator decision, we say so instead of guessing. Need something specific? Include it in
            your booking request or ask us on WhatsApp.
          </p>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((faq, index) => (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpen(index === open ? -1 : index)}
                className="flex w-full items-center justify-between gap-5 py-5 text-left"
              >
                <span className="font-[Manrope] text-base font-semibold tracking-[-0.02em] text-white sm:text-lg">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-200 transition-transform ${open === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-5 text-sm leading-6 text-slate-300">{faq.answer}</p>
                    {faq.needsOperator && (
                      <p className="mb-5 flex items-start gap-2 text-xs leading-5 text-amber-300">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Finalised by the operator - please confirm with our team before relying on it.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
