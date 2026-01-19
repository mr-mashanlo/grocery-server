export class UserRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async user => {
    return await this.model.create( user );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  findByNickname = async nickname => {
    return await this.model.findOne( { nickname } );
  };

  findByRefreshToken = async refreshToken => {
    return await this.model.findOne( { refreshToken } );
  };

  updateRefreshToken = async ( id, refreshToken ) => {
    return await this.model.findOneAndUpdate( { _id: id }, { refreshToken, expiredAt: Date.now() + 30 * 24 * 60 * 60 * 1000 }, { new: true } );
  };

  clearRefreshToken = async ( id ) => {
    return await this.model.findOneAndUpdate( { _id: id }, { refreshToken: null, expiredAt: 0 }, { new: true } );
  };

}