import fs from 'fs';
import path from 'path';

export class ImageController {

  constructor( imageService ) {
    this.imageService = imageService;
  };

  createImage = async ( req, res, next ) => {
    try {
      const { filename, path } = req.file;
      const image = await this.imageService.createImage( { path, url: `http://localhost:${process.env.PORT}/${filename}`, alt: req.body.alt } );
      res.json( image );
    } catch ( error ) {
      next( error );
    }
  };

  deleteImage = async ( req, res, next ) => {
    try {
      const image = await this.imageService.getImageById( req.params.id );
      fs.unlinkSync( path.resolve( image.path ) );
      const deletedImage = await this.imageService.deleteImage( req.params.id );
      res.json( deletedImage );
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