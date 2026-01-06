import { Router } from 'express';

import { ProductController } from '../controllers/product-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { ProductDTO, ProductModel } from '../models/product.js';
import { QuantityModel } from '../models/quantity.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( ProductDTO );
const productService = new DatabaseService( ProductModel );
const quantityService = new DatabaseService( QuantityModel );
const databaseController = new ProductController( productService, quantityService, validatorManager );

router.post( '/', authMiddleware, databaseController.create );
router.get( '/', databaseController.getMany );
router.get( '/:id', databaseController.get );

export { router as productRouter };