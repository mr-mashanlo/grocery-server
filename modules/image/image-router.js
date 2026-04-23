import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { vercelUploadMedia } from '../../middlewares/vercel-upload-media.js';
import { imageController } from './image-container.js';

const router = Router();

router.post( '/', isAuth, vercelUploadMedia, imageController.createImage );
router.delete( '/:id', isAuth, imageController.deleteImage );
router.get( '/', isAuth, imageController.getImages );
router.get( '/:id', isAuth, imageController.getImageById );
router.put( '/:id', isAuth, imageController.updateImage );

export { router as imageRouter };