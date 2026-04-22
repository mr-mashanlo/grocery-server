import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { orderController } from './order-container.js';
import { OrderSchema } from './order-schema.js';

const router = Router();

router.post( '/', isAuth, validate( OrderSchema.omit( { user: true, address: true, status: true } ) ), orderController.createOrder );
router.get( '/', isAuth, orderController.getOrders );
router.get( '/me', isAuth, orderController.getMyOrders );
router.get( '/:id', isAuth, orderController.getOrderById );
router.put( '/:id', isAuth, orderController.updateOrder );

export { router as orderRouter };