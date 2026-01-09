import { Router } from 'express';

import { DatabaseController } from '../controllers/database-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { OrderDTO, OrderModel } from '../models/order.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( OrderDTO );
const databaseService = new DatabaseService( OrderModel );
const databaseController = new DatabaseController( databaseService, validatorManager );

router.post( '/', authMiddleware, databaseController.create );
router.get( '/', authMiddleware, databaseController.getMany );
router.get( '/:id', authMiddleware, databaseController.get );

export { router as orderRouter };