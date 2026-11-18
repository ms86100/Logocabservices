'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQS } from '@/constants';

export default function FAQ() { const [open, setOpen] = useState(0); return <section id="faq" className="scroll-mt-16 bg-[#061226] py-24 sm:py-32"><div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Good to know</p><h2 className="section-title mt-4">Questions, answered with clarity.</h2><p className="section-copy">Need something more specific? Include it in your booking request and the operator can discuss the details with you.</p></div><div className="divide-y divide-white/10 border-y border-white/10">{FAQS.map((faq, index) => <div key={faq.question}><button type="button" onClick={() => setOpen(index === open ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="font-[Manrope] text-lg font-semibold tracking-[-0.03em] text-white">{faq.question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-cyan-200 transition-transform ${open === index ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-sm leading-6 text-slate-300">{faq.answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>; }
