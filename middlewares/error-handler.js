import { CustomError } from '../errors/custom-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( error, req, res, next ) => {
  console.log( error );
  if ( error instanceof CustomError ) {
    const { status, message, errors } = error;
    return res.status( status ).json( { status, message, errors } );
  };
  res.status( 500 ).json( { errors: [ { name: 'error', message: 'Something went wrong' } ] } );
};