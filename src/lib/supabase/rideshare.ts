import { getSupabasePublicConfig } from './client';

export type RideShareInput = {
  role: 'offering' | 'joining';
  customerName: string;
  phoneNumber: string;
  pickupLocation: string;
  destination?: string;
  journeyDate?: string;
  seatsAvailable?: number;
  passengerVerification: boolean;
  consentSharesContact?: boolean;
  notes?: string;
};

export async function submitRideShare(data: RideShareInput): Promise<{ id: string }> {
  const { url, anonKey } = getSupabasePublicConfig();
  const res = await fetch(`${url}/functions/v1/submit-ride-share`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    body: JSON.stringify(data),
  });
  const body = (await res.json().catch(() => null)) as { id?: string; error?: string } | null;
  if (!res.ok || !body?.id) throw new Error(body?.error || 'Could not submit ride-share request. Please try again.');
  return { id: body.id };
}
