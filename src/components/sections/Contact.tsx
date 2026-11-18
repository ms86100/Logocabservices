'use client';

import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { BRAND, CONTACT, whatsappLink } from '@/content/brand';

export default function Contact() {
  return (
    <section id="contact" className="film-grain relative isolate overflow-hidden bg-[#020611] py-28 sm:py-40">
      <img
        src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=2200&q=90"
        alt="Vehicle on a Bangalore street at dusk"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020611] via-[#020611]/80 to-[#020611]/25" />
      <div className="container relative">
        <p className="eyebrow">Talk to our team</p>
        <h2 className="mt-4 max-w-3xl font-[Manrope] text-5xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-7xl">
          Where will your next journey take you?
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-7 text-slate-200">{BRAND.supporting}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#book" className="btn-primary group">
            Plan Your Journey <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={whatsappLink('Hi, I have a question about a journey.')}
            target="_blank"
            rel="noopener"
            className="btn-secondary"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
          <a href={CONTACT.phoneHref} className="btn-secondary">
            <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
