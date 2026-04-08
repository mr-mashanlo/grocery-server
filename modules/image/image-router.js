import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { uploadMedia } from '../../middlewares/upload-media.js';
import { validate } from '../../middlewares/validate.js';
import { imageController } from './image-container.js';
import { ImageSchema } from './image-schema.js';

const router = Router();

router.post( '/', isAuth, uploadMedia, validate( ImageSchema ), imageController.createImage );
router.delete( '/:id', isAuth, imageController.deleteImage );
router.get( '/', imageController.getImages );
router.get( '/:id', imageController.getImageById );
router.put( '/:id', isAuth, imageController.updateImage );

export { router as imageRouter };