import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { categoryController } from './category-container.js';

const router = Router();

router.post( '/', isAuth, categoryController.createCategory );
router.delete( '/:id', isAuth, categoryController.deleteCategory );
router.get( '/:id', categoryController.getCategoryById );
router.get( '/', categoryController.getCategories );
router.put( '/:id', isAuth, categoryController.updateCategory );

export { router as categoryRouter };