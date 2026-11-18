export type TripType = 'HOURLY' | 'AIRPORT' | 'OUTSTATION';
export type CabCategory = 'COMFORT' | 'PREMIUM' | 'TT';
export type VehicleType = 'SEATER_5' | 'SEATER_7' | 'TT_12';
export type JourneyType = 'ONE_WAY' | 'ROUND_TRIP';
export type BookingStatus =
  | 'PENDING'
  | 'CONTACTED'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface BookingRequest {
  id?: string;
  bookingReference: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  tripType: TripType;
  cabCategory: CabCategory;
  city: string;
  // Hourly
  hourlyDuration?: number; // hours
  // Airport
  airport?: string;
  airportType?: 'PICKUP' | 'DROP_OFF';
  flightNumber?: string;
  // Outstation
  journeyType?: JourneyType;
  returnDate?: string;
  // Shared
  pickupLocation: string;
  destination: string;
  bookingDate: string; // ISO date string
  pickupTime: string; // HH:mm
  amPm: 'AM' | 'PM';
  vehicleType: VehicleType;
  specialNotes?: string;
  bookingStatus: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CityConfig {
  id: string;
  name: string;
  countryCode: string;
  enabled: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  label: string;
  capacity: number;
  luggage: string;
  description: string;
}
