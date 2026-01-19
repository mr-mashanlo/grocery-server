import { Router } from 'express';

import { tokenService } from '../entities/auth/container.js';
import { isAuth } from '../entities/auth/infrastructure/is-auth.js';
import { orderController } from '../entities/order/container.js';
import { OrderSchema } from '../entities/order/infrastructure/order-schema.js';
import { validate } from '../shared/validate.js';

const router = Router();

router.post( '/', isAuth( tokenService ), validate( OrderSchema ), orderController.createMyOrder );
router.get( '/all', isAuth( tokenService ), orderController.getAllOrders );
router.get( '/', isAuth( tokenService ), orderController.getMyOrders );
router.get( '/:id', orderController.getOrderById );
router.put( '/:id', isAuth( tokenService ), orderController.updateOrderStatus );

export { router as orderRouter };