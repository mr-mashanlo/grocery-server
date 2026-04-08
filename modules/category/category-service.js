import slug from 'slug';

import { CategoryFilteringSchema, CategoryPaginationSchema, CategorySortingSchema } from './category-schema.js';

export class CategoryService {

  constructor( categoryRepository, categoryImageRepository, imageRepository ) {
    this.categoryRepository = categoryRepository;
    this.categoryImageRepository = categoryImageRepository;
    this.imageRepository = imageRepository;
  };

  createCategory = async body => {
    const category = await this.categoryRepository.create( { name: body.name, slug: slug( body.name ) } );
    await this.categoryImageRepository.create( { category: category._id, image: body.image } );
    const image = await this.imageRepository.findById( body.image );
    return { ...category._doc, image };
  };

  deleteCategory = async id => {
    await this.categoryRepository.delete( { _id: id } );
    await this.categoryImageRepository.delete( { category: id } );
    return { ok: true };
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
    const category = await this.categoryRepository.findById( id );
    const categoryImage = await this.categoryImageRepository.findOne( { category: id } );
    const image = await this.imageRepository.findById( categoryImage.image );
    return { ...category._doc, image };
  };

  updateCategory = async ( id, body ) => {
    const category = await this.categoryRepository.update( { _id: id }, { name: body.name, archived: body.archived, slug: slug( body.name ) } );
    await this.categoryImageRepository.update( { category: category._id }, { image: body.image } );
    const image = await this.imageRepository.findById( body.image );
    return { ...category._doc, image };
  };

};