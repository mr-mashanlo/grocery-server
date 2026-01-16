export class ProductRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async product => {
    return await this.model.create( product );
  };

  delete = async id => {
    return await this.model.delete( { _id: id } );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  findMany = async ( { filters, sort, pagination } ) => {
    return await this.model.find( filters ).sort( sort ).limit( pagination.limit ).skip( pagination.skip );
  };

  update = async ( id, product ) => {
    return await this.model.findOneAndUpdate( { _id: id }, product );
  };

}