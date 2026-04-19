import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { uploadMedia } from '../../middlewares/upload-media.js';
import { imageController } from './image-container.js';

const router = Router();

router.post( '/', isAuth, uploadMedia, imageController.createImage );
router.delete( '/:id', isAuth, imageController.deleteImage );
router.get( '/', isAuth, imageController.getImages );
router.get( '/:id', isAuth, imageController.getImageById );
router.put( '/:id', isAuth, imageController.updateImage );

export { router as imageRouter };