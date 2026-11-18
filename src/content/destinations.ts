// Outstation destination cards.
// Distances/durations marked verified:false are estimates ("typically / indicative") and
// must be confirmed before being presented as fact on the live site.

export interface Destination {
  id: string;
  name: string;
  region: string;
  distanceKm?: number;
  driveTime?: string; // e.g. "3-4 hrs"
  verified: boolean;
  image: string;
  blurb: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'nandi-hills',
    name: 'Nandi Hills',
    region: 'Karnataka',
    distanceKm: 62,
    driveTime: 'about 2 hrs',
    verified: false,
    image: '/images/destinations/nandi-hills.svg',
    blurb: 'Misty hill station sunrise drives from the Bangalore plains.',
  },
  {
    id: 'mysore',
    name: 'Mysore',
    region: 'Karnataka',
    distanceKm: 280,
    driveTime: '4-5 hrs',
    verified: false,
    image: '/images/destinations/mysore.svg',
    blurb: 'Palaces, gardens and heritage architecture on a comfortable day trip.',
  },
  {
    id: 'coorg',
    name: 'Coorg',
    region: 'Karnataka',
    distanceKm: 240,
    driveTime: '5-6 hrs',
    verified: false,
    image: '/images/destinations/coorg.svg',
    blurb: 'Coffee estates and forested hills, an easy weekend escape from the city.',
  },
  {
    id: 'adiyogi',
    name: 'Adiyogi (Shivamogga)',
    region: 'Karnataka',
    distanceKm: 360,
    driveTime: '6-7 hrs',
    verified: false,
    image: '/images/destinations/adiyogi.svg',
    blurb: 'The colossal Adiyogi statue and Isha yoga campus in the Kaveri valley.',
  },
  {
    id: 'bannerghatta',
    name: 'Bannerghatta National Park',
    region: 'Karnataka',
    distanceKm: 25,
    driveTime: '45-60 mins',
    verified: false,
    image: '/images/destinations/bannerghatta.svg',
    blurb: 'Zoo, safari and resort stays just outside the city limits.',
  },
  {
    id: 'kotilingeshwara',
    name: 'Kotilingeshwara Temple',
    region: 'Nargund, Karnataka',
    distanceKm: 210,
    driveTime: '4-5 hrs',
    verified: false,
    image: '/images/destinations/kotilingeshwara.svg',
    blurb: 'One of the 77 Jyotirlingas, a quiet hilltop temple visit.',
  },
];

export function destinationName(id: string) {
  return DESTINATIONS.find((d) => d.id === id)?.name ?? id;
}
