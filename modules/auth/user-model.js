import { model, Schema } from 'mongoose';

export const UserSchema = new Schema( {
  nickname: { type: String, unique: true, require: true, trim: true, lowercase: true, index: true },
  password: { type: String, require: true },
  refreshToken: { type: String },
  expiredAt: { type: Number }
} );

export const UserModel = model( 'User', UserSchema );