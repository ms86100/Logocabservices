import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'npm:zod@3.25.0';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const bookingSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  phoneNumber: z.string().regex(/^(?:\+91[ -]?)?[6-9]\d{9}$/),
  email: z.string().email().optional().or(z.literal('')),
  tripType: z.enum(['HOURLY', 'AIRPORT', 'OUTSTATION']),
  cabCategory: z.enum(['COMFORT', 'PREMIUM', 'TT']),
  city: z.string().trim().min(2).max(80),
  pickupLocation: z.string().trim().min(3).max(180),
  destination: z.string().trim().max(180).optional().or(z.literal('')),
  bookingDate: z.string().date(),
  pickupTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  amPm: z.enum(['AM', 'PM']),
  hourlyDuration: z.number().int().min(1).max(24).optional(),
  airport: z.string().trim().max(120).optional(),
  airportType: z.enum(['PICKUP', 'DROP_OFF']).optional(),
  flightNumber: z.string().regex(/^[A-Za-z0-9 ]{2,10}$/).optional().or(z.literal('')),
  journeyType: z.enum(['ONE_WAY', 'ROUND_TRIP']).optional(),
  returnDate: z.string().date().optional().or(z.literal('')),
  vehicleType: z.enum(['SEATER_5', 'SEATER_7', 'TT_12']),
  specialNotes: z.string().trim().max(500).optional().or(z.literal('')),
}).superRefine((data, context) => {
  if (data.tripType !== 'HOURLY' && !data.destination) context.addIssue({ code: 'custom', path: ['destination'], message: 'Destination is required.' });
  if (data.tripType === 'HOURLY' && !data.hourlyDuration) context.addIssue({ code: 'custom', path: ['hourlyDuration'], message: 'Rental duration is required.' });
  if (data.tripType === 'AIRPORT' && (!data.airport || !data.airportType)) context.addIssue({ code: 'custom', path: ['airport'], message: 'Airport details are required.' });
  if (data.tripType === 'OUTSTATION' && data.journeyType === 'ROUND_TRIP' && !data.returnDate) context.addIssue({ code: 'custom', path: ['returnDate'], message: 'Return date is required.' });
  if (data.returnDate && data.returnDate < data.bookingDate) context.addIssue({ code: 'custom', path: ['returnDate'], message: 'Return date must follow departure.' });
});

function bookingReference() {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const values = crypto.getRandomValues(new Uint8Array(8));
  return `CC-${Array.from(values, (value) => characters[value % characters.length]).join('')}`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] || character));
}

async function hash(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders });

  try {
    const input = bookingSchema.safeParse(await request.json());
    if (!input.success) return Response.json({ error: 'Invalid booking details.', details: input.error.flatten() }, { status: 400, headers: corsHeaders });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown';
    const { data: permitted, error: limitError } = await supabase.rpc('rate_limit_booking_request', { p_ip_hash: await hash(forwardedFor.split(',')[0].trim()) });
    if (limitError || !permitted) return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: corsHeaders });

    const data = input.data;
    let inserted: { id: string; booking_reference: string } | null = null;
    for (let attempt = 0; attempt < 3 && !inserted; attempt += 1) {
      const result = await supabase.from('bookings').insert({
        booking_reference: bookingReference(), customer_name: data.customerName, phone_number: data.phoneNumber.replace(/[ -]/g, ''),
        email: data.email || null, trip_type: data.tripType.toLowerCase(), cab_category: data.cabCategory.toLowerCase(), city: data.city,
        pickup_location: data.pickupLocation, destination: data.destination || null, booking_date: data.bookingDate, pickup_time: data.pickupTime,
        am_pm: data.amPm, rental_duration: data.hourlyDuration || null, airport: data.airport || null,
        airport_type: data.airportType?.toLowerCase() || null, flight_number: data.flightNumber || null,
        journey_type: data.journeyType?.toLowerCase() || null, return_date: data.returnDate || null,
        vehicle_type: data.vehicleType.toLowerCase(), special_notes: data.specialNotes || null,
      }).select('id, booking_reference').single();
      if (!result.error) inserted = result.data;
      else if (result.error.code !== '23505') throw result.error;
    }
    if (!inserted) throw new Error('Could not create a unique booking reference.');

    const adminEmail = Deno.env.get('ADMIN_EMAIL');
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL');
    if (adminEmail && resendKey && fromEmail) {
      const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(String(value || '—'))]));
      const send = (to: string, subject: string, html: string) => fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: fromEmail, to, subject, html }) });
      await send(adminEmail, `New booking request: ${inserted.booking_reference}`, `<main style="font-family:Arial,sans-serif;color:#0f172a"><h1>New booking request</h1><p><b>Reference:</b> ${inserted.booking_reference}</p><p><b>Customer:</b> ${safe.customerName}</p><p><b>Phone:</b> ${safe.phoneNumber}</p><p><b>Email:</b> ${safe.email}</p><p><b>Trip:</b> ${safe.tripType} · ${safe.vehicleType}</p><p><b>Journey:</b> ${safe.pickupLocation} → ${safe.destination}</p><p><b>When:</b> ${safe.bookingDate} at ${safe.pickupTime} ${safe.amPm}</p></main>`);
      if (data.email) await send(data.email, `We received your CityCab request — ${inserted.booking_reference}`, `<main style="font-family:Arial,sans-serif;color:#0f172a"><h1>Thanks, ${safe.customerName}.</h1><p>Your booking request has been received. Your reference is <b>${inserted.booking_reference}</b>.</p><p>This is a request, not a confirmed cab allocation. Our team will contact you about availability and next steps.</p></main>`);
    }
    return Response.json({ id: inserted.id, bookingReference: inserted.booking_reference }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Unable to submit the booking request. Please try again.' }, { status: 500, headers: corsHeaders });
  }
});
