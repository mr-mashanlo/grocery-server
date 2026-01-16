export const validate = schema => ( req, res, next ) => {
  try {
    const validatedBody = schema.parse( req.body );
    req.body = validatedBody;
    next();
  } catch ( error ) {
    const errorObject = JSON.parse( error )[0];
    return res.status( 401 ).json( [ { name: errorObject.path[0], message: errorObject.message } ] );
  }
};