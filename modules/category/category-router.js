import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { categoryController } from './category-container.js';
import { CategorySchema } from './category-schema.js';

const router = Router();

router.post( '/', isAuth, validate( CategorySchema ), categoryController.createCategory );
router.delete( '/:id', isAuth, categoryController.deleteCategory );
router.get( '/:id', categoryController.getCategoryById );
router.get( '/', categoryController.getAllCategories );
router.put( '/:id', isAuth, validate( CategorySchema ), categoryController.updateCategory );

export { router as categoryRouter };