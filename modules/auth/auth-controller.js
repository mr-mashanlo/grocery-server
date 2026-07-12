export class AuthController {

  constructor( authService ) {
    this.authService = authService;
  };

  signIn = async ( req, res, next ) => {
    try {
      const { nickname, password } = req.body;
      const { _id, accessToken, refreshToken } = await this.authService.signIn( nickname, password );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { _id } );
    } catch ( error ) {
      next( error );
    }
  };

  signUp = async ( req, res, next ) => {
    try {
      const { nickname, password } = req.body;
      const { _id, accessToken, refreshToken } = await this.authService.signUp( nickname, password );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { _id } );
    } catch ( error ) {
      next( error );
    }
  };

  refresh = async ( req, res, next ) => {
    try {
      const { _id, accessToken, refreshToken } = await this.authService.refresh( req.cookies.refreshToken );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { _id } );
    } catch ( error ) {
      next( error );
    }
  };

};