export class OrderRepository {

  constructor( model ) {
    this.model = model;
  }

  count = async ( { filters, sort } ) => {
    return await this.model.countDocuments( filters ).sort( sort );
  };

  create = async order => {
    return await this.model.create( order );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.model.find( filters ).sort( sort ).limit( pagination.limit ).skip( pagination.skip );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  findByUserId = async ( id ) => {
    return await this.model.find( { user: id } );
  };

  updateOrderStatus = async ( id, status ) => {
    return await this.model.findOneAndUpdate( { _id: id }, { status }, { new: true } );
  };

}