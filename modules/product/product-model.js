import { model, Schema } from 'mongoose';

const ProductSchema = new Schema( {
  name: { type: String, trim: true, require: true },
  slug: { type: String, trim: true, require: true },
  description: { type: String, trim: true },
  price: { type: Number, default: 0 },
  salePrice: { type: Number },
  archived: { type: Boolean, default: false },
  images: [ { type: Schema.Types.ObjectId, ref: 'Image' } ],
  categories: [ {
    _id: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String },
    slug: { type: String }
  } ]
} );

export const ProductModel = model( 'Product', ProductSchema );