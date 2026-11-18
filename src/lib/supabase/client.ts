export function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Booking requests are not configured yet. Please contact the operator directly.'
    );
  }

  return { url: url.replace(/\/$/, ''), anonKey };
}
