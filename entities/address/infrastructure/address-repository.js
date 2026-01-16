export class AddressRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async address => {
    return await this.model.create( address );
  };

  findByUserId = async id => {
    return await this.model.findOne( { user: id } );
  };

  update = async ( id, address ) => {
    return await this.model.findOneAndUpdate( { _id: id }, address );
  };

}