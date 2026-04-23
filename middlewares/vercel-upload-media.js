import multer from 'multer';

const storage = multer.memoryStorage();

export const vercelUploadMedia = multer( { storage } ).single( 'image' );