import { AuthError } from '../../../shared/auth-error.js';

export class AuthService {

  constructor( userRepository, tokenService, hasher ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.hasher = hasher;
  };

  signIn = async ( nickname, password ) => {
    const user = await this.userRepository.findByNickname( nickname );
    if ( !user ) throw new AuthError( 400, 'BAD_REQUEST', [ { name: 'nickname', message: 'Nickname is not exist' } ] );

    const isValid = this.hasher.compare( password, user.password );
    if ( !isValid ) throw new AuthError( 400, 'BAD_REQUEST', [ { name: 'password', message: 'Incorrect password' } ] );

    const accessToken = this.tokenService.generateAccessToken( { id: user._id, nickname: user.nickname } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.userRepository.updateRefreshToken( user._id, hashedRefreshToken );
    return { user: { _id: user._id, nickname: user.nickname }, accessToken, refreshToken };
  };

  signUp = async ( nickname, password ) => {
    const candidate = await this.userRepository.findByNickname( nickname );
    if ( candidate ) throw new AuthError( 400, 'BAD_REQUEST', [ { name: 'nickname', message: 'Nickname is already exist' } ] );

    const hash = this.hasher.hash( password );
    const user = await this.userRepository.create( { nickname, password: hash } );

    const accessToken = this.tokenService.generateAccessToken( { id: user._id, nickname: user.nickname } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.userRepository.updateRefreshToken( user._id, hashedRefreshToken );
    return { user: { _id: user._id, nickname: user.nickname }, accessToken, refreshToken };
  };

  signOut = async ( id ) => {
    await this.userRepository.clearRefreshToken( id );
    return { user: null };
  };

  refresh = async ( token ) => {
    const hashedToken = this.tokenService.hashRefreshToken( token );
    const user = await this.userRepository.findByRefreshToken( hashedToken );

    if ( !user._doc.expiredAt && user._doc.expiredAt < Date.now() ) {
      throw new AuthError( 498, 'TOKEN_HAS_EXPIRED', [ { name: 'token', message: 'Refresh token has expired' } ] );
    }

    const accessToken = this.tokenService.generateAccessToken( { id: user._id, nickname: user.nickname } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.userRepository.updateRefreshToken( user._id, hashedRefreshToken );
    return { user: { _id: user._id, nickname: user.nickname }, accessToken, refreshToken };
  };

};