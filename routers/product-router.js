import { Router } from 'express';

import { tokenService } from '../entities/auth/container.js';
import { isAuth } from '../entities/auth/infrastructure/is-auth.js';
import { productController } from '../entities/product/container.js';
import { ProductSchema } from '../entities/product/infrastructure/product-schema.js';
import { validate } from '../shared/validate.js';

const router = Router();

router.post( '/', isAuth( tokenService ), validate( ProductSchema ), productController.createProduct );
router.delete( '/:id', isAuth( tokenService ), productController.deleteProduct );
router.get( '/:id', productController.getProductById );
router.get( '/', productController.getAllProducts );
router.put( '/:id', isAuth( tokenService ), validate( ProductSchema ), productController.updateProduct );


export { router as productRouter };