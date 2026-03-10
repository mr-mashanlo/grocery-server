import { addressRepository } from '../address/address-container.js';
import { productRepository } from '../product/product-container.js';
import { OrderController } from './order-controller.js';
import { OrderModel } from './order-model.js';
import { OrderRepository } from './order-repository.js';
import { OrderService } from './order-service.js';

const orderRepository = new OrderRepository( OrderModel );
const orderService = new OrderService( orderRepository, addressRepository, productRepository );
export const orderController = new OrderController( orderService );