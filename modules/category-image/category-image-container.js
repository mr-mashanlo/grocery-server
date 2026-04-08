import { CategoryImageModel } from './category-image-model.js';
import { CategoryImageRepository } from './category-image-repository.js';

export const categoryImageRepository = new CategoryImageRepository( CategoryImageModel );