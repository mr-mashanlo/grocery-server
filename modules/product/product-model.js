import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const ProductSchema = new Schema( {
  image: { type: String },
  title: { type: String, require: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  unit: { type: String, default: 'pc' },
  archived: { type: Boolean, default: false },
  createdAt: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true }
} );

ProductSchema.plugin( autopopulate );

export const ProductModel = model( 'Product', ProductSchema );