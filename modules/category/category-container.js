import { categoryImageRepository } from '../category-image/category-image-container.js';
import { imageRepository } from '../image/image-container.js';
import { CategoryController } from './category-controller.js';
import { CategoryModel } from './category-model.js';
import { CategoryRepository } from './category-repository.js';
import { CategoryService } from './category-service.js';

export const categoryRepository = new CategoryRepository( CategoryModel );
const categoryService = new CategoryService( categoryRepository, categoryImageRepository, imageRepository );
export const categoryController = new CategoryController( categoryService );