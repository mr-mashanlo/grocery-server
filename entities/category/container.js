import { CategoryService } from './application/category-service.js';
import { CategoryController } from './infrastructure/category-controller.js';
import { CategoryModel } from './infrastructure/category-model.js';
import { CategoryRepository } from './infrastructure/category-repository.js';

const categoryRepository = new CategoryRepository( CategoryModel );
const categoryService = new CategoryService( categoryRepository );
export const categoryController = new CategoryController( categoryService );