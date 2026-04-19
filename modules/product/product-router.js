import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { productController } from './product-container.js';

const router = Router();

router.post( '/', isAuth, productController.createProduct );
router.delete( '/:id', isAuth, productController.deleteProduct );
router.get( '/:slug', productController.getProductBySlug );
router.get( '/', productController.getProducts );
router.put( '/:id', isAuth, productController.updateProduct );

export { router as productRouter };