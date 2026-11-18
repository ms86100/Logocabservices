'use client';

import { Car } from 'lucide-react';
import Link from 'next/link';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CityCab</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium cab service in Bangalore.
              <br />
              Your journey. Your time. Your way.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Hourly Rentals</li>
              <li>Airport Transfers</li>
              <li>Outstation Trips</li>
              <li>Corporate Travel</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Support details to be configured</li>
              <li>Bangalore, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CityCab. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            This is a booking request platform — not a confirmed allocation service.
          </p>
        </div>
      </div>
    </footer>
  );
}
