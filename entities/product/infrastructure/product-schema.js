import { z } from 'zod';

export const ProductSchema = z.object( {
  image: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  unit: z.enum( [ 'pc', 'kg' ] ),
  archived: z.boolean().optional(),
  category: z.string().optional()
} );