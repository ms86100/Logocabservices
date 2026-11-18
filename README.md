# LOGO CAB SERVICES

A static-exported Next.js booking website for LOGO CAB SERVICES in Bangalore. Covers airport transfers, local & hourly rides, outstation journeys, self-drive rentals and driver-on-hire, plus corporate enquiries, ride-share requests and booking lookup. A request is not a confirmed vehicle allocation.

## What is included

- Polished, mobile-first homepage with a sticky mobile booking CTA and a persistent WhatsApp + tap-to-call float.
- 7-step booking flow with trip-specific fields (including Self-Drive and Driver-on-Hire), Indian mobile validation, a review step, and clear "request, not confirmed" messaging.
- Supabase Edge Functions: `submit-booking`, `submit-corporate`, `submit-ride-share`, `get-booking-status` (customer-safe status lookup by non-predictable reference).
- Private `bookings`, `corporate_inquiries`, `ride_share_requests` tables with strict RLS - anonymous users cannot read or write directly; all public submissions flow through validated, rate-limited Edge Functions.
- PWA manifest, offline cache, `LocalBusiness` + `Service` structured data, robots + sitemap, and static SEO landing pages.

## Content that needs operator confirmation

All pricing, distances, 24/7 availability, child-seat, insurance, language and corporate-billing claims ship with `verified: false` flags or "to be confirmed" copy in `src/content/*` and `src/constants/index.ts`. Update those modules with confirmed figures before launch; the UI already distinguishes confirmed vs reference data.

## Run locally

1. Copy `.env.example` to `.env.local` and set the two public Supabase values.
2. Run `npm install` and `npm run dev`.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build` before deployment.

Without the two public variables, the visual website works but the final booking request intentionally shows a configuration error instead of pretending to save a request.

## Supabase setup

1. Create a Supabase project and run both migrations: `supabase/migrations/202611180001_initial_booking_platform.sql` then `supabase/migrations/202611180002_services_corporate_ride_share.sql` (or through the Supabase CLI).
2. Deploy the functions:
   - `supabase functions deploy submit-booking --no-verify-jwt`
   - `supabase functions deploy submit-corporate --no-verify-jwt`
   - `supabase functions deploy submit-ride-share --no-verify-jwt`
   - `supabase functions deploy get-booking-status --no-verify-jwt`
   They are intentionally callable with the anonymous key; each performs validation and (where relevant) rate limiting while the database stays private.
3. Set function secrets: `supabase secrets set ADMIN_EMAIL=... RESEND_API_KEY=... RESEND_FROM_EMAIL="LOGO CAB SERVICES <bookings@your-domain.com>"`.
4. Add the Supabase project URL and anonymous key to Vercel as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Create administrators in Supabase Auth only, then assign `app_metadata.role = "admin"` using a trusted server/admin process. The migrations permit only those users to read or manage bookings, corporate and ride-share requests.

## Resend setup

1. Verify a sending domain in Resend.
2. Use an address at that verified domain for `RESEND_FROM_EMAIL`.
3. Set the function secrets above, then make a real test request and verify both the operations email and the optional customer acknowledgement.

## Deploy to Vercel

1. Push this repository and import it in Vercel.
2. Set the two `NEXT_PUBLIC_SUPABASE_*` variables in Vercel.
3. Deploy with the build command `npm run build`; Vercel serves the generated `out` directory for the static export.
4. Replace `https://your-domain.example` in `public/robots.txt` and `public/sitemap.xml` with the production canonical domain before launch.
5. Fill in the operator-confirmation items under `src/content/*` (address, fares, distances, 24/7, child seats, languages, corporate billing) and approved contact/vehicle assets before launch.

## Pre-launch checklist

- [ ] Apply both migrations and deploy the four Edge Functions.
- [ ] Add function secrets and send real email tests.
- [ ] Confirm rate-limit behaviour and persistence of bookings, corporate and ride-share requests.
- [ ] Fill all `verified: false` / "to be confirmed" fields with operator-approved values.
- [ ] Test at 320, 375, 390, 430, 768, 1024 and 1440px with each trip type.
- [ ] Replace the SVG app icon with raster icon/splash assets before native wrapping.

See `docs/CAPACITOR.md` for the future native-app plan (rebrand the app id to `com.example.logocab`).
