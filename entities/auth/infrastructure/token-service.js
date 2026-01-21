import crypto from 'node:crypto';

import jwt from 'jsonwebtoken';

export class TokenService {

  constructor( accessSecret, accessExpires ) {
    this.accessSecret = accessSecret;
    this.accessExpires = accessExpires;
  }

  generateAccessToken = payload => {
    return jwt.sign( payload, this.accessSecret, { expiresIn: this.accessExpires } );
  };

  verifyAccessToken = token => {
    return jwt.verify( token, this.accessSecret );
  };

  generateRefreshToken = () => {
    return crypto.randomBytes( 64 ).toString( 'hex' );
  };

  hashRefreshToken = token => {
    return crypto.createHmac( 'sha256', process.env.REFRESH_KEY ).update( token ).digest( 'hex' );
  };

}