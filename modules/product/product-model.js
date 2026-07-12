import { model, Schema } from 'mongoose';

const ProductSchema = new Schema( {
  name: { type: String, trim: true, require: true },
  slug: { type: String, trim: true, require: true },
  sku: { type: String },
  description: { type: String, trim: true },
  price: { type: Number, default: 0 },
  archived: { type: Boolean, default: false },
  images: [ { type: Schema.Types.ObjectId, ref: 'Image' } ],
  categories: [ { type: Schema.Types.ObjectId, ref: 'Category' } ]
} );

export const ProductModel = model( 'Product', ProductSchema );