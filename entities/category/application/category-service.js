import moment from 'moment';

export class CategoryService {

  constructor( categoryRepository ) {
    this.categoryRepository = categoryRepository;
  };

  createCategory = async category => {
    const createdAt = moment().format( 'YYYY-MM-DD' );
    return await this.categoryRepository.create( { ...category, createdAt } );
  };

  getAllCategories = async ( query ) => {
    const filters = {};
    const sort = {};

    if ( query.archived !== undefined ) {
      filters.archived = query.archived === 'true';
    }

    const allowedSortFields = [ 'title', 'createdAt' ];

    if ( allowedSortFields.includes( query.sort ) ) {
      sort[query.sort] = query.order === 'desc' ? -1 : 1;
    }

    return await this.categoryRepository.find( { filters, sort } );
  };

  deleteCategory = async id => {
    return await this.categoryRepository.delete( id );
  };

  getCategoryById = async id => {
    return await this.categoryRepository.findById( id );
  };

  updateCategory = async ( id, category ) => {
    return await this.categoryRepository.update( id, category );
  };

};