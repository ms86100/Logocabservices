import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Customer-safe lookup: returns status + contact-relevant fields only, keyed by the
// non-predictable booking reference (CC-XXXXXXXX). Never exposes other customers' data.
Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'GET') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders });

  try {
    const reference = (new URL(request.url).searchParams.get('reference') || '').trim().toUpperCase();
    if (!/^CC-[A-HJ-NP-Z2-9]{8}$/.test(reference)) {
      return Response.json({ error: 'Enter the booking reference shown after you request your journey.' }, { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_reference, booking_status, trip_type, service_id, booking_date, vehicle_type, created_at')
      .eq('booking_reference', reference)
      .maybeSingle();
    if (error) throw error;
    if (!data) return Response.json({ found: false }, { status: 404, headers: corsHeaders });

    return Response.json(
      {
        found: true,
        bookingReference: data.booking_reference,
        status: data.booking_status,
        tripType: data.trip_type,
        serviceId: data.service_id,
        bookingDate: data.booking_date,
        vehicleType: data.vehicle_type,
        createdAt: data.created_at,
      },
      { headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Could not look up this booking reference. Please try again.' }, { status: 500, headers: corsHeaders });
  }
});
