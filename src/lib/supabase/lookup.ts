import { getSupabasePublicConfig } from './client';

export type BookingStatusInfo = {
  bookingReference: string;
  status: string;
  tripType?: string;
  serviceId?: string;
  bookingDate?: string;
  vehicleType?: string;
  createdAt?: string;
};

export async function lookupBooking(reference: string): Promise<BookingStatusInfo | null> {
  const { url, anonKey } = getSupabasePublicConfig();
  const res = await fetch(
    `${url}/functions/v1/get-booking-status?reference=${encodeURIComponent(reference.trim().toUpperCase())}`,
    { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }
  );
  const body = (await res.json().catch(() => null)) as (BookingStatusInfo & { found?: boolean }) | null;
  if (!res.ok || !body || body.found === false) return null;
  return body;
}

export const STATUS_LABELS: Record<string, string> = {
  pending: 'Request received',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
  assigned: 'Driver assigned',
  completed: 'Trip completed',
  cancelled: 'Cancelled',
};
