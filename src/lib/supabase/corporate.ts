import { getSupabasePublicConfig } from './client';

export type CorporateInput = {
  companyName: string;
  contactName: string;
  email?: string;
  phoneNumber: string;
  requirements?: string;
  monthlyBilling?: boolean;
};

export async function submitCorporate(data: CorporateInput): Promise<{ id: string }> {
  const { url, anonKey } = getSupabasePublicConfig();
  const res = await fetch(`${url}/functions/v1/submit-corporate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    body: JSON.stringify(data),
  });
  const body = (await res.json().catch(() => null)) as { id?: string; error?: string } | null;
  if (!res.ok || !body?.id) throw new Error(body?.error || 'Could not submit corporate enquiry. Please try again.');
  return { id: body.id };
}
