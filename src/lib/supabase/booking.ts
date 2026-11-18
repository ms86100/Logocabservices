import type { BookingRequestInput } from '../validation/schema';
import { getSupabasePublicConfig } from './client';

export async function submitBooking(
  data: BookingRequestInput
): Promise<{ bookingReference: string; id: string }> {
  const { url, anonKey } = getSupabasePublicConfig();
  const response = await fetch(`${url}/functions/v1/submit-booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(data),
  });
  const result = (await response.json().catch(() => null)) as
    | { bookingReference?: string; id?: string; error?: string }
    | null;

  if (!response.ok || !result?.bookingReference || !result.id) {
    throw new Error(result?.error || 'We could not submit your request. Please try again.');
  }

  return { bookingReference: result.bookingReference, id: result.id };
}
