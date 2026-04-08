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
          from: 'category-images',
          let: { categoryId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: [ '$category', '$$categoryId' ] } } },
            {
              $lookup: {
                from: 'images',
                localField: 'image',
                foreignField: '_id',
                as: 'imageData'
              }
            },
            { $unwind: '$imageData' },
            { $replaceRoot: { newRoot: '$imageData' } }
          ],
          as: 'image'
        }
      },
      { $unwind: { path: '$image', preserveNullAndEmptyArrays: true } },
      { $sort: sort },
      { $skip: pagination.skip },
      { $limit: pagination.limit }
    ] );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  findOne = async query => {
    return await this.model.findOne( query );
  };

  update = async ( query, data ) => {
    return await this.model.findOneAndUpdate( query, data, { returnDocument: 'after' } );
  };

}