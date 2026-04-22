import { model, Schema } from 'mongoose';

const OrderSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true, index: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', require: true },
  status: { type: String, default: 'Processing' },
  total: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  products: [ {
    _id: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: {
      alt: { type: String },
      url: { type: String }
    }
  } ],
  createdAt: { type: String }
} );

export const OrderModel = model( 'Order', OrderSchema );