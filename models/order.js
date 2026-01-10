import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import z from 'zod';

export const OrderDTO = z.object( {
  address: z.string(),
  products: z.array( z.object( { _id: z.string(), price: z.number(), quantity: z.number() } ) ),
  totalPrice: z.number(),
  totalQuantity: z.number()
} );

export const Order = z.object( {
  _id: z.string(),
  user: z.string(),
  address: z.string(),
  products: z.array( z.object( { _id: z.string(), price: z.number(), quantity: z.number() } ) ),
  status: z.enum( [ 'Processing', 'Shipped', 'Delivered', 'Canceled' ] ),
  totalPrice: z.number(),
  totalQuantity: z.number(),
  createdAt: z.string()
} );

export const OrderSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true, index: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', require: true, index: true, autopopulate: true },
  products: [ { _id: { type: Schema.Types.ObjectId, ref: 'Product', require: true }, price: { type: Number, default: 0 }, quantity: { type: Number, default: 0 } } ],
  status: { type: String, default: 'Processing' },
  totalPrice: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
  createdAt: { type: String }
} );

OrderSchema.plugin( autopopulate );

export const OrderModel = model( 'Order', OrderSchema );