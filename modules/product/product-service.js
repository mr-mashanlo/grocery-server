import slug from 'slug';

import { ProductFilteringSchema, ProductPaginationSchema, ProductSchema, ProductSortingSchema } from './product-schema.js';

export class ProductService {

  constructor( productRepository ) {
    this.productRepository = productRepository;
  };

  createProduct = async body => {
    ProductSchema.omit( { slug: true } ).parse( body );
    return await this.productRepository.create( { ...body, slug: slug( body.name ) } );
  };

  deleteProduct = async id => {
    return await this.productRepository.delete( { _id: id } );
  };

  getProducts = async query => {
    const filters = ProductFilteringSchema.parse( query );
    const sort = ProductSortingSchema.parse( query );
    const pagination = ProductPaginationSchema.parse( query );
    const data = await this.productRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.productRepository.count( { filters } );
    return { data, total, ...pagination };
  };

  getProductById = async id => {
    return await this.productRepository.findById( id );
  };

  getProductBySlug = async slug => {
    return await this.productRepository.findOne( { slug } );
  };

  updateProduct = async ( id, body ) => {
    ProductSchema.omit( { slug: true } ).parse( body );
    return await this.productRepository.update( { _id: id }, { ...body, slug: slug( body.name ) } );
  };

};