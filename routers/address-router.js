import { Router } from 'express';

import { addressController } from '../entities/address/container.js';
import { AddressSchema } from '../entities/address/infrastructure/address-schema.js';
import { tokenService } from '../entities/auth/container.js';
import { isAuth } from '../entities/auth/infrastructure/is-auth.js';
import { validate } from '../shared/validate.js';

const router = Router();

router.post( '/', isAuth( tokenService ), validate( AddressSchema ), addressController.createMyAddress );
router.get( '/', isAuth( tokenService ), addressController.getMyAddress );
router.put( '/:id', isAuth( tokenService ), validate( AddressSchema ), addressController.updateMyAddress );

export { router as addressRouter };