'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { BRAND, CONTACT, whatsappLink } from '@/content/brand';

const ease = [0.22, 0.8, 0.2, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="top" className="film-grain relative isolate min-h-[780px] overflow-hidden bg-[#020611] text-white sm:min-h-[820px]">
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=92"
        alt="Premium vehicle driving through a Bangalore street at dusk"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full scale-105 object-cover object-[61%_center] opacity-80"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.97)_0%,rgba(2,6,17,0.82)_34%,rgba(2,6,17,0.13)_78%,rgba(2,6,17,0.68)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,6,17,0.98)_0%,transparent_43%,rgba(2,6,17,0.2)_100%)]" />
      <div className="light-sweep absolute -left-1/4 top-[10%] h-[125%] w-1/3 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-3xl" />
      <div className="radial-grid absolute -right-16 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-50" />
      <div className="absolute right-[13%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_4px_rgba(103,232,249,0.7)]" />
      <div className="absolute right-[20%] top-[59%] h-1 w-1 rounded-full bg-white/70" />
      <div className="absolute right-[42%] top-[20%] h-1 w-1 rounded-full bg-cyan-200/70" />

      <div className="container relative flex min-h-[780px] flex-col justify-end pb-16 pt-36 sm:min-h-[820px] sm:pb-20 lg:pb-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-9 bg-cyan-300" />
          {BRAND.tagline}
        </motion.p>
        <div className="mt-5 max-w-4xl overflow-hidden">
          <motion.h1
            initial={reduceMotion ? false : { y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease }}
            className="font-[Manrope] text-[3.15rem] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl md:text-8xl lg:text-[6.5rem]"
          >
            {BRAND.headline}
          </motion.h1>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-8 max-w-xl"
        >
          <p className="text-base leading-7 text-slate-200 sm:text-lg">{BRAND.supporting}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#book" className="btn-primary group">
              {BRAND.primaryCta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={whatsappLink('Hi, I would like to talk to the team about a journey.')} target="_blank" rel="noopener" className="btn-secondary group">
              {BRAND.secondaryCta}
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-slate-300"
        >
          {BRAND.trustHighlights.map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              {t}
            </span>
          ))}
          <span className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-cyan-300" />
            {CONTACT.phoneDisplay}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
