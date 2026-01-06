import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import z from 'zod';

export const ProductDTO = z.object( {
  image: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string().optional()
} );

export const Product = z.object( {
  _id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  archived: z.boolean(),
  category: z.string()
} );

export const ProductSchema = new Schema( {
  image: { type: String },
  title: { type: String, require: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, default: 0 },
  archived: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true }
} );

ProductSchema.plugin( autopopulate );

export const ProductModel = model( 'Product', ProductSchema );