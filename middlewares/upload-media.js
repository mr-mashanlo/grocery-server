import fs from 'fs';
import multer, { diskStorage } from 'multer';
import path from 'path';

import { BadRequest } from '../errors/bad-request.js';

const UPLOAD_DIR = 'uploads';
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp' ];

if ( !fs.existsSync( UPLOAD_DIR ) ) {
  fs.mkdirSync( UPLOAD_DIR );
}

const storage = diskStorage( {
  destination: ( req, file, cb ) => cb( null, UPLOAD_DIR ),
  filename: ( req, file, cb ) => cb( null, Date.now() + path.extname( file.originalname ).toLowerCase() )
} );

const fileFilter = ( req, file, cb ) => {
  if ( ALLOWED_MIME_TYPES.includes( file.mimetype ) ) {
    cb( null, true );
  } else {
    cb( new BadRequest( [ { name: 'media', message: 'Invalid file type' } ] ) );
  }
};

const upload = multer( {
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter
} );

export const uploadMedia = upload.single( 'image' );