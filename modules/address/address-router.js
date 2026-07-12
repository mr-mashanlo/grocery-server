import { Router } from 'express';

import { checkRole } from '../../middlewares/check-role.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { addressController } from './address-container.js';

const router = Router();

router.post( '/', isAuth, addressController.createAddress );
router.delete( '/:id', isAuth, checkRole( [ 'ADMIN' ] ), addressController.deleteAddress );
router.get( '/me', isAuth, addressController.getMyAddress );
router.get( '/:id', isAuth, checkRole( [ 'ADMIN' ] ), addressController.getAddressById );
router.get( '/', isAuth, checkRole( [ 'ADMIN' ] ), addressController.getAddresses );
router.put( '/:id', isAuth, addressController.updateAddress );

export { router as addressRouter };
