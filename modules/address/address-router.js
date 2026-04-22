import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { addressController } from './address-container.js';

const router = Router();

router.post( '/', isAuth, addressController.createAddress );
router.delete( '/:id', isAuth, addressController.deleteAddress );
router.get( '/me', isAuth, addressController.getMyAddress );
router.get( '/:id', isAuth, addressController.getAddressById );
router.get( '/', isAuth, addressController.getAddresses );
router.put( '/:id', isAuth, addressController.updateAddress );

export { router as addressRouter };