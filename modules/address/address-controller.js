export class AddressController {

  constructor( addressService ) {
    this.addressService = addressService;
  };

  createAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.createAddress( { ...req.body, user: req.user.id } );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.deleteAddress( req.params.id );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  getAddresses = async ( req, res, next ) => {
    try {
      const addresses = await this.addressService.getAddresses( req.query );
      res.json( addresses );
    } catch ( error ) {
      next( error );
    }
  };

  getAddressById = async ( req, res, next ) => {
    try {
      const address = await this.addressService.getAddressById( req.params.id );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  getMyAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.getAddress( { user: req.user.id } );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  updateAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.updateAddress( req.params.id, req.body );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

};