import { model, Schema } from 'mongoose';
import z from 'zod';

export const User = z.object( {
  nickname: z.string().min( 4, 'Nickname must be at least 4 characters long' ),
  password: z.string().min( 8, 'Password must be at least 4 characters long' )
} );

export const UserSchema = new Schema( {
  nickname: { type: String, unique: true, require: true, trim: true, lowercase: true, index: true },
  password: { type: String, require: true, trim: true }
} );

export const UserModel = model( 'User', UserSchema );