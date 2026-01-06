import { Router } from 'express';

import { DatabaseController } from '../controllers/database-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { CategoryDTO, CategoryModel } from '../models/category.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( CategoryDTO );
const databaseService = new DatabaseService( CategoryModel );
const databaseController = new DatabaseController( databaseService, validatorManager );

router.post( '/', authMiddleware, databaseController.create );
router.get( '/', databaseController.getMany );
router.put( '/:id', authMiddleware, databaseController.update );

export { router as categoryRouter };