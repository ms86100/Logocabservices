-- Extend the booking platform: new service types, referral/coupon fields,
-- and two new request tables for corporate enquiries and ride-share requests.
-- Keep RLS posture identical to migration 1: anon can never read or write
-- these tables directly. All public submissions flow through Edge Functions;
-- admins manage via Supabase Auth with app_metadata.role = "admin".

alter table public.bookings
  add column if not exists service_id text check (service_id in (
    'airport', 'local', 'hourly', 'outstation', 'group', 'self-drive', 'driver-on-hire'
  )),
  add column if not exists referral_code text,
  add column if not exists coupon_code text;

alter table public.bookings
  drop constraint if exists booking_reference_format,
  add constraint booking_reference_format check (booking_reference ~ '^CC-[A-HJ-NP-Z2-9]{8}$');

comment on column public.bookings.service_id is 'Service line requested (see src/content brand); nullable until the operator assigns a default.';

create type public.service_type as enum (
  'airport', 'local', 'hourly', 'outstation', 'group', 'self-drive', 'driver-on-hire'
);

create table public.corporate_inquiries (
  id uuid primary key default gen_random_uuid(),
  company_name text not null check (char_length(company_name) between 2 and 120),
  contact_name text not null check (char_length(contact_name) between 2 and 80),
  email text check (email ~ '^[^@]+@[^@]+\.[^@]+$'),
  phone_number text not null check (phone_number ~ '^(\+91)?[6-9][0-9]{9}$'),
  requirements text check (char_length(requirements) <= 800),
  monthly_billing_discussion boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.ride_share_requests (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('offering', 'joining')),
  customer_name text not null check (char_length(customer_name) between 2 and 80),
  phone_number text not null check (phone_number ~ '^(\+91)?[6-9][0-9]{9}$'),
  pickup_location text not null check (char_length(pickup_location) between 3 and 180),
  destination text check (char_length(destination) between 3 and 180),
  journey_date date,
  seats_available smallint check (seats_available between 1 and 11),
  verified_passenger_check boolean not null default true,
  consent_shares_contact boolean not null default false,
  notes text check (char_length(notes) <= 500),
  created_at timestamptz not null default now()
);

create index corporate_inquiries_created_idx on public.corporate_inquiries (created_at desc);
create index ride_share_requests_role_idx on public.ride_share_requests (role, journey_date desc nulls last);

alter table public.corporate_inquiries enable row level security;
alter table public.ride_share_requests enable row level security;

create policy "Administrators can read corporate inquiries"
on public.corporate_inquiries for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Administrators can read ride share requests"
on public.ride_share_requests for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

revoke all on public.corporate_inquiries, public.ride_share_requests from anon, authenticated, public;

comment on table public.corporate_inquiries is 'Public submissions via submit-corporate Edge Function; admin-only reads.';
comment on table public.ride_share_requests is 'Public submissions via submit-ride-share Edge Function; admin-only reads. Consent and passenger verification flags are required.';
