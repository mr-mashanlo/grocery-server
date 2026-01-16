export class OrderController {

  constructor( orderService ) {
    this.orderService = orderService;
  };

  createMyOrder = async ( req, res, next ) => {
    try {
      const order = await this.orderService.createMyOrder( req.user.id, req.body );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

  getOrderById = async ( req, res, next ) => {
    try {
      const order = await this.orderService.getOrderById( req.params.id );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

  getMyOrders = async ( req, res, next ) => {
    try {
      const orders = await this.orderService.getMyOrders( req.user.id );
      res.json( orders );
    } catch ( error ) {
      next( error );
    }
  };

};