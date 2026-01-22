import moment from 'moment';

export class ProductService {

  constructor( productRepository, categoryRepository ) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  };

  createProduct = async product => {
    const createdAt = moment().format( 'YYYY-MM-DD' );
    return await this.productRepository.create( { ...product, createdAt } );
  };

  getAllProducts = async ( query ) => {
    const filters = {};
    const sort = {};
    const pagination = {};

    if ( query.category ) {
      const category = await this.categoryRepository.findBySlug( query.category );
      filters.category = category._id;
    }

    if ( query.archived !== undefined ) {
      filters.archived = query.archived === 'true';
    }

    const allowedSortFields = [ 'title', 'price', 'createdAt' ];

    if ( allowedSortFields.includes( query.sort ) ) {
      sort[query.sort] = query.order === 'desc' ? -1 : 1;
    }

    const limit = Math.min( Number( query.limit ) || 20, 100 );
    const page = Number( query.page ) || 1;

    pagination.limit = limit;
    pagination.skip = ( page - 1 ) * limit;

    return await this.productRepository.find( { filters, sort, pagination } );
  };

  deleteProduct = async id => {
    return await this.productRepository.delete( id );
  };

  getProductById = async id => {
    return await this.productRepository.findById( id );
  };

  updateProduct = async ( id, product ) => {
    return await this.productRepository.update( id, product );
  };

};