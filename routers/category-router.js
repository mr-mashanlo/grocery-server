import { Router } from 'express';

import { tokenService } from '../entities/auth/container.js';
import { isAuth } from '../entities/auth/infrastructure/is-auth.js';
import { categoryController } from '../entities/category/container.js';
import { CategorySchema } from '../entities/category/infrastructure/category-schema.js';
import { validate } from '../shared/validate.js';

const router = Router();

router.post( '/', isAuth( tokenService ), validate( CategorySchema ), categoryController.createCategory );
router.delete( '/:id', isAuth( tokenService ), categoryController.deleteCategory );
router.get( '/:id', categoryController.getCategoryById );
router.get( '/', categoryController.getAllCategories );
router.put( '/:id', isAuth( tokenService ), validate( CategorySchema ), categoryController.updateCategory );

export { router as categoryRouter };