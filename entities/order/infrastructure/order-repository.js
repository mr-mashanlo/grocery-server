export class OrderRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async order => {
    return await this.model.create( order );
  };

  find = async ( { filter, sort } ) => {
    return await this.model.find( filter ).sort( sort );
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