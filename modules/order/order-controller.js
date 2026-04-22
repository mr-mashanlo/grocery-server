export class OrderController {

  constructor( orderService ) {
    this.orderService = orderService;
  };

  createOrder = async ( req, res, next ) => {
    try {
      const order = await this.orderService.createOrder( { ...req.body, user: req.user.id } );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

  getOrders = async ( req, res, next ) => {
    try {
      const orders = await this.orderService.getOrders( req.query );
      res.json( orders );
    } catch ( error ) {
      next( error );
    }
  };

  getMyOrders = async ( req, res, next ) => {
    try {
      const orders = await this.orderService.getOrders( { ...req.query, user: req.user.id } );
      res.json( orders );
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

  updateOrder = async ( req, res, next ) => {
    try {
      const order = await this.orderService.updateOrder( req.params.id, req.body );
      res.json( order );
    } catch ( error ) {
      next( error );
    }
  };

};