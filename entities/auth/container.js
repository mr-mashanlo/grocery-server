import { AuthService } from './application/auth-service.js';
import { AuthController } from './infrastructure/auth-controller.js';
import { BcryptHasher } from './infrastructure/bcrypt-hasher.js';
import { TokenService } from './infrastructure/token-service.js';
import { UserModel } from './infrastructure/user-model.js';
import { UserRepository } from './infrastructure/user-repository.js';

const hasher = new BcryptHasher();
export const tokenService = new TokenService( process.env.SECRET_KEY, '15m' );
const userRepository = new UserRepository( UserModel );
const authService = new AuthService( userRepository, tokenService, hasher );
export const authController = new AuthController( authService );