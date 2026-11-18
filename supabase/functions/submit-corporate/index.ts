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
  if (!str('companyName', 2, 120)) return { error: 'Company name is required.' };
  if (!str('contactName', 2, 80)) return { error: 'Contact name is required.' };
  if (!str('phoneNumber', 10, 15) || !/^(?:\+91[ -]?)?[6-9]\d{9}$/.test(d.phoneNumber as string))
    return { error: 'A valid Indian mobile number is required.' };
  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email as string)) return { error: 'Email is invalid.' };
  if (d.requirements && !str('requirements', 0, 800)) return { error: 'Requirements are too long.' };
  return { data: {
    company_name: d.companyName,
    contact_name: d.contactName,
    email: d.email || null,
    phone_number: (d.phoneNumber as string).replace(/[ -]/g, ''),
    requirements: d.requirements || null,
    monthly_billing_discussion: Boolean(d.monthlyBilling),
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
    const { data, error } = await supabase.from('corporate_inquiries').insert(input.data).select('id').single();
    if (error) throw error;
    return Response.json({ id: data.id }, { status: 201, headers: corsHeaders });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Could not submit corporate enquiry. Please try again.' }, { status: 500, headers: corsHeaders });
  }
});
