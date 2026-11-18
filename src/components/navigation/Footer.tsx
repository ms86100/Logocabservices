'use client';

import { Car } from 'lucide-react';
import { BRAND, CONTACT } from '@/content/brand';
import { whatsappLink } from '@/content/brand';

export default function Footer() {
  const quickLinks = [
    { label: 'Journeys', href: '#journeys' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Why us', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Track a booking', href: '/lookup' },
  ];
  const services = ['Airport Transfers', 'Local & Hourly Rides', 'Outstation Trips', 'Self-Drive Rentals', 'Driver on Hire', 'Group & Tempo Traveller'];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{BRAND.shortName}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {BRAND.tagline}
              <br />
              Bangalore airport transfers, hourly rides, outstation journeys and rentals.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-white transition-colors">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink('Hi, I would like to talk to the LOGO CAB SERVICES team about a booking.')} target="_blank" rel="noopener" className="hover:text-white transition-colors">
                  WhatsApp us
                </a>
              </li>
              <li>{CONTACT.address.line1}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Bookings are confirmed by our team - a submitted request is not a guaranteed allocation.
          </p>
        </div>
      </div>
    </footer>
  );
}
