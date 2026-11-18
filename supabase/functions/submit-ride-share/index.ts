import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function validate(body: unknown): { data: Record<string, unknown> } | { error: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Body must be an object.' };
  const d = body as Record<string, unknown>;
  const str = (k: string, min = 0, max = 10_000) =>
    typeof d[k] === 'string' && d[k].trim().length >= min && d[k].trim().length <= max;
  if (!['offering', 'joining'].includes(d.role as string)) return { error: 'Role must be offering or joining.' };
  if (!str('customerName', 2, 80)) return { error: 'Name is required.' };
  if (!str('phoneNumber', 10, 15) || !/^(?:\+91[ -]?)?[6-9]\d{9}$/.test(d.phoneNumber as string))
    return { error: 'A valid Indian mobile number is required.' };
  if (!str('pickupLocation', 3, 180)) return { error: 'Pickup location is required.' };
  if (d.destination && !str('destination', 3, 180)) return { error: 'Destination is too long.' };
  if (d.journeyDate && !/^\d{4}-\d{2}-\d{2}$/.test(d.journeyDate as string))
    return { error: 'Journey date is invalid.' };
  if (d.seatsAvailable !== undefined && (!Number.isInteger(d.seatsAvailable) || (d.seatsAvailable as number) < 1 || (d.seatsAvailable as number) > 11))
    return { error: 'Seats available must be 1-11.' };
  // Ride-share must always record consent + verification intent, never fake availability.
  if (!Boolean(d.passengerVerification)) return { error: 'You must confirm passenger verification consent.' };
  return { data: {
    role: d.role,
    customer_name: d.customerName,
    phone_number: (d.phoneNumber as string).replace(/[ -]/g, ''),
    pickup_location: d.pickupLocation,
    destination: d.destination || null,
    journey_date: d.journeyDate || null,
    seats_available: d.seatsAvailable ?? null,
    verified_passenger_check: true,
    consent_shares_contact: Boolean(d.consentSharesContact),
    notes: d.notes || null,
  } };
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders });
  try {
    const input = validate(await request.json());
    if ('error' in input) return Response.json({ error: input.error }, { status: 400, headers: corsHeaders });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );
    const { data, error } = await supabase.from('ride_share_requests').insert(input.data).select('id').single();
    if (error) throw error;
    return Response.json({ id: data.id }, { status: 201, headers: corsHeaders });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Could not submit ride-share request. Please try again.' }, { status: 500, headers: corsHeaders });
  }
});
