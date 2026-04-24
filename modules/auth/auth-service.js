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

    await this.userRepository.updateRefreshToken( { _id: user._id }, { refreshToken: hashedRefreshToken, expiredAt: Date.now() + +process.env.COOKIE_REFRESH_TIME } );
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

    await this.userRepository.updateRefreshToken( { _id: user._id }, { refreshToken: hashedRefreshToken, expiredAt: Date.now() + +process.env.COOKIE_REFRESH_TIME } );
    return { user: { _id: user._id, nickname: user.nickname }, accessToken, refreshToken };
  };

  refreshToken = async refreshToken => {
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
    const user = await this.userRepository.findByRefreshToken( hashedRefreshToken );

    if ( !user ) throw new Unauthorized( [ { name: 'token', message: 'Invalid or reused token' } ] );
    if ( +user.expiredAt < Date.now() ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

    const payload = { id: user._id, nickname: user.nickname };
    const newAccessToken = this.tokenService.generateAccessToken( payload );
    const newRefreshToken = this.tokenService.generateRefreshToken();
    const newHashedRefreshToken = this.tokenService.hashRefreshToken( newRefreshToken );

    const updatedUser = await this.userRepository.updateRefreshToken( { _id: user._id, refreshToken: hashedRefreshToken }, { refreshToken: newHashedRefreshToken, expiredAt: Date.now() + +process.env.COOKIE_REFRESH_TIME } );

    if ( !updatedUser ) throw new Unauthorized( [ { message: 'Token already rotated' } ] );

    return { id: user._id, nickname: user.nickname, accessToken: newAccessToken, refreshToken: newRefreshToken };
  };

  me = async id => {
    return await this.userRepository.findByid( id );
  };

};