import { addressRepository } from '../address/container.js';
import { productRepository } from '../product/container.js';
import { OrderService } from './application/order-service.js';
import { OrderController } from './infrastructure/order-controller.js';
import { OrderModel } from './infrastructure/order-model.js';
import { OrderRepository } from './infrastructure/order-repository.js';

const orderRepository = new OrderRepository( OrderModel );
const orderService = new OrderService( orderRepository, addressRepository, productRepository );
export const orderController = new OrderController( orderService );