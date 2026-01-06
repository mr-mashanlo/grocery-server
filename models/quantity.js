import { model, Schema } from 'mongoose';
import z from 'zod';

export const QuantityDTO = z.object( {
  product: z.string(),
  quantity: z.number(),
  unit: z.enum( [ 'kg', 'ps' ] )
} );

export const Quantity = z.object( {
  _id: z.string(),
  product: z.string(),
  quantity: z.number(),
  unit: z.enum( [ 'kg', 'ps' ] )
} );

export const QuantitySchema = new Schema( {
  product: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
  quantity: { type: Number, default: 0 },
  unit: { type: String }
} );

export const QuantityModel = model( 'Quantity', QuantitySchema );