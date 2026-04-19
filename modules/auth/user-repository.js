export class UserRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async user => {
    return await this.model.create( user );
  };

  findById = async _id => {
    return await this.model.findOne( { _id } );
  };

  findByNickname = async nickname => {
    return await this.model.findOne( { nickname } );
  };

  findByRefreshToken = async refreshToken => {
    return await this.model.findOne( { refreshToken } );
  };

  updateRefreshToken = async ( _id, refreshToken ) => {
    return await this.model.findOneAndUpdate( { _id }, { refreshToken, expiredAt: Date.now() + process.env.COOKIE_REFRESH_TIME }, { returnDocument: 'after' } );
  };

  clearRefreshToken = async _id => {
    return await this.model.findOneAndUpdate( { _id }, { refreshToken: null, expiredAt: 0 }, { returnDocument: 'after' } );
  };

}