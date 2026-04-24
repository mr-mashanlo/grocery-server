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

  updateRefreshToken = async ( query, data ) => {
    return await this.model.findOneAndUpdate( query, data, { returnDocument: 'after' } );
  };

  clearRefreshToken = async query => {
    return await this.model.findOneAndUpdate( query, { refreshToken: null, expiredAt: 0 }, { returnDocument: 'after' } );
  };

}