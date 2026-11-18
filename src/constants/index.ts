import type { CityConfig, TripType, CabCategory, Vehicle, VehicleType } from '../types';
import { BRAND, CONTACT, OPERATIONAL } from '../content/brand';
import { DESTINATIONS } from '../content/destinations';
import { LOCALITIES, COVERAGE_DISCLAIMER } from '../content/localities';
import { HOURLY_PACKAGES, AIRPORT_FARES, OUTSTATION_PACKAGES, FARE_DISCLAIMER } from '../content/pricing';

export { BRAND, CONTACT, OPERATIONAL, DESTINATIONS, LOCALITIES, COVERAGE_DISCLAIMER };
export { HOURLY_PACKAGES, AIRPORT_FARES, OUTSTATION_PACKAGES, FARE_DISCLAIMER };

export const CITIES: CityConfig[] = [
  { id: 'blr', name: 'Bangalore', countryCode: 'IN', enabled: true },
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
  {
    id: 'SELF_DRIVE',
    label: 'Self-Drive',
    description: 'Pick a vehicle and drive yourself',
    icon: 'Car',
  },
  {
    id: 'DRIVER_ON_HIRE',
    label: 'Driver on Hire',
    description: 'A professional driver for your own vehicle',
    icon: 'UserRound',
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
  { from: 'Bangalore', to: 'Mysore', duration: '4-5 hrs (indicative)' },
  { from: 'Bangalore', to: 'Coorg', duration: '5-6 hrs (indicative)' },
  { from: 'Bangalore', to: 'Nandi Hills', duration: 'about 2 hrs (indicative)' },
  { from: 'Bangalore', to: 'Chikmagalur', duration: '5-7 hrs (indicative)' },
];

export const SERVICES: { id: string; name: string; description: string; icon: string }[] = [
  { id: 'hourly', name: 'Local Rides & Hourly', description: 'City travel on your schedule', icon: 'Clock' },
  { id: 'airport', name: 'Airport Transfers', description: 'Flight-tracked pickups & drops', icon: 'Plane' },
  { id: 'outstation', name: 'Outstation Trips', description: 'Comfortable inter-city travel', icon: 'Route' },
  { id: 'self-drive', name: 'Self-Drive Rentals', description: 'Pick a car and drive yourself', icon: 'Car' },
  { id: 'driver-on-hire', name: 'Driver on Hire', description: 'A driver for your own vehicle', icon: 'UserRound' },
  { id: 'group', name: 'Group & Tempo Traveller', description: 'Family, team and event travel', icon: 'Users' },
];

export const BOOKING_SERVICES: {
  id: string;
  tripType: TripType;
  serviceId: import('../types').ServiceId;
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
    serviceId: 'airport',
    eyebrow: 'Airport transfers',
    title: 'Airport Transfers',
    description:
      'Catch your flight, not your breath. Plan your airport pickup or drop with confidence, with flight-number support where you share it.',
    highlights: ['Pickup or drop-off', 'Flight-number support', 'Comfortable vehicles'],
  },
  {
    id: 'local',
    tripType: 'HOURLY',
    serviceId: 'local',
    eyebrow: 'Around the city',
    title: 'Local Bangalore Rides',
    description:
      'From office commutes to shopping trips, book a comfortable ride around the city on your own schedule.',
    highlights: ['Flexible duration', 'Multiple stops', 'City travel'],
  },
  {
    id: 'hourly',
    tripType: 'HOURLY',
    serviceId: 'hourly',
    eyebrow: 'Your schedule',
    title: 'Hourly Rentals',
    description: 'Your car, your schedule. Keep a vehicle and driver available for your planned hours.',
    highlights: ['4-hour & 8-hour packages', 'Clear included km', 'Driver included'],
  },
  {
    id: 'outstation',
    tripType: 'OUTSTATION',
    serviceId: 'outstation',
    eyebrow: 'Beyond the city',
    title: 'Outstation Trips',
    description:
      'Weekend escapes, family holidays and long-distance journeys made comfortable, one-way or round-trip.',
    highlights: ['One-way or round-trip', 'Inter-city travel', 'Flexible vehicle preference'],
  },
  {
    id: 'self-drive',
    tripType: 'SELF_DRIVE',
    serviceId: 'self-drive',
    eyebrow: 'Drive yourself',
    title: 'Self-Drive Rentals',
    description: 'Choose your vehicle and enjoy the freedom of driving yourself, on your own route.',
    highlights: ['Pick your vehicle', 'Own route & timing', 'Flexible duration'],
  },
  {
    id: 'driver-on-hire',
    tripType: 'DRIVER_ON_HIRE',
    serviceId: 'driver-on-hire',
    eyebrow: 'Your vehicle',
    title: 'Driver on Hire',
    description: 'Need a professional driver for your own vehicle? We arrange a courteous driver for your journey.',
    highlights: ['Your own car', 'Professional driver', 'For any journey'],
  },
  {
    id: 'group',
    tripType: 'OUTSTATION',
    serviceId: 'group',
    eyebrow: 'Travel together',
    title: 'Group & Tempo Traveller',
    description: '7- and 12-seater options for family trips, teams, events and group sightseeing.',
    highlights: ['Up to 12 seats', 'Extra luggage room', 'Outstation-ready'],
    category: 'TT',
    vehicleType: 'TT_12',
  },
];

export const WHY_CHOOSE_US: { title: string; description: string }[] = [
  {
    title: 'A ride that respects your time',
    description: 'Clear pickup details and proactive communication from our team, so you are not left guessing.',
  },
  {
    title: 'Comfort that matters',
    description: 'Clean vehicles and comfortable seating for city hops and long outstation drives alike.',
  },
  {
    title: 'Drivers you can communicate with',
    description: 'Professional, courteous drivers. Language capabilities vary by driver and are confirmed on request.',
  },
  {
    title: 'Pricing you can understand',
    description: 'Know the package, what is included and what additional charges may apply before you book.',
  },
  {
    title: 'Someone to talk to',
    description: 'Reach a real human on WhatsApp or by phone for prices, vehicle requests and booking help.',
  },
  {
    title: 'Travel for every occasion',
    description: 'From airport transfers to family holidays and group trips, one service for the whole journey.',
  },
];

export const FAQS: { question: string; answer: string; needsOperator: boolean }[] = [
  {
    question: 'How do I book a cab in Bangalore?',
    answer:
      'Use the booking widget on our website, or message us on WhatsApp. Our team confirms availability and next steps with you before anything is allocated.',
    needsOperator: false,
  },
  {
    question: 'Can I book a cab for early morning airport transfers?',
    answer: 'Early-morning and late-night airport journeys are common. Share your flight details and we will plan the pickup around them.',
    needsOperator: false,
  },
  {
    question: 'Do you provide 24/7 airport service?',
    answer:
      'Please confirm 24/7 availability with our team before relying on it for a red-eye or very early flight.',
    needsOperator: true,
  },
  {
    question: 'Can I book an Innova Crysta for family travel?',
    answer:
      'Our 7-seater option suits family trips. Tell us your group size and we will confirm the vehicle that fits.',
    needsOperator: true,
  },
  {
    question: 'Can I book a Tempo Traveller?',
    answer: 'Yes, for groups of up to 12. The operator confirms availability for your dates before allocation.',
    needsOperator: false,
  },
  {
    question: 'Do you provide one-way outstation trips?',
    answer: 'Yes, one-way and round-trip outstation journeys are both supported. Tolls and driver allowance are confirmed per journey.',
    needsOperator: false,
  },
  {
    question: 'Can I book a cab for 4 or 8 hours?',
    answer:
      'Hourly packages of 4 hours / 40 km and 8 hours / 80 km are reference prices from our flyer. Confirm applicability with our team.',
    needsOperator: true,
  },
  {
    question: 'Are tolls and parking included?',
    answer:
      'Tolls, parking and any night or extra-km charges are confirmed with you before the journey, so there are no surprises on the day.',
    needsOperator: false,
  },
  {
    question: 'Can I book a cab for Mysore or Coorg?',
    answer:
      'Yes. Both are popular outstation destinations. Distances are indicative; final pricing and driver allowance are confirmed per booking.',
    needsOperator: true,
  },
  {
    question: 'How do I know my booking is confirmed?',
    answer:
      'You receive a booking reference when the request is submitted. Confirmation happens when our team contacts you - it is not automatic on submission.',
    needsOperator: false,
  },
  {
    question: 'Can I cancel or reschedule?',
    answer: 'Changes are possible while the ride has not been assigned yet. Call us or reply to the confirmation with your booking reference.',
    needsOperator: true,
  },
  {
    question: 'How do I contact my driver?',
    answer: 'Once a driver is assigned, our team shares their contact details with you. Keep your booking reference handy.',
    needsOperator: false,
  },
  {
    question: 'Can I book a driver for my own car?',
    answer: 'Yes - Driver on Hire arranges a professional driver for your own vehicle. Tell us the vehicle details and journey.',
    needsOperator: false,
  },
  {
    question: 'Do you offer self-drive rentals?',
    answer: 'Self-drive rental is available subject to vehicle and licence confirmation. Tell us your licence type and preferred vehicle.',
    needsOperator: true,
  },
  {
    question: 'How do I get a final fare quotation?',
    answer: 'Share your journey details on WhatsApp or the booking form. Our team returns a confirmed quote before you commit.',
    needsOperator: false,
  },
];

// No fabricated testimonials. Real customer quotes can be added here after approval.
export const TESTIMONIALS: { name: string; quote: string; trip: string }[] = [];
