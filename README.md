# CityCab

A static-exported Next.js booking website for hourly rentals, airport transfers, and outstation requests in Bangalore. A request is not a confirmed vehicle allocation.

## What is included

- Premium responsive homepage, fleet, service, FAQ, contact, and editable demo testimonial sections.
- Seven-step booking flow with trip-specific fields, Indian mobile validation, 15-minute time choices, a review step, and clear request status messaging.
- Supabase migration with strict RLS: anonymous users cannot read or insert bookings directly. The service-role Edge Function validates, rate-limits, persists, generates booking references, and optionally emails via Resend.
- PWA manifest, small offline cache, semantic markup, metadata, robots and sitemap placeholders.

## Run locally

1. Copy `.env.example` to `.env.local` and set the two public Supabase values.
2. Run `npm install` and `npm run dev`.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build` before deployment.

Without the two public variables, the visual website works but the final booking request intentionally shows a configuration error instead of pretending to save a request.

## Supabase setup

1. Create a Supabase project and run `supabase/migrations/202611180001_initial_booking_platform.sql` in the SQL editor (or through the Supabase CLI).
2. Deploy the function: `supabase functions deploy submit-booking --no-verify-jwt`. It is intentionally callable with the anonymous key; the function performs validation and rate limiting while the database remains private.
3. Set function secrets: `supabase secrets set ADMIN_EMAIL=... RESEND_API_KEY=... RESEND_FROM_EMAIL="CityCab <bookings@your-domain.com>"`.
4. Add the Supabase project URL and anonymous key to Vercel as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Create administrators in Supabase Auth only, then assign `app_metadata.role = "admin"` using a trusted server/admin process. The migration only permits those users to read or manage bookings.

## Resend setup

1. Verify a sending domain in Resend.
2. Use an address at that verified domain for `RESEND_FROM_EMAIL`.
3. Set the function secrets above, then make a real test request and verify both the operations email and optional customer acknowledgement.

Email delivery intentionally does not block a successfully stored request; monitor the Supabase function logs for provider failures.

## Deploy to Vercel

1. Push this repository and import it in Vercel.
2. Set the two `NEXT_PUBLIC_SUPABASE_*` variables in Vercel.
3. Deploy with the build command `npm run build`; Vercel serves the generated `out` directory for the static export.
4. Replace `https://your-domain.example` in `public/robots.txt` and `public/sitemap.xml` with the production canonical domain before launch.
5. Replace placeholder telephone, email, brand name, demo testimonials, and vehicle imagery with approved business assets before launch.

## Pre-launch checklist

- [ ] Apply migration and deploy the Edge Function.
- [ ] Add function secrets and send real email tests.
- [ ] Confirm rate-limit behavior and booking persistence in the target Supabase project.
- [ ] Add approved contact details and verified testimonials.
- [ ] Test at 320, 375, 390, 430, 768, 1024, and 1440px with each trip type.
- [ ] Replace the SVG app icon with platform-specific raster icon/splash assets before native wrapping.

See `docs/CAPACITOR.md` for the future native-app plan.
