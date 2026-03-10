import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { addressController } from './address-container.js';
import { AddressSchema } from './address-schema.js';

const router = Router();

router.post( '/', isAuth, validate( AddressSchema ), addressController.createMyAddress );
router.get( '/', isAuth, addressController.getMyAddress );
router.put( '/:id', isAuth, validate( AddressSchema ), addressController.updateMyAddress );

export { router as addressRouter };