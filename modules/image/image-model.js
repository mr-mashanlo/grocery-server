import { model, Schema } from 'mongoose';

const ImageSchema = new Schema( {
  path: { type: String },
  url: { type: String },
  alt: { type: String }
} );

export const ImageModel = model( 'Image', ImageSchema );