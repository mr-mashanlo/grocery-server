import { DatabaseController } from './database-controller.js';

export class AddressController extends DatabaseController {

  get = async ( req, res, next ) => {
    try {
      const user = req.user;
      const document = await this.databaseService.getOne( { user } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  upgrade = async ( req, res, next ) => {
    try {
      const user = req.user;
      const data = req.body;
      const validatedData = this.validatorManager.parse( data );
      const document = await this.databaseService.upgrade( { user }, validatedData );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};