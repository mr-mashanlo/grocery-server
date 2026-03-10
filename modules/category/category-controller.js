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
      const category = await this.categoryService.createCategory( req.params.id );
      res.json( category );
    } catch ( error ) {
      next( error );
    }
  };

  getAllCategories = async ( req, res, next ) => {
    try {
      const categories = await this.categoryService.getAllCategories( {
        archived: req.query.archived,
        sort: req.query.sort,
        order: req.query.order,
        page: req.query.page,
        limit: req.query.limit
      } );
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
      const category = await this.categoryService.updateCategory( req.params.id );
      res.json( category );
    } catch ( error ) {
      next( error );
    }
  };

};