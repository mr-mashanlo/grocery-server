import { model, mongoose, Schema } from 'mongoose';

const CategorySchema = new Schema( {
  image: { type: Schema.Types.ObjectId, ref: 'Image', require: true, index: true },
  name: { type: String, trim: true, require: true },
  slug: { type: String, trim: true, require: true },
  archived: { type: Boolean, default: false }
} );

CategorySchema.pre( 'deleteMany', async function() {
  await mongoose.model( 'Product' ).updateMany(
    { categories: this.getQuery()._id },
    { $pull: { categories: this.getQuery()._id } }
  );
} );

CategorySchema.post( 'findOneAndUpdate', async function () {
  await mongoose.model( 'Product' ).updateMany(
    { 'categories._id': this.getQuery()._id },
    { $set: { 'categories.$.name': this.getUpdate().$set.name, 'categories.$.slug': this.getUpdate().$set.slug } }
  );
} );

export const CategoryModel = model( 'Category', CategorySchema );
