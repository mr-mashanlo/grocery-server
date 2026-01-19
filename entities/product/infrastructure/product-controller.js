export class ProductController {

  constructor( productService ) {
    this.productService = productService;
  };

  createProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.createProduct( req.body );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  deleteProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.createProduct( req.params.id );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  getAllProducts = async ( req, res, next ) => {
    try {
      const products = await this.productService.getAllProducts( {
        category: req.query.category,
        archived: req.query.archived,
        sort: req.query.sort,
        order: req.query.order,
        page: req.query.page,
        limit: req.query.limit
      } );
      res.json( products );
    } catch ( error ) {
      next( error );
    }
  };

  getProductById = async ( req, res, next ) => {
    try {
      const product = await this.productService.getProductById( req.params.id );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  updateProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.updateProduct( req.params.id );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

};