import { ImageFilteringSchema, ImagePaginationSchema, ImageSchema, ImageSortingSchema } from './image-schema.js';

export class ImageService {

  constructor( imageRepository ) {
    this.imageRepository = imageRepository;
  };

  createImage = async image => {
    ImageSchema.parse( image );
    return await this.imageRepository.create( image );
  };

  deleteImage = async id => {
    return await this.imageRepository.delete( { _id: id } );
  };

  getImages = async query => {
    const filters = ImageFilteringSchema.parse( query );
    const sort = ImageSortingSchema.parse( query );
    const pagination = ImagePaginationSchema.parse( query );
    const data = await this.imageRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.imageRepository.count( { filters } );
    return { data, total, ...pagination };
  };

  getImageById = async id => {
    return await this.imageRepository.findById( id );
  };

  updateImage = async ( id, image ) => {
    ImageSchema.omit( { path: true, url: true } ).parse( image );
    return await this.imageRepository.update( { _id: id }, image );
  };

};