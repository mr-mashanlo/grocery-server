import { ImageController } from './image-controller.js';
import { ImageModel } from './image-model.js';
import { ImageRepository } from './image-repository.js';
import { ImageService } from './image-service.js';
// import { VercelImageController } from './vercel-image-controller.js';

export const imageRepository = new ImageRepository( ImageModel );
const imageService = new ImageService( imageRepository );
export const imageController = new ImageController( imageService );
// export const imageController = new VercelImageController( imageService );