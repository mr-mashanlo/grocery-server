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
    const pagination = {};

    if ( query.archived !== undefined ) {
      filters.archived = query.archived === 'true';
    }

    const allowedSortFields = [ 'title', 'createdAt' ];

    if ( allowedSortFields.includes( query.sort ) ) {
      sort[query.sort] = query.order === 'desc' ? -1 : 1;
    }

    const limit = Math.min( Number( query.limit || 20 ), 100 );
    const page = Number( query.page ) || 1;

    pagination.limit = limit;
    pagination.skip = ( page - 1 ) * limit;

    const categories = await this.categoryRepository.find( { filters, sort, pagination } );
    const total = await this.categoryRepository.count( { filters, sort } );

    return { data: categories, total, page, limit  };
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