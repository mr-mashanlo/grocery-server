import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { authController } from './auth-container.js';
import { AuthSchema } from './auth-schema.js';

const router = Router();

router.post( '/signin', validate( AuthSchema ), authController.signIn );
router.post( '/signup', validate( AuthSchema ), authController.signUp );
router.get( '/me', isAuth, authController.me );

export { router as authRouter };