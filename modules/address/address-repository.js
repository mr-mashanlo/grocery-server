export class AddressRepository {

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
    return await this.model.find( filters ).sort( sort ).limit( pagination.limit ).skip( pagination.skip );
  };

  findById = async _id => {
    return await this.model.findOne( { _id } );
  };

  findOne = async query => {
    return await this.model.findOne( query );
  };

  update = async ( query, data ) => {
    return await this.model.findOneAndUpdate( query, data, { returnDocument: 'after' } );
  };

}