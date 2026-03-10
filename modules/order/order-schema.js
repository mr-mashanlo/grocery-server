import { z } from 'zod';

export const OrderSchema = z.object( {
  address: z.string(),
  products: z.array( z.object( { _id: z.string(), quantity: z.number(), price: z.number() } ) ),
  totalPrice: z.number(),
  totalQuantity: z.number()
} );