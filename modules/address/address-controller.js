export class AddressController {

  constructor( addressService ) {
    this.addressService = addressService;
  };

  createMyAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.createMyAddress( req.user.id, req.body );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  getMyAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.getMyAddress(  req.user.id );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

  updateMyAddress = async ( req, res, next ) => {
    try {
      const address = await this.addressService.updateMyAddress( req.params.id, req.body );
      res.json( address );
    } catch ( error ) {
      next( error );
    }
  };

};