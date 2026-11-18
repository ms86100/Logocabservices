'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';

const ease = [0.22, 0.8, 0.2, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="film-grain relative isolate min-h-[780px] overflow-hidden bg-[#020611] text-white sm:min-h-[820px]">
      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=92" alt="Black performance car on an open road" fetchPriority="high" className="absolute inset-0 h-full w-full scale-105 object-cover object-[61%_center] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.97)_0%,rgba(2,6,17,0.82)_34%,rgba(2,6,17,0.13)_78%,rgba(2,6,17,0.68)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,6,17,0.98)_0%,transparent_43%,rgba(2,6,17,0.2)_100%)]" />
      <div className="light-sweep absolute -left-1/4 top-[10%] h-[125%] w-1/3 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-3xl" />
      <div className="radial-grid absolute -right-16 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-50" />
      <div className="absolute right-[13%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_4px_rgba(103,232,249,0.7)]" />
      <div className="absolute right-[20%] top-[59%] h-1 w-1 rounded-full bg-white/70" />
      <div className="absolute right-[42%] top-[20%] h-1 w-1 rounded-full bg-cyan-200/70" />

      <div className="container relative flex min-h-[780px] flex-col justify-end pb-16 pt-36 sm:min-h-[820px] sm:pb-20 lg:pb-24">
        <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="eyebrow flex items-center gap-3"><span className="h-px w-9 bg-cyan-300" />Every journey deserves better</motion.p>
        <div className="mt-5 max-w-4xl overflow-hidden">
          {['Your Journey.', 'Your Time.', 'Your Way.'].map((line, index) => <motion.h1 key={line} initial={reduceMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + index * 0.11, ease }} className="font-[Manrope] text-[3.45rem] font-semibold leading-[0.91] tracking-[-0.075em] text-white sm:text-7xl md:text-8xl lg:text-[7.4rem]">{line}</motion.h1>)}
        </div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }} className="mt-8 max-w-xl">
          <p className="text-base leading-7 text-slate-200 sm:text-lg">From seamless airport transfers to spontaneous city rides and unforgettable outstation journeys. Travel on your terms.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="#book" className="btn-primary group">Book Your Journey <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a><a href="#fleet" className="btn-secondary">Explore Our Fleet <ArrowDownRight className="h-4 w-4" /></a></div>
        </motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-slate-300"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Bangalore requests</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Vehicle preference</span><span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-cyan-300" />Tell us the journey</span></motion.div>
      </div>

      <motion.div initial={reduceMotion ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }} className="absolute bottom-14 right-5 hidden w-48 border-l border-white/20 pl-4 text-xs text-slate-300 lg:block"><p className="font-semibold uppercase tracking-[0.18em] text-cyan-200">Cinematic fallback</p><p className="mt-2 leading-5">Layered automotive photography, built intentionally for every device.</p></motion.div>
    </section>
  );
}
