export class CategoryRepository {

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
    return await this.model.aggregate( [
      { $match: filters },
      {
        $lookup: {
          from: 'images',
          localField: 'image',
          foreignField: '_id',
          as: 'image'
        }
      },
      {
        $unwind: {
          path: '$image',
          preserveNullAndEmptyArrays: true
        }
      },
      { $sort: sort },
      { $skip: pagination.skip },
      { $limit: pagination.limit }
    ] );
  };

  findById = async _id => {
    return await this.model.findOne( { _id } ).populate( [ 'image' ] );
  };

  findBySlug = async slug => {
    return await this.model.findOne( { slug } ).populate( [ 'images' ] );
  };

  findOne = async query => {
    return await this.model.findOne( query ).populate( [ 'image' ] );
  };

  update = async ( query, data ) => {
    return await this.model.findOneAndUpdate( query, data, { returnDocument: 'after' } );
  };

}