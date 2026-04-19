import slug from 'slug';

import { CategoryFilteringSchema, CategoryPaginationSchema, CategorySchema, CategorySortingSchema } from './category-schema.js';

export class CategoryService {

  constructor( categoryRepository ) {
    this.categoryRepository = categoryRepository;
  };

  createCategory = async body => {
    CategorySchema.parse( body );
    return await this.categoryRepository.create( { ...body, slug: slug( body.name ) } );
  };

  deleteCategory = async id => {
    return await this.categoryRepository.delete( { _id: id } );
  };

  getCategories = async query => {
    const filters = CategoryFilteringSchema.parse( query );
    const sort = CategorySortingSchema.parse( query );
    const pagination = CategoryPaginationSchema.parse( query );
    const data = await this.categoryRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.categoryRepository.count( { filters } );
    return { data, total, ...pagination };
  };

  getCategoryById = async id => {
    return await this.categoryRepository.findById( id );
  };

  updateCategory = async ( id, body ) => {
    CategorySchema.parse( body );
    return await this.categoryRepository.update( { _id: id }, { ...body, slug: slug( body.name ) } );
  };

};