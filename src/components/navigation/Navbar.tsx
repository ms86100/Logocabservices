'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CarFront, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [{ label: 'Journeys', href: '#journeys' }, { label: 'Fleet', href: '#fleet' }, { label: 'Experience', href: '#experience' }, { label: 'FAQ', href: '#faq' }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 32); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${scrolled ? 'border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl' : 'bg-gradient-to-b from-black/55 to-transparent'}`}><nav className="container flex h-20 items-center justify-between"><a href="#top" aria-label="CityCab home" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-200/50 bg-cyan-200/10 text-cyan-200"><CarFront className="h-5 w-5" /></span><span className="font-[Manrope] text-lg font-semibold tracking-[-0.04em] text-white">CITYCAB</span></a><div className="hidden items-center gap-7 lg:flex">{links.map((link) => <a key={link.href} href={link.href} className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 transition hover:text-cyan-200">{link.label}</a>)}<a href="#book" className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.13em] text-white transition hover:border-cyan-200 hover:bg-cyan-200 hover:text-slate-950">Book now</a></div><button type="button" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></nav><AnimatePresence>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/10 bg-[#030712]/95 backdrop-blur-xl lg:hidden"><div className="container flex flex-col gap-1 py-5">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/10">{link.label}</a>)}<a href="#book" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-cyan-200 px-3 py-3 text-center text-sm font-bold text-slate-950">Book your journey</a></div></motion.div>}</AnimatePresence></header>;
}
