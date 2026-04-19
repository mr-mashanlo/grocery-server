import { model, mongoose, Schema } from 'mongoose';

const ImageSchema = new Schema( {
  path: { type: String },
  url: { type: String },
  alt: { type: String }
} );

ImageSchema.pre( 'deleteMany', async function() {
  await mongoose.model( 'Product' ).updateMany(
    { images: this.getQuery()._id },
    { $pull: { images: this.getQuery()._id } }
  );
} );

export const ImageModel = model( 'Image', ImageSchema );