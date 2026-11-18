create extension if not exists pgcrypto;

create type public.booking_status as enum (
  'pending', 'contacted', 'confirmed', 'assigned', 'completed', 'cancelled'
);

create type public.trip_type as enum ('hourly', 'airport', 'outstation');
create type public.cab_category as enum ('comfort', 'premium', 'tt');
create type public.vehicle_type as enum ('seater_5', 'seater_7', 'tt_12');
create type public.journey_type as enum ('one_way', 'round_trip');
create type public.airport_transfer_type as enum ('pickup', 'drop_off');

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique check (booking_reference ~ '^CC-[A-HJ-NP-Z2-9]{8}$'),
  customer_name text not null check (char_length(customer_name) between 2 and 80),
  phone_number text not null check (phone_number ~ '^(\+91)?[6-9][0-9]{9}$'),
  email text,
  trip_type public.trip_type not null,
  cab_category public.cab_category not null,
  city text not null check (char_length(city) between 2 and 80),
  pickup_location text not null check (char_length(pickup_location) between 3 and 180),
  destination text,
  booking_date date not null,
  pickup_time time not null,
  am_pm text not null check (am_pm in ('AM', 'PM')),
  rental_duration smallint check (rental_duration between 1 and 24),
  airport text,
  airport_type public.airport_transfer_type,
  flight_number text,
  journey_type public.journey_type,
  return_date date,
  vehicle_type public.vehicle_type not null,
  special_notes text check (char_length(special_notes) <= 500),
  booking_status public.booking_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hourly_requires_duration check (trip_type <> 'hourly' or rental_duration is not null),
  constraint airport_requires_details check (trip_type <> 'airport' or (airport is not null and airport_type is not null)),
  constraint non_hourly_requires_destination check (trip_type = 'hourly' or destination is not null),
  constraint round_trip_requires_return check (journey_type <> 'round_trip' or return_date is not null),
  constraint return_after_departure check (return_date is null or return_date >= booking_date)
);

create index bookings_reference_idx on public.bookings (booking_reference);
create index bookings_date_idx on public.bookings (booking_date desc);
create index bookings_trip_status_idx on public.bookings (trip_type, booking_status);
create index bookings_created_at_idx on public.bookings (created_at desc);

create table public.booking_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null default date_trunc('hour', now()),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create trigger booking_rate_limits_set_updated_at
before update on public.booking_rate_limits
for each row execute function public.set_updated_at();

create or replace function public.rate_limit_booking_request(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  current_window timestamptz := date_trunc('hour', now());
begin
  insert into public.booking_rate_limits (ip_hash, window_started_at, request_count)
  values (p_ip_hash, current_window, 1)
  on conflict (ip_hash) do update
    set window_started_at = case
          when booking_rate_limits.window_started_at < current_window then current_window
          else booking_rate_limits.window_started_at
        end,
        request_count = case
          when booking_rate_limits.window_started_at < current_window then 1
          else booking_rate_limits.request_count + 1
        end
  returning request_count into current_count;

  return current_count <= 6;
end;
$$;

alter table public.bookings enable row level security;
alter table public.booking_rate_limits enable row level security;

create policy "Administrators can manage bookings"
on public.bookings
for all
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

revoke all on public.booking_rate_limits from anon, authenticated;
revoke all on function public.rate_limit_booking_request(text) from public, anon, authenticated;

comment on table public.bookings is 'Private booking requests. Anonymous visitors only submit through the Edge Function.';
comment on function public.rate_limit_booking_request(text) is 'Service-role-only hourly IP-hash request throttle.';
