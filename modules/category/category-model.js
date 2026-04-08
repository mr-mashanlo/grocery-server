import { model, Schema } from 'mongoose';

const CategorySchema = new Schema( {
  name: { type: String, trim: true, require: true },
  slug: { type: String, trim: true, require: true },
  archived: { type: Boolean, default: false }
} );

export const CategoryModel = model( 'Category', CategorySchema );
