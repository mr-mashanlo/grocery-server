export class AuthController {

  constructor( authService ) {
    this.authService = authService;
  };

  signIn = async ( req, res, next ) => {
    try {
      const { nickname, password } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.signIn( nickname, password );
      res.cookie( 'accessToken', accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id: user._id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signUp = async ( req, res, next ) => {
    try {
      const { nickname, password } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.signUp( nickname, password );
      res.cookie( 'accessToken', accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id: user._id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signOut = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      await this.authService.signOut( id );
      res.clearCookie( 'accessToken', { httpOnly: true, sameSite: 'none', secure: true } );
      res.clearCookie( 'refreshToken', { httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id: null } );
    } catch ( error ) {
      next( error );
    }
  };

  refresh = async ( req, res, next ) => {
    try {
      const { user, accessToken, refreshToken } = await this.authService.refresh( req.cookies.refreshToken );
      res.cookie( 'accessToken', accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id: user._id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

};