import { categoryRepository } from '../category/category-container.js';
import { ProductController } from './product-controller.js';
import { ProductModel } from './product-model.js';
import { ProductRepository } from './product-repository.js';
import { ProductService } from './product-service.js';

export const productRepository = new ProductRepository( ProductModel );
const productService = new ProductService( productRepository, categoryRepository );
export const productController = new ProductController( productService );