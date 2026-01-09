import { Router } from 'express';

import { AddressController } from '../controllers/address-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { AddressDTO, AddressModel } from '../models/address.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( AddressDTO );
const databaseService = new DatabaseService( AddressModel );
const databaseController = new AddressController( databaseService, validatorManager );

router.get( '/', authMiddleware, databaseController.get );
router.post( '/', authMiddleware, databaseController.upgrade );

export { router as addressRouter };