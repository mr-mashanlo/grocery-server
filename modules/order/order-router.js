import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { orderController } from './order-container.js';
import { OrderSchema } from './order-schema.js';

const router = Router();

router.post( '/', isAuth, validate( OrderSchema ), orderController.createMyOrder );
router.get( '/all', isAuth, orderController.getAllOrders );
router.get( '/', isAuth, orderController.getMyOrders );
router.get( '/:id', orderController.getOrderById );
router.put( '/:id', isAuth, orderController.updateOrderStatus );

export { router as orderRouter };