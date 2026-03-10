import { z } from 'zod';

export const CategorySchema = z.object( {
  image: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  archived: z.boolean().optional()
} );