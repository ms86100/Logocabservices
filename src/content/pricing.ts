// Centrally-managed pricing rules.
// Nothing here is a live price feed: every figure carries `verified` so the UI can show
// an itemized total only where rules are confirmed. Unverified rules render as reference
// notes ("confirm with the operator") rather than being presented as fact.

export interface HourlyPackage {
  id: string;
  hours: number;
  kmIncluded: number;
  price: number; // INR
  extraKmRate?: number; // INR per additional km, when confirmed
  extraHourRate?: number; // INR per additional hour, when confirmed
  verified: boolean;
  note: string;
}

export interface AirportFare {
  vehicleLabel: string;
  startPrice?: number; // INR
  verified: boolean;
  note: string;
}

export interface OutstationPackage {
  destinationId: string;
  vehicleLabel: string;
  oneWay?: number; // INR
  roundTrip?: number; // INR
  driverAllowanceIncluded?: boolean;
  tollsParkingIncluded?: boolean;
  verified: boolean;
  note: string;
}

export const HOURLY_PACKAGES: HourlyPackage[] = [
  {
    id: 'hourly-4',
    hours: 4,
    kmIncluded: 40,
    price: 1500,
    verified: false,
    note: 'Reference price from the operator flyer. Confirm applicability before publishing as a live fare.',
  },
  {
    id: 'hourly-8',
    hours: 8,
    kmIncluded: 80,
    price: 3000,
    verified: false,
    note: 'Reference price from the operator flyer. Confirm applicability before publishing as a live fare.',
  },
];

export const AIRPORT_FARES: AirportFare[] = [
  {
    vehicleLabel: 'Sedan / 5-seater',
    verified: false,
    note: 'Airport transfer starting price to be confirmed by the operator.',
  },
  {
    vehicleLabel: 'Innova-class / 7-seater',
    verified: false,
    note: 'Airport transfer starting price to be confirmed by the operator.',
  },
];

export const OUTSTATION_PACKAGES: OutstationPackage[] = [
  {
    destinationId: 'mysore',
    vehicleLabel: 'Sedan / 5-seater',
    verified: false,
    note: 'Indicative outstation package to be confirmed. Tolls and driver allowance to be stated per journey.',
  },
  {
    destinationId: 'coorg',
    vehicleLabel: 'Sedan / 5-seater',
    verified: false,
    note: 'Indicative outstation package to be confirmed. Tolls and driver allowance to be stated per journey.',
  },
];

export const FARE_DISCLAIMER =
  'Fares shown are reference points only. Your final fare, including tolls, parking, night charges and driver allowance where applicable, is confirmed by our team before the journey.';
