import { z } from 'zod';
import { addressSchema } from './address.schema';

export const identitySchema = z.object({
  selfieUrl: z.string().min(1),
  phone: z.string().min(1),
  address: addressSchema,
});

export type IdentitySchemaInput = z.input<typeof identitySchema>;
