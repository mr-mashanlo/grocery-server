import { DatabaseController } from './database-controller.js';

export class ProductController extends DatabaseController {

  constructor( databaseService, quantityService, validatorManager ) {
    super( databaseService, validatorManager );
    this.quantityService = quantityService;
  };

  get = async ( req, res, next ) => {
    try {
      const { id } = req.params;
      const product = await this.databaseService.getOne( { _id: id } );
      const quantity = await this.quantityService.getOne( { product: id } );
      const document = { ...product._doc, quantity };
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getMany = async ( req, res, next ) => {
    try {
      const { limit = 0, page = 1, ...others } = req.query;
      const products = await this.databaseService.getMany( others, { limit, page } );
      const quantities = await this.quantityService.getMany();
      const data = products.data.map( product => ( { ...product._doc, stock: quantities.data.find( quantity => quantity._doc.product.toString() === product._doc._id.toString() ) } ) );
      const document = { ...products, data };
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};