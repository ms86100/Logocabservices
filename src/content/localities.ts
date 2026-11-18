// Bangalore localities used for local-ride content and SEO pages.
// `covered: false` means the operator has not confirmed service coverage for that area yet,
// so the UI should not claim availability there.

export interface Locality {
  id: string;
  name: string;
  covered: boolean;
  note?: string;
}

export const LOCALITIES: Locality[] = [
  { id: 'whitefield', name: 'Whitefield', covered: false },
  { id: 'electronic-city', name: 'Electronic City', covered: false },
  { id: 'sarjapur-road', name: 'Sarjapur Road', covered: false },
  { id: 'marathahalli', name: 'Marathahalli', covered: false },
  { id: 'koramangala', name: 'Koramangala', covered: false },
  { id: 'indiranagar', name: 'Indiranagar', covered: false },
  { id: 'hebbal', name: 'Hebbal', covered: false },
  { id: 'yelahanka', name: 'Yelahanka', covered: false },
  { id: 'hsr-layout', name: 'HSR Layout', covered: false },
  { id: 'jayanagar', name: 'Jayanagar', covered: false },
  { id: 'jp-nagar', name: 'JP Nagar', covered: false },
  { id: 'manyata-tech-park', name: 'Manyata Tech Park', covered: false },
];

export const COVERAGE_DISCLAIMER =
  'We are confirming service coverage across these Bangalore areas. Ask our team about pickup in your specific locality before booking.';
