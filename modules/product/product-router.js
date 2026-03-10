import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { productController } from './product-container.js';
import { ProductSchema } from './product-schema.js';

const router = Router();

router.post( '/', isAuth, validate( ProductSchema ), productController.createProduct );
router.delete( '/:id', isAuth, productController.deleteProduct );
router.get( '/:id', productController.getProductById );
router.get( '/', productController.getAllProducts );
router.put( '/:id', isAuth, validate( ProductSchema ), productController.updateProduct );

export { router as productRouter };