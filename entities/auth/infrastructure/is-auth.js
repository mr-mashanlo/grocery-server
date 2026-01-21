export const isAuth = tokenService => ( req, res, next ) => {
  try {
    const accessToken = req.cookies.accessToken;
    if ( !accessToken ) return res.status( 498 ).json( { message: 'TOKEN_NOT_PROVIDED', errors: [ { name: 'token', message: 'Access token not provided' } ] } );

    const decoded = tokenService.verifyAccessToken( accessToken );
    req.user = decoded;

    next();
  } catch {
    return res.status( 499 ).json( { message: 'TOKEN_HAS_EXPIRED', errors: [ { name: 'token', message: 'Access token has expired' } ] } );
  }
};