import { ProductService } from './application/product-service.js';
import { ProductController } from './infrastructure/product-controller.js';
import { ProductModel } from './infrastructure/product-model.js';
import { ProductRepository } from './infrastructure/product-repository.js';

export const productRepository = new ProductRepository( ProductModel );
const productService = new ProductService( productRepository );
export const productController = new ProductController( productService );