import { AuthController } from './auth-controller.js';
import { AuthService } from './auth-service.js';
import { PasswordHasher } from './password-hasher.js';
import { TokenService } from './token-service.js';
import { UserModel } from './user-model.js';
import { UserRepository } from './user-repository.js';

const passwordHasher = new PasswordHasher();
export const tokenService = new TokenService( process.env.ACCESS_KEY, process.env.JWT_ACCESS_TIME );
const userRepository = new UserRepository( UserModel );
export const authService = new AuthService( userRepository, tokenService, passwordHasher );
export const authController = new AuthController( authService );