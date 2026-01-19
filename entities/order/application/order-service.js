import moment from 'moment';

export class OrderService {

  constructor( orderRepository, addressRepository, productRepository ) {
    this.orderRepository = orderRepository;
    this.addressRepository = addressRepository;
    this.productRepository = productRepository;
  };

  createMyOrder = async ( id, order ) => {
    const createdAt = moment().format( 'YYYY-MM-DD' );
    const address = await this.addressRepository.findByUserId( id );
    for ( let product of order.products ) {
      await this.productRepository.update( product._id, { $inc: { stock: -product.quantity } } );
    }
    return await this.orderRepository.create( { user: id, address: address._id, createdAt, ...order } );
  };

  getAllOrders = async ( query ) => {
    const filters = {};
    const sort = {};

    if ( query.status !== undefined ) {
      filters.status = query.status;
    }

    const allowedSortFields = [ 'createdAt' ];

    if ( allowedSortFields.includes( query.sort ) ) {
      sort[query.sort] = query.order === 'desc' ? -1 : 1;
    }

    return await this.orderRepository.find( { filters, sort } );
  };

  getOrderById = async id => {
    return await this.orderRepository.findById( id );
  };

  getMyOrders = async id => {
    return await this.orderRepository.findByUserId( id );
  };

  updateOrderStatus = async ( id, status ) => {
    return await this.orderRepository.updateOrderStatus( id, status );
  };

};