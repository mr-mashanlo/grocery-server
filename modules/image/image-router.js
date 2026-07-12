import { Router } from 'express';

import { checkRole } from '../../middlewares/check-role.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { uploadMedia } from '../../middlewares/upload-media.js';
// import { vercelUploadMedia } from '../../middlewares/vercel-upload-media.js';
import { imageController } from './image-container.js';

const router = Router();

router.post( '/', isAuth, checkRole( [ 'ADMIN' ] ), uploadMedia, imageController.createImage );
router.delete( '/:id', isAuth, checkRole( [ 'ADMIN' ] ), imageController.deleteImage );
router.get( '/', isAuth, checkRole( [ 'ADMIN' ] ), imageController.getImages );
router.get( '/:id', isAuth, checkRole( [ 'ADMIN' ] ), imageController.getImageById );
router.put( '/:id', isAuth, checkRole( [ 'ADMIN' ] ), imageController.updateImage );

export { router as imageRouter };
