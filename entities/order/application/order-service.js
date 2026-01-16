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
      await this.productRepository.update( { _id: product._id }, { $inc: { stock: -product.quantity } } );
    }
    return await this.orderRepository.create( { user: id, address: address._id, createdAt, ...order } );
  };

  getOrderById = async id => {
    return await this.orderRepository.findById( id );
  };

  getMyOrders = async id => {
    return await this.orderRepository.findByUserId( id );
  };

};