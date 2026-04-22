import moment from 'moment';

import { OrderFilteringSchema, OrderPaginationSchema, OrderSortingSchema } from './order-schema.js';

export class OrderService {

  constructor( orderRepository, addressRepository, productRepository ) {
    this.orderRepository = orderRepository;
    this.addressRepository = addressRepository;
    this.productRepository = productRepository;
  };

  createOrder = async order => {
    const createdAt = moment().format( 'YYYY-MM-DD' );
    return await this.orderRepository.create( { ...order, adddress: '', createdAt } );
  };

  getOrders = async query => {
    const filters = OrderFilteringSchema.parse( query );
    const sort = OrderSortingSchema.parse( query );
    const pagination = OrderPaginationSchema.parse( query );
    const data = await this.orderRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.orderRepository.count( { filters } );
    return { data, total, ...pagination };
  };

  getOrderById = async id => {
    return await this.orderRepository.findById( id );
  };

  updateOrder = async ( id, order ) => {
    return await this.orderRepository.update( { _id: id }, order );
  };

};