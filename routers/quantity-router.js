import { Router } from 'express';

import { DatabaseController } from '../controllers/database-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { QuantityDTO, QuantityModel } from '../models/quantity.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( QuantityDTO );
const databaseService = new DatabaseService( QuantityModel );
const databaseController = new DatabaseController( databaseService, validatorManager );

router.post( '/', authMiddleware, databaseController.create );
router.put( '/:id', authMiddleware, databaseController.update );

export { router as quantityRouter };