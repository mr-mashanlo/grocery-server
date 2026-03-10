import { Unauthorized } from '../errors/unauthorized.js';
import { authService, tokenService } from '../modules/auth/auth-container.js';

export const isAuth = async ( req, res, next ) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if ( !accessToken && refreshToken ) {
      const { id, nickname, accessToken: newAccessToken, refreshToken: newRefreshToken } = await authService.refreshToken( refreshToken );
      res.cookie( 'accessToken', newAccessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', newRefreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      req.user = { id, nickname };
      return next();
    }

    req.user = tokenService.verifyAccessToken( accessToken );
    next();
  } catch {
    next( new Unauthorized( [ { name: 'token', message: 'Token not provided' } ] ) );
  }
};