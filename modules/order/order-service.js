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

  getAllOrders = async query => {
    const filters = {};
    const sort = {};
    const pagination = {};

    if ( query.status !== undefined ) {
      filters.status = query.status;
    }

    const allowedSortFields = [ 'createdAt' ];

    if ( allowedSortFields.includes( query.sort ) ) {
      sort[query.sort] = query.order === 'desc' ? -1 : 1;
    }

    const limit = Math.min( Number( query.limit || 20 ), 100 );
    const page = Number( query.page ) || 1;

    pagination.limit = limit;
    pagination.skip = ( page - 1 ) * limit;

    const orders = await this.orderRepository.find( { filters, sort, pagination } );
    const total = await this.orderRepository.count( { filters, sort } );

    return { data: orders, total, page, limit };
  };

  getOrderById = async id => {
    return await this.orderRepository.findById( id );
  };

  getMyOrders = async query => {
    const filters = {};
    const sort = {};
    const pagination = {};

    if ( query.user !== undefined ) {
      filters.user = query.user;
    }

    const allowedSortFields = [ 'createdAt' ];

    if ( allowedSortFields.includes( query.sort ) ) {
      sort[query.sort] = query.order === 'desc' ? -1 : 1;
    }

    const limit = Math.min( Number( query.limit || 20 ), 100 );
    const page = Number( query.page ) || 1;

    pagination.limit = limit;
    pagination.skip = ( page - 1 ) * limit;

    const orders = await this.orderRepository.find( { filters, sort, pagination } );
    const total = await this.orderRepository.count( { filters, sort } );

    return { data: orders, total, page, limit };
  };

  updateOrderStatus = async ( id, status ) => {
    return await this.orderRepository.updateOrderStatus( id, status );
  };

};