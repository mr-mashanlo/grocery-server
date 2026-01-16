export class OrderRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async order => {
    return await this.model.create( order );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  findByUserId = async ( id ) => {
    return await this.model.find( { user: id } );
  };

}