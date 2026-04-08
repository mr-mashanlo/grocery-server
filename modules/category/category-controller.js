export class CategoryController {

  constructor( categoryService ) {
    this.categoryService = categoryService;
  };

  createCategory = async ( req, res, next ) => {
    try {
      const category = await this.categoryService.createCategory( req.body );
      res.json( category );
    } catch ( error ) {
      next( error );
    }
  };

  deleteCategory = async ( req, res, next ) => {
    try {
      const category = await this.categoryService.deleteCategory( req.params.id );
      res.json( category );
    } catch ( error ) {
      next( error );
    }
  };

  getCategories = async ( req, res, next ) => {
    try {
      const categories = await this.categoryService.getCategories( req.query );
      res.json( categories );
    } catch ( error ) {
      next( error );
    }
  };

  getCategoryById = async ( req, res, next ) => {
    try {
      const category = await this.categoryService.getCategoryById( req.params.id );
      res.json( category );
    } catch ( error ) {
      next( error );
    }
  };

  updateCategory = async ( req, res, next ) => {
    try {
      const category = await this.categoryService.updateCategory( req.params.id, req.body );
      res.json( category );
    } catch ( error ) {
      next( error );
    }
  };

};