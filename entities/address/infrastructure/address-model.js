import { model, Schema } from 'mongoose';

const AddressSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true, index: true },
  region: { type: String, trim: true, require: true },
  district: { type: String, trim: true, require: true },
  city: { type: String, trim: true, require: true },
  street: { type: String, trim: true, require: true },
  address: { type: String, trim: true, require: true },
  phone: { type: String, trim: true, require: true }
} );

export const AddressModel = model( 'Address', AddressSchema );