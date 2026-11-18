import { z } from 'zod';

export const bookingRequestSchema = z
  .object({
    customerName: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(80, 'Name is too long'),
    phoneNumber: z
      .string({ required_error: 'Phone is required' })
      .regex(
        /^(?:\+91[ -]?)?[6-9]\d{9}$/,
        'Enter a valid Indian mobile number'
      ),
    email: z
      .string()
      .email('Enter a valid email')
      .optional()
      .or(z.literal('').optional()),
    tripType: z.enum(['HOURLY', 'AIRPORT', 'OUTSTATION', 'SELF_DRIVE', 'DRIVER_ON_HIRE']),
    serviceId: z
      .enum(['airport', 'local', 'hourly', 'outstation', 'group', 'self-drive', 'driver-on-hire'])
      .optional(),
    licenseNote: z.string().max(300).optional().or(z.literal('')),
    ownVehicleDetails: z.string().max(300).optional().or(z.literal('')),
    cabCategory: z.enum(['COMFORT', 'PREMIUM', 'TT']),
    city: z.string().min(1),
    pickupLocation: z.string().min(3, 'Pickup location is required'),
    destination: z.string().trim().max(180).optional().or(z.literal('')),
    bookingDate: z.string().min(1, 'Date is required'),
    pickupTime: z.string().min(1, 'Time is required'),
    amPm: z.enum(['AM', 'PM']),
    vehicleType: z.enum(['SEATER_5', 'SEATER_7', 'TT_12']),
    // Conditional fields
    hourlyDuration: z.number().int().min(1).max(24).optional(),
    airport: z.string().optional(),
    airportType: z.enum(['PICKUP', 'DROP_OFF']).optional(),
    flightNumber: z
      .string()
      .regex(/^[A-Za-z0-9 ]{2,10}$/, 'Enter a valid flight number')
      .optional()
      .or(z.literal('')),
    journeyType: z.enum(['ONE_WAY', 'ROUND_TRIP']).optional(),
    returnDate: z.string().optional(),
    specialNotes: z.string().max(500).optional(),
  })
  .refine(
    (data) => {
      if (data.tripType === 'HOURLY') {
        return data.hourlyDuration !== undefined && data.hourlyDuration >= 1;
      }
      return true;
    },
    {
      message: 'Rental duration is required for hourly rentals',
      path: ['hourlyDuration'],
    }
  )
  .refine(
    (data) => {
      if (data.tripType === 'SELF_DRIVE') {
        return Boolean(data.licenseNote?.trim() || data.specialNotes?.trim());
      }
      return true;
    },
    {
      message: 'Tell us your licence type or any self-drive requirement',
      path: ['licenseNote'],
    }
  )
  .refine(
    (data) => {
      if (data.tripType === 'DRIVER_ON_HIRE') {
        return Boolean(data.ownVehicleDetails?.trim() || data.specialNotes?.trim());
      }
      return true;
    },
    {
      message: 'Tell us about your vehicle so we can arrange a suitable driver',
      path: ['ownVehicleDetails'],
    }
  )
  .refine(
    (data) => data.tripType === 'HOURLY' || Boolean(data.destination?.trim()),
    { message: 'Destination is required', path: ['destination'] }
  )
  .refine(
    (data) => {
      if (data.tripType === 'AIRPORT') {
        return !!data.airport && !!data.airportType;
      }
      return true;
    },
    {
      message: 'Airport and transfer direction are required',
      path: ['airport'],
    }
  )
  .refine(
    (data) => {
      if (data.tripType === 'OUTSTATION' && data.journeyType === 'ROUND_TRIP') {
        return !!data.returnDate;
      }
      return true;
    },
    {
      message: 'Return date is required for round-trip outstation',
      path: ['returnDate'],
    }
  )
  .refine(
    (data) => !data.returnDate || !data.bookingDate || data.returnDate >= data.bookingDate,
    {
      message: 'Return date must be on or after departure',
      path: ['returnDate'],
    }
  );

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
