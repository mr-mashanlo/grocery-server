import { model, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const OrderSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true, index: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', require: true, index: true, autopopulate: true },
  products: [ { product: { type: Schema.Types.ObjectId, ref: 'Product', require: true, autopopulate: true }, price: { type: Number, default: 0 }, quantity: { type: Number, default: 0 } } ],
  status: { type: String, default: 'Processing' },
  totalPrice: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
  createdAt: { type: String }
} );

OrderSchema.plugin( autopopulate );

export const OrderModel = model( 'Order', OrderSchema );