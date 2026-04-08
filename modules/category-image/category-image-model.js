import { model, Schema } from 'mongoose';

const CategoryImageSchema = new Schema( {
  category: { type: Schema.Types.ObjectId, ref: 'Category', require: true, index: true },
  image: { type: Schema.Types.ObjectId, ref: 'Image', require: true, index: true }
} );

export const CategoryImageModel = model( 'Category-Image', CategoryImageSchema );