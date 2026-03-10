import { BadRequest } from '../../errors/bad-request.js';
import { Unauthorized } from '../../errors/unauthorized.js';

export class AuthService {

  constructor( userRepository, tokenService, passwordHasher ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.passwordHasher = passwordHasher;
  };

  signIn = async ( nickname, password ) => {
    const user = await this.userRepository.findByNickname( nickname );
    if ( !user ) throw new BadRequest( [ { name: 'nickname', message: 'Nickname is not exist' } ] );

    const isValid = this.passwordHasher.compare( password, user.password );
    if ( !isValid ) throw new BadRequest( [ { name: 'password', message: 'Incorrect password' } ] );

    const accessToken = this.tokenService.generateAccessToken( { id: user._id, nickname: user.nickname } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.userRepository.updateRefreshToken( user._id, hashedRefreshToken );
    return { user: { _id: user._id, nickname: user.nickname }, accessToken, refreshToken };
  };

  signUp = async ( nickname, password ) => {
    const candidate = await this.userRepository.findByNickname( nickname );
    if ( candidate ) throw new BadRequest( [ { name: 'nickname', message: 'Nickname is already exist' } ] );

    const hash = this.passwordHasher.hash( password );
    const user = await this.userRepository.create( { nickname, password: hash } );

    const accessToken = this.tokenService.generateAccessToken( { id: user._id, nickname: user.nickname } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.userRepository.updateRefreshToken( user._id, hashedRefreshToken );
    return { user: { _id: user._id, nickname: user.nickname }, accessToken, refreshToken };
  };

  signOut = async id => {
    await this.userRepository.clearRefreshToken( id );
    return { user: null };
  };

  refreshToken = async refreshToken => {
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
    const user = await this.userRepository.findByRefreshToken( hashedRefreshToken );

    if ( +user.expiredAt < Date.now() ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

    const newAccessToken = this.tokenService.generateAccessToken( { id: user.id, nickname: user.nickname } );
    const newRefreshToken = this.tokenService.generateRefreshToken();
    const newHashedRefreshToken = this.tokenService.hashRefreshToken( newRefreshToken );
    await this.userRepository.updateRefreshToken( user.id, newHashedRefreshToken );

    return { id: user.id, nickname: user.nickname, accessToken: newAccessToken, refreshToken: newRefreshToken };
  };

};