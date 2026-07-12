export class ProductRepository {

  constructor( model ) {
    this.model = model;
  }

  count = async ( { filters } ) => {
    return await this.model.countDocuments( filters );
  };

  create = async data => {
    return await this.model.create( data );
  };

  delete = async query => {
    return await this.model.deleteMany( query );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.model.find( filters ).sort( sort ).limit( pagination.limit ).skip( pagination.skip ).populate( [ 'images', 'categories' ] );
    // return await this.model.aggregate( [
    //   { $match: filters },
    //   {
    //     $lookup: {
    //       from: 'images',
    //       localField: 'images',
    //       foreignField: '_id',
    //       as: 'fetchedImages'
    //     }
    //   },
    //   {
    //     $set: {
    //       images: {
    //         $map: {
    //           input: '$images',
    //           as: 'id',
    //           in: {
    //             $arrayElemAt: [
    //               {
    //                 $filter: {
    //                   input: '$fetchedImages',
    //                   as: 'img',
    //                   cond: { $eq: [ '$$img._id', '$$id' ] }
    //                 }
    //               },
    //               0
    //             ]
    //           }
    //         }
    //       }
    //     }
    //   },
    //   { $unset: 'fetchedImages' },
    //   { $sort: sort },
    //   { $skip: pagination.skip },
    //   { $limit: pagination.limit }
    // ] );
  };

  findById = async _id => {
    return await this.model.findOne( { _id } ).populate( [ 'images', 'categories' ] );
  };

  findOne = async query => {
    return await this.model.findOne( query ).populate( [ 'images', 'categories' ] );
  };

  update = async ( query, data ) => {
    return await this.model.findOneAndUpdate( query, data, { returnDocument: 'after' } );
  };

}