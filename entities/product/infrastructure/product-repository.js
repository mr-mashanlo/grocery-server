export class ProductRepository {

  constructor( model ) {
    this.model = model;
  }

  count = async ( { filters, sort } ) => {
    return await this.model.countDocuments( filters ).sort( sort );
  };

  create = async product => {
    return await this.model.create( product );
  };

  delete = async id => {
    return await this.model.delete( { _id: id } );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.model.find( filters ).sort( sort ).limit( pagination.limit ).skip( pagination.skip );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  update = async ( id, product ) => {
    return await this.model.findOneAndUpdate( { _id: id }, product, { new: true } );
  };

}