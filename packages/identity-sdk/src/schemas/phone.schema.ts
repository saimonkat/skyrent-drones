import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export const phoneSchema = z
  .object({
    countryCode: z.string().length(2),
    phoneNumber: z.string().min(1, 'Phone number is required'),
  })
  .refine(
    (data) => isValidPhoneNumber(data.phoneNumber, { defaultCountry: data.countryCode as never }),
    { message: 'Invalid phone number for selected country' },
  );

export type PhoneSchemaInput = z.input<typeof phoneSchema>;
