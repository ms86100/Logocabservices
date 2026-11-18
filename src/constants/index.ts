import type { CityConfig, TripType, CabCategory, Vehicle, VehicleType } from '../types';

export const CITIES: CityConfig[] = [
  { id: 'blr', name: 'Bangalore', countryCode: 'IN', enabled: true },
  // Future cities:
  // { id: 'del', name: 'Delhi', countryCode: 'IN', enabled: false },
];

export const TRIP_TYPES: { id: TripType; label: string; description: string; icon: string }[] = [
  {
    id: 'HOURLY',
    label: 'Hourly Rental',
    description: 'Drive around the city on your schedule',
    icon: 'Clock',
  },
  {
    id: 'AIRPORT',
    label: 'Airport Transfer',
    description: 'Door-to-door airport pickup with flight tracking',
    icon: 'Plane',
  },
  {
    id: 'OUTSTATION',
    label: 'Outstation',
    description: 'Inter-city trips to neighboring destinations',
    icon: 'Route',
  },
];

export const CAB_CATEGORIES: { id: CabCategory; label: string; description: string }[] = [
  { id: 'COMFORT', label: 'Comfort Cab', description: 'Sedan & hatchback options' },
  { id: 'PREMIUM', label: 'Premium Cab', description: 'Premium sedans & SUVs' },
  { id: 'TT', label: 'Tempo Traveller', description: 'Group & corporate travel' },
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'v5',
    type: 'SEATER_5',
    label: '5 Seater',
    capacity: 5,
    luggage: '4 bags',
    description: 'Sedan / Hatchback',
  },
  {
    id: 'v7',
    type: 'SEATER_7',
    label: '7 Seater',
    capacity: 7,
    luggage: '6 bags',
    description: 'MPV / SUV',
  },
  {
    id: 'v12',
    type: 'TT_12',
    label: 'Tempo Traveller',
    capacity: 12,
    luggage: '10 bags',
    description: 'Group / Corporate',
  },
];

export const AIRPORTS: string[] = [
  'Kempegowda International Airport (BLR)',
];

export const POPULAR_ROUTES: { from: string; to: string; duration: string }[] = [
  { from: 'Bangalore', to: 'Mysore', duration: '3–4 hrs' },
  { from: 'Bangalore', to: 'Ooty', duration: '7–9 hrs' },
  { from: 'Bangalore', to: 'Coimbatore', duration: '6–8 hrs' },
  { from: 'Bangalore', to: 'Chikmagalur', duration: '5–7 hrs' },
];

export const SERVICES: { id: string; name: string; description: string; icon: string }[] = [
  { id: 'hourly', name: 'Hourly Rentals', description: 'City rides on your schedule', icon: 'Clock' },
  { id: 'airport', name: 'Airport Transfers', description: 'Flight-tracked pickups & drops', icon: 'Plane' },
  { id: 'outstation', name: 'Outstation Trips', description: 'Comfortable inter-city travel', icon: 'Route' },
];

export const BOOKING_SERVICES: {
  id: string;
  tripType: TripType;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  category?: CabCategory;
  vehicleType?: VehicleType;
}[] = [
  {
    id: 'airport',
    tripType: 'AIRPORT',
    eyebrow: 'Arrival & departure',
    title: 'Airport Transfers',
    description: 'A measured, door-to-airport or airport-to-door journey planned around your flight.',
    highlights: ['Pickup or drop-off', 'Flight-number support', 'Comfortable sedans'],
  },
  {
    id: 'outstation',
    tripType: 'OUTSTATION',
    eyebrow: 'Beyond the city',
    title: 'Outstation Trips',
    description: 'Plan a relaxed one-way or round-trip escape to destinations across Karnataka and beyond.',
    highlights: ['One-way or round-trip', 'Inter-city travel', 'Flexible vehicle preference'],
  },
  {
    id: 'hourly',
    tripType: 'HOURLY',
    eyebrow: 'Your schedule',
    title: 'Hourly Rentals',
    description: 'Move through meetings, errands and the city at your own pace with a dedicated cab.',
    highlights: ['Flexible duration', 'Multiple stops', 'City travel'],
  },
  {
    id: 'group',
    tripType: 'OUTSTATION',
    eyebrow: 'Travel together',
    title: 'Group & Tempo Traveller',
    description: 'Create a comfortable shared journey for family, teams, events and sightseeing plans.',
    highlights: ['Up to 12 seats', 'Extra luggage room', 'Outstation-ready'],
    category: 'TT',
    vehicleType: 'TT_12',
  },
];

export const WHY_CHOOSE_US: { title: string; description: string }[] = [
  { title: 'Professional Drivers', description: 'Background-verified, trained, and courteous.' },
  { title: 'Fair Pricing', description: 'Transparent rates. No hidden charges.' },
  { title: 'On-Time Arrival', description: 'We track your flight and plan accordingly.' },
  { title: '24/7 Availability', description: 'Round-the-clock service, every day of the week.' },
];

export const FAQS: { question: string; answer: string }[] = [
  {
    question: 'How do I book a ride?',
    answer: 'Fill out the booking form on our website. Our team will contact you to confirm your ride details and share your driver information.',
  },
  {
    question: 'Can I change my booking after it’s submitted?',
    answer: 'Yes, just call us or reply to the confirmation email. Changes can be made as long as the ride hasn’t been assigned yet.',
  },
  {
    question: 'What vehicles do you operate?',
    answer: 'We operate sedans (4-5 seaters), SUVs (7 seaters), and Tempo Travellers (12 seaters) to suit your group size.',
  },
  {
    question: 'Do you handle flight delays?',
    answer: 'Absolutely. For airport transfers, we track your flight number and adjust your pickup time if there’s a delay.',
  },
];

export const TESTIMONIALS: { name: string; quote: string; trip: string }[] = [
  // Placeholder content - replace with real customer feedback
  {
    name: 'Aarav S.',
    quote: 'Smooth airport pickup even when my flight was delayed 40 minutes. The driver was right on time when I landed.',
    trip: 'Airport Transfer',
  },
  {
    name: 'Meera K.',
    quote: 'Booked a Tempo Traveller for a team of 10 going to Coimbatore. Very comfortable and the fare was fair.',
    trip: 'Outstation Trip',
  },
  {
    name: 'Demo Content',
    quote: 'This is placeholder content. Replace with real customer testimonials.',
    trip: 'Placeholder',
  },
];
