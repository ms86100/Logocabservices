'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm, type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Luggage,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { CAB_CATEGORIES, CITIES, TRIP_TYPES, VEHICLES } from '@/constants';
import { submitBooking } from '@/lib/supabase/booking';
import { bookingRequestSchema, type BookingRequestInput } from '@/lib/validation/schema';
import type { CabCategory, TripType, VehicleType } from '@/types';

const steps = ['Trip', 'Category', 'City', 'You', 'Journey', 'Vehicle', 'Review'];
const timeOptions = Array.from({ length: 96 }, (_, index) => {
  const hour = String(Math.floor(index / 4)).padStart(2, '0');
  const minute = String((index % 4) * 15).padStart(2, '0');
  return `${hour}:${minute}`;
});

function CardChoice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
        selected
          ? 'border-cyan-300 bg-cyan-200/10 shadow-[0_0_28px_rgba(103,232,249,0.12)]'
          : 'border-slate-700 bg-slate-950/45 hover:border-slate-500 hover:bg-white/5'
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-cyan-200 text-slate-950">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
      {children}
    </button>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

export default function BookingWidget() {
  const [step, setStep] = useState(0);
  const [submittedReference, setSubmittedReference] = useState<string>();
  const [submitError, setSubmitError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BookingRequestInput>({
    shouldUnregister: false,
    defaultValues: {
      tripType: 'AIRPORT',
      cabCategory: 'COMFORT',
      city: 'Bangalore',
      vehicleType: 'SEATER_5',
      amPm: 'AM',
      airport: 'Kempegowda International Airport (BLR)',
      airportType: 'PICKUP',
      journeyType: 'ONE_WAY',
      pickupLocation: '',
      destination: '',
      bookingDate: '',
      pickupTime: '',
      email: '',
      flightNumber: '',
      specialNotes: '',
    },
  });
  const values = watch();
  const tripType = values.tripType;

  useEffect(() => {
    const applySelection = (detail: {
      tripType: TripType;
      destination?: string;
      category?: CabCategory;
      vehicleType?: VehicleType;
    }) => {
      if (!['HOURLY', 'AIRPORT', 'OUTSTATION'].includes(detail.tripType)) return;
      setValue('tripType', detail.tripType, { shouldDirty: true });
      if (detail.destination) setValue('destination', detail.destination, { shouldDirty: true });
      if (detail.category && ['COMFORT', 'PREMIUM', 'TT'].includes(detail.category)) {
        setValue('cabCategory', detail.category, { shouldDirty: true });
      }
      if (detail.vehicleType && ['SEATER_5', 'SEATER_7', 'TT_12'].includes(detail.vehicleType)) {
        setValue('vehicleType', detail.vehicleType, { shouldDirty: true });
      }
      clearErrors(['tripType', 'destination', 'cabCategory', 'vehicleType']);
      setSubmittedReference(undefined);
      setSubmitError(undefined);
      setStep(detail.destination ? 4 : 0);
    };

    const onSelection = (event: Event) => {
      applySelection((event as CustomEvent<{
        tripType: TripType;
        destination?: string;
        category?: CabCategory;
        vehicleType: VehicleType;
      }>).detail);
    };

    const hash = window.location.hash;
    if (hash.startsWith('#book?')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      const trip = params.get('trip') as TripType | null;
      if (trip && ['HOURLY', 'AIRPORT', 'OUTSTATION'].includes(trip)) {
        applySelection({
          tripType: trip,
          destination: params.get('destination') || undefined,
          category: (params.get('category') as CabCategory | null) || undefined,
          vehicleType: (params.get('vehicle') as VehicleType | null) || undefined,
        });
      }
    }

    window.addEventListener('citycab:select-booking', onSelection);
    return () => window.removeEventListener('citycab:select-booking', onSelection);
  }, [clearErrors, setValue]);

  const moveNext = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const moveBack = () => setStep((current) => Math.max(current - 1, 0));

  async function handleSubmit() {
    setSubmitError(undefined);
    const formValues = getValues();
    const normalizedValues = {
      ...formValues,
      ...values,
      customerName: (values.customerName ?? formValues.customerName)?.trim(),
      phoneNumber: (values.phoneNumber ?? formValues.phoneNumber)?.trim(),
      pickupLocation: (values.pickupLocation ?? formValues.pickupLocation)?.trim(),
      destination: (values.destination ?? formValues.destination)?.trim(),
      bookingDate: (values.bookingDate ?? formValues.bookingDate)?.trim(),
      pickupTime: (values.pickupTime ?? formValues.pickupTime)?.trim(),
      email: (values.email ?? formValues.email)?.trim(),
    };
    const validation = bookingRequestSchema.safeParse(normalizedValues);
    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof BookingRequestInput;
        if (field) setError(field, { message: issue.message });
      });
      setStep(4);
      setSubmitError('Please complete the highlighted journey details before requesting your booking.');
      return;
    }

    try {
      setSubmitting(true);
      const result = await submitBooking(validation.data);
      setSubmittedReference(result.bookingReference);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your booking request.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedReference) {
    return (
      <section id="book" className="scroll-mt-20 bg-[#030712] py-20 sm:py-28">
        <div className="container max-w-3xl">
          <div className="overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[#071225] shadow-[0_24px_80px_-28px_rgba(34,211,238,0.25)]">
            <div className="bg-slate-950 p-8 text-center text-white sm:p-12">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <Check className="h-7 w-7" />
              </span>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Request received</p>
              <h2 className="mt-2 font-[Manrope] text-3xl font-bold">We have your journey details.</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-300">This is a booking request, not a confirmed cab allocation. Our team will review the details and contact you.</p>
            </div>
            <div className="bg-[#071225] p-8 text-center sm:p-10">
              <p className="text-sm font-medium text-slate-500">YOUR BOOKING REFERENCE</p>
              <p className="mt-2 font-[Manrope] text-3xl font-bold tracking-[0.12em] text-slate-950">{submittedReference}</p>
              <p className="mt-6 text-sm text-slate-500">Keep this reference handy for any follow-up. An acknowledgement is sent by email when you provide one.</p>
              <button className="btn-secondary mt-7" onClick={() => { setSubmittedReference(undefined); setStep(0); }} type="button">Start another request</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <section id="book" className="relative scroll-mt-20 overflow-hidden bg-[#030712] py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The booking studio</p>
          <h2 className="mt-4 font-[Manrope] text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">The journey starts with a few good details.</h2>
          <p className="mt-4 text-slate-300">Take a minute to share the essentials. We will confirm availability before any cab is allocated.</p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#071225] shadow-[0_32px_110px_-40px_rgba(34,211,238,0.35)]">
          <div className="border-b border-white/10 px-5 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              {steps.map((name, index) => (
                <button key={name} type="button" onClick={() => index < step && setStep(index)} className={`flex shrink-0 items-center gap-2 text-xs font-semibold ${index === step ? 'text-brand-700' : index < step ? 'text-slate-600' : 'text-slate-300'}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full ${index <= step ? 'bg-cyan-200 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>{index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>
                  <span className="hidden sm:inline">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.22 }}>
            {step === 0 && <TripStep value={tripType} onChange={(value) => setValue('tripType', value)} />}
            {step === 1 && <CategoryStep value={values.cabCategory} onChange={(value) => setValue('cabCategory', value)} />}
            {step === 2 && <CityStep value={values.city} onChange={(value) => setValue('city', value)} />}
            {step === 3 && <CustomerStep register={register} setValue={setValue} clearErrors={clearErrors} values={values} errors={errors} />}
            {step === 4 && <JourneyStep tripType={tripType} values={values} register={register} setValue={setValue} clearErrors={clearErrors} errors={errors} />}
            {step === 5 && <VehicleStep value={values.vehicleType} onChange={(value) => setValue('vehicleType', value)} />}
            {step === 6 && <ReviewStep values={values} />}
            </motion.div></AnimatePresence>

            {submitError && <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{submitError}</div>}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
              <button type="button" onClick={moveBack} disabled={step === 0 || submitting} className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-slate-600 disabled:invisible"><ArrowLeft className="h-4 w-4" /> Back</button>
              {step < steps.length - 1 ? (
                <button type="button" onClick={moveNext} className="btn-primary">Continue <ArrowRight className="h-4 w-4" /></button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={submitting} className="btn-primary">{submitting ? 'Sending request…' : 'Request My Booking'} <ArrowRight className="h-4 w-4" /></button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-slate-950/30 px-5 py-3 text-center text-xs text-slate-400"><ShieldCheck className="h-3.5 w-3.5 text-cyan-200" /> We only use your information to respond to this booking request.</div>
        </div>
      </div>
    </section>
  );
}

function TripStep({ value, onChange }: { value: TripType; onChange: (value: TripType) => void }) {
  const icons = { HOURLY: Clock3, AIRPORT: Plane, OUTSTATION: Route };
  return <StepHeading number="01" title="What kind of journey are you planning?" description="Choose a service to tailor the details we request." >
    <div className="grid gap-3 sm:grid-cols-3">{TRIP_TYPES.map((trip) => { const Icon = icons[trip.id]; return <CardChoice key={trip.id} selected={value === trip.id} onClick={() => onChange(trip.id)}><Icon className="h-5 w-5 text-brand-600" /><p className="mt-5 font-semibold text-slate-900">{trip.label}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{trip.description}</p></CardChoice>; })}</div>
  </StepHeading>;
}

function CategoryStep({ value, onChange }: { value: CabCategory; onChange: (value: CabCategory) => void }) {
  return <StepHeading number="02" title="Choose your cab category" description="This is a preference, subject to review and availability."><div className="grid gap-3 sm:grid-cols-3">{CAB_CATEGORIES.map((category) => <CardChoice key={category.id} selected={value === category.id} onClick={() => onChange(category.id)}><p className="font-semibold text-slate-900">{category.label}</p><p className="mt-2 text-xs text-slate-500">{category.description}</p></CardChoice>)}</div></StepHeading>;
}

function CityStep({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <StepHeading number="03" title="Where does your journey begin?" description="We are currently collecting requests for Bangalore."><div className="grid gap-3 sm:grid-cols-2">{CITIES.map((city) => <CardChoice key={city.id} selected={value === city.name} onClick={() => onChange(city.name)}><MapPin className="h-5 w-5 text-brand-600" /><p className="mt-4 font-semibold text-slate-900">{city.name}</p><p className="mt-1 text-xs text-slate-500">{city.countryCode} · Available to request</p></CardChoice>)}</div></StepHeading>;
}

function CustomerStep({ register, setValue, clearErrors, values, errors }: { register: UseFormRegister<BookingRequestInput>; setValue: UseFormSetValue<BookingRequestInput>; clearErrors: (name?: keyof BookingRequestInput | readonly (keyof BookingRequestInput)[]) => void; values: BookingRequestInput; errors: FieldErrors<BookingRequestInput> }) {
  const update = (field: keyof BookingRequestInput, value: string) => {
    setValue(field, value as never, { shouldDirty: true, shouldValidate: false });
    clearErrors(field);
  };
  return (
    <StepHeading number="04" title="Who should we contact?" description="A member of our team will use these details only for this request.">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.customerName?.message}><input className="input" autoComplete="name" placeholder="Your full name" value={values.customerName || ''} onChange={(event) => update('customerName', event.target.value)} /></Field>
        <Field label="Phone number" error={errors.phoneNumber?.message}><input className="input" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" value={values.phoneNumber || ''} onChange={(event) => update('phoneNumber', event.target.value)} /></Field>
        <div className="sm:col-span-2"><Field label="Email address (optional)" error={errors.email?.message}><input className="input" autoComplete="email" inputMode="email" placeholder="you@example.com" value={values.email || ''} onChange={(event) => update('email', event.target.value)} /></Field></div>
      </div>
    </StepHeading>
  );
}

function JourneyStep({ tripType, values, register, setValue, clearErrors, errors }: { tripType: TripType; values: BookingRequestInput; register: UseFormRegister<BookingRequestInput>; setValue: UseFormSetValue<BookingRequestInput>; clearErrors: (name?: keyof BookingRequestInput | readonly (keyof BookingRequestInput)[]) => void; errors: FieldErrors<BookingRequestInput> }) {
  const needsDestination = tripType !== 'HOURLY';
  const update = (field: keyof BookingRequestInput, value: string | number) => {
    setValue(field, value as never, { shouldDirty: true, shouldValidate: false });
    clearErrors(field);
  };

  return (
    <StepHeading number="05" title="Add the journey details" description="Please enter the complete journey details before continuing.">
      <div className="grid gap-5 sm:grid-cols-2">
        {tripType === 'AIRPORT' && (
          <>
            <div className="sm:col-span-2">
              <p className="label">Airport direction</p>
              <div className="grid grid-cols-2 gap-3">
                <CardChoice selected={values.airportType === 'PICKUP'} onClick={() => update('airportType', 'PICKUP')}><p className="font-semibold text-slate-900">Airport pickup</p><p className="mt-1 text-xs text-slate-500">Airport to your destination</p></CardChoice>
                <CardChoice selected={values.airportType === 'DROP_OFF'} onClick={() => update('airportType', 'DROP_OFF')}><p className="font-semibold text-slate-900">Airport drop-off</p><p className="mt-1 text-xs text-slate-500">Your pickup to the airport</p></CardChoice>
              </div>
            </div>
            <Field label="Airport" error={errors.airport?.message}><select className="input" value={values.airport || ''} onChange={(event) => update('airport', event.target.value)}><option value="Kempegowda International Airport (BLR)">Kempegowda International Airport (BLR)</option></select></Field>
            <Field label="Flight number (optional)" error={errors.flightNumber?.message}><input className="input" placeholder="e.g. AI 503" value={values.flightNumber || ''} onChange={(event) => update('flightNumber', event.target.value)} /></Field>
          </>
        )}
        {tripType === 'OUTSTATION' && (
          <div className="sm:col-span-2">
            <p className="label">Journey type</p>
            <div className="grid grid-cols-2 gap-3">
              <CardChoice selected={values.journeyType === 'ONE_WAY'} onClick={() => update('journeyType', 'ONE_WAY')}><p className="font-semibold text-slate-900">One way</p></CardChoice>
              <CardChoice selected={values.journeyType === 'ROUND_TRIP'} onClick={() => update('journeyType', 'ROUND_TRIP')}><p className="font-semibold text-slate-900">Round trip</p></CardChoice>
            </div>
          </div>
        )}
        <Field label="Pickup location" error={errors.pickupLocation?.message}><input className="input" placeholder="Enter area, landmark or address" value={values.pickupLocation || ''} onChange={(event) => update('pickupLocation', event.target.value)} /></Field>
        {needsDestination && <Field label="Destination" error={errors.destination?.message}><input className="input" placeholder="Enter area, landmark or address" value={values.destination || ''} onChange={(event) => update('destination', event.target.value)} /></Field>}
        {tripType === 'HOURLY' && (
          <Field label="Rental duration" error={errors.hourlyDuration?.message}><select className="input" value={values.hourlyDuration || ''} onChange={(event) => update('hourlyDuration', Number(event.target.value))}><option value="">Select duration</option>{[2, 4, 6, 8, 10, 12].map((hours) => <option key={hours} value={hours}>{hours} hours</option>)}</select></Field>
        )}
        <Field label={tripType === 'OUTSTATION' ? 'Departure date' : 'Booking date'} error={errors.bookingDate?.message}><input className="input" type="date" value={values.bookingDate || ''} onChange={(event) => update('bookingDate', event.target.value)} /></Field>
        {tripType === 'OUTSTATION' && values.journeyType === 'ROUND_TRIP' && <Field label="Return date" error={errors.returnDate?.message}><input className="input" type="date" value={values.returnDate || ''} onChange={(event) => update('returnDate', event.target.value)} /></Field>}
        <Field label={tripType === 'HOURLY' ? 'Start time' : 'Pickup time'} error={errors.pickupTime?.message}><select className="input" value={values.pickupTime || ''} onChange={(event) => update('pickupTime', event.target.value)}><option value="">Select time</option>{timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}</select></Field>
        <Field label="AM / PM" error={errors.amPm?.message}><div className="grid grid-cols-2 gap-3"><CardChoice selected={values.amPm === 'AM'} onClick={() => update('amPm', 'AM')}><p className="text-center font-semibold text-slate-900">AM</p></CardChoice><CardChoice selected={values.amPm === 'PM'} onClick={() => update('amPm', 'PM')}><p className="text-center font-semibold text-slate-900">PM</p></CardChoice></div></Field>
        <div className="sm:col-span-2"><Field label="Anything else we should know? (optional)" error={errors.specialNotes?.message}><textarea className="input min-h-24 resize-y" placeholder="Access notes, additional stop, luggage or accessibility requirements" value={values.specialNotes || ''} onChange={(event) => update('specialNotes', event.target.value)} /></Field></div>
      </div>
    </StepHeading>
  );
}

function VehicleStep({ value, onChange }: { value: VehicleType; onChange: (value: VehicleType) => void }) { return <StepHeading number="06" title="Select your preferred vehicle" description="Vehicle requests are subject to availability; our team will confirm the final allocation."><div className="grid gap-3 sm:grid-cols-3">{VEHICLES.map((vehicle) => <CardChoice key={vehicle.id} selected={value === vehicle.type} onClick={() => onChange(vehicle.type)}><UsersRound className="h-5 w-5 text-brand-600" /><p className="mt-5 font-semibold text-slate-900">{vehicle.label}</p><p className="mt-1 text-xs text-slate-500">{vehicle.description}</p><div className="mt-5 flex gap-3 text-xs font-medium text-slate-600"><span>{vehicle.capacity} seats</span><span className="flex items-center gap-1"><Luggage className="h-3.5 w-3.5" />{vehicle.luggage}</span></div></CardChoice>)}</div></StepHeading>; }

function ReviewStep({ values }: { values: BookingRequestInput }) { const find = <T extends { id: string; label: string }>(items: T[], id: string) => items.find((item) => item.id === id)?.label || id; const rows = [['Trip type', find(TRIP_TYPES, values.tripType)], ['Cab category', find(CAB_CATEGORIES, values.cabCategory)], ['City', values.city], ['Customer', values.customerName || '-'], ['Phone', values.phoneNumber || '-'], ['Pickup', values.pickupLocation || '-'], ...(values.destination ? [['Destination', values.destination]] : []), ['Date & time', values.bookingDate && values.pickupTime ? `${values.bookingDate} · ${values.pickupTime} ${values.amPm}` : '-'], ['Vehicle', find(VEHICLES.map((vehicle) => ({ id: vehicle.type, label: vehicle.label })), values.vehicleType)]]; return <StepHeading number="07" title="Review your request" description="Please check the information below before sending. You can use Back to edit any step."><div className="overflow-hidden rounded-2xl border border-slate-200">{rows.map(([label, detail]) => <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-slate-100 px-4 py-3 text-sm last:border-none sm:grid-cols-[10rem_1fr]" key={label}><span className="font-medium text-slate-500">{label}</span><span className="font-semibold text-slate-900">{detail}</span></div>)}</div></StepHeading>; }

function StepHeading({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) { return <div><p className="text-xs font-bold tracking-[0.18em] text-brand-700">STEP {number}</p><h3 className="mt-2 font-[Manrope] text-2xl font-bold tracking-tight text-slate-950">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p><div className="mt-7">{children}</div></div>; }
