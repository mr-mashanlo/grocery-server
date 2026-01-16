import { Router } from 'express';

import { authController, tokenService } from '../entities/auth/container.js';
import { AuthSchema } from '../entities/auth/infrastructure/auth-schema.js';
import { isAuth } from '../entities/auth/infrastructure/is-auth.js';
import { validate } from '../shared/validate.js';

const router = Router();

router.post( '/signin', validate( AuthSchema ), authController.signIn );
router.post( '/signup', validate( AuthSchema ), authController.signUp );
router.get( '/signout', isAuth( tokenService ), authController.signOut );
router.get( '/refresh', authController.refresh );

export { router as authRouter };