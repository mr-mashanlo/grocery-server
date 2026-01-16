import { z } from 'zod';

export const AddressSchema = z.object( {
  region: z.string(),
  city: z.string(),
  street: z.string(),
  address: z.string(),
  phone: z.string()
} );