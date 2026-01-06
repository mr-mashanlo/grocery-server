import { model, Schema } from 'mongoose';
import z from 'zod';

export const CategoryDTO = z.object( {
  image: z.string().optional(),
  title: z.string(),
  slug: z.string()
} );

export const Category = z.object( {
  _id: z.string(),
  image: z.string(),
  title: z.string(),
  slug: z.string(),
  archived: z.boolean()
} );

export const CategorySchema = new Schema( {
  image: { type: String },
  title: { type: String, trim: true, require: true },
  slug: { type: String, trim: true, require: true },
  archived: { type: Boolean, default: false }
} );

export const CategoryModel = model( 'Category', CategorySchema );