// Central brand configuration for LOGO CAB SERVICES.
// Values flagged `confirmed: false` are placeholders the operator must verify before launch.

export const BRAND = {
  name: 'LOGO CAB SERVICES',
  shortName: 'LOGO',
  tagline: 'Your Journey, Our Responsibility.',
  headline: 'Every Journey Deserves a Better Ride.',
  supporting:
    'Airport transfers, comfortable city rides, outstation adventures and convenient rentals. Whatever your destination, we make booking your journey simple.',
  primaryCta: 'Book Your Ride',
  secondaryCta: 'Talk to Our Team',
  trustHighlights: [
    'Transparent fare information',
    'Comfortable vehicle options',
    'Professional driver service',
    'Booking assistance',
  ],
} as const;

export const CONTACT = {
  phoneDisplay: '+91 77383 21817',
  phoneHref: 'tel:+917738321817',
  whatsappNumber: '7738321817', // as supplied by the operator
  whatsappHref: 'https://wa.me/917738321817',
  email: '', // operator to confirm
  address: { line1: 'Bangalore, Karnataka, India', line2: '' }, // exact office address to be confirmed
  hoursNote: 'Booking assistance hours to be confirmed by the operator.',
} as const;

export const OPERATIONAL = {
  availabilityHours: '24/7 availability - to be confirmed by the operator',
  childSeatAvailable: false, // operator to confirm
  gstInvoice: false, // operator to confirm
  insurance: 'Fleet insurance - to be confirmed by the operator',
  languageCapabilities: 'Drivers communicate in English; additional language capabilities to be confirmed.',
  corporateBilling: false, // operator to confirm
};

export function whatsappLink(message?: string) {
  const base = `${CONTACT.whatsappHref}${CONTACT.whatsappHref.includes('?') ? '&' : '?'}text=`;
  return message ? `${base}${encodeURIComponent(message)}` : CONTACT.whatsappHref;
}
