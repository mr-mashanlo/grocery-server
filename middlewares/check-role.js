import { Forbidden } from '../errors/forbidden.js';

export const checkRole = roles => {
  return ( req, res, next ) => {
    try {
      const { role } = req.user;

      if ( !roles.includes( role ) ) {
        return next( new Forbidden( [ { name: 'permission', message: 'Permission denied' } ] ) );
      }

      next();
    } catch {
      next( new Forbidden( [ { name: 'permission', message: 'Permission error' } ] ) );
    }
  };
};