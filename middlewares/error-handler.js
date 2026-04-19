import { ZodError } from 'zod';

import { CustomError } from '../errors/custom-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( error, req, res, next ) => {
  console.log( error );

  if ( error instanceof ZodError ) {
    const { message } = error;
    const errors = JSON.parse( message ).map( error => ( { error: error.path[0], message: error.message } ) );
    return res.status( 400 ).json( { status: 400, message: 'bad request', errors } );
  };

  if ( error instanceof CustomError ) {
    const { status, message, errors } = error;
    return res.status( status ).json( { status, message, errors } );
  };

  res.status( 500 ).json( { errors: [ { name: 'error', message: 'Something went wrong' } ] } );
};