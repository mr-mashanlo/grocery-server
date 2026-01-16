import { model, Schema } from 'mongoose';

const CategorySchema = new Schema( {
  image: { type: String },
  title: { type: String, trim: true, require: true },
  slug: { type: String, trim: true, require: true },
  archived: { type: Boolean, default: false },
  createdAt: { type: String }
} );

export const CategoryModel = model( 'Category', CategorySchema );