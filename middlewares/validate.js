import { BadRequest } from '../errors/bad-request.js';

export const validate = schema => ( req, res, next ) => {
  try {
    const validatedBody = schema.parse( req.body );
    req.body = validatedBody;
    next();
  } catch ( error ) {
    const errorObject = JSON.parse( error )[0];
    next( new BadRequest( [ { name: errorObject.path[0], message: errorObject.message } ] ) );
  }
};