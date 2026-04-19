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
      const product = await this.productService.deleteProduct( req.params.id );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  getProducts = async ( req, res, next ) => {
    try {
      const products = await this.productService.getProducts( req.query );
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

  getProductBySlug = async ( req, res, next ) => {
    try {
      const product = await this.productService.getProductBySlug( req.params.slug );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

  updateProduct = async ( req, res, next ) => {
    try {
      const product = await this.productService.updateProduct( req.params.id, req.body );
      res.json( product );
    } catch ( error ) {
      next( error );
    }
  };

};