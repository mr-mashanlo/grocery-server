import { del, put } from '@vercel/blob';
import path from 'path';

export class VercelImageController {

  constructor( imageService ) {
    this.imageService = imageService;
  };

  createImage = async ( req, res, next ) => {
    try {
      const { buffer, originalname } = req.file;
      const name = Date.now().toString( 36 ) + path.extname( originalname );
      const { url } = await put( name, buffer, { access: 'public' } );
      const image = await this.imageService.createImage( { path: name, url, alt: req.body.alt } );
      res.json( image );
    } catch ( error ) {
      next( error );
    }
  };

  deleteImage = async ( req, res, next ) => {
    try {
      const image = await this.imageService.getImageById( req.params.id );
      await del( image.url );
      res.status( 204 ).send();
    } catch ( error ) {
      next( error );
    }
  };

  getImages = async ( req, res, next ) => {
    try {
      const images = await this.imageService.getImages( req.query );
      res.json( images );
    } catch ( error ) {
      next( error );
    }
  };

  getImageById = async ( req, res, next ) => {
    try {
      const image = await this.imageService.getImageById( req.params.id );
      res.json( image );
    } catch ( error ) {
      next( error );
    }
  };

  updateImage = async ( req, res, next ) => {
    try {
      const image = await this.imageService.updateImage( req.params.id, req.body );
      res.json( image );
    } catch ( error ) {
      next( error );
    }
  };

};