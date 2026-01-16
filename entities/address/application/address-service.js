export class AddressService {

  constructor( addressRepository ) {
    this.addressRepository = addressRepository;
  };

  createMyAddress = async ( id, address ) => {
    return await this.addressRepository.create( { user: id, ...address } );
  };

  getMyAddress = async id => {
    return await this.addressRepository.findByUserId( id );
  };

  updateMyAddress = async ( id, address ) => {
    return await this.addressRepository.update( id, address );
  };

};