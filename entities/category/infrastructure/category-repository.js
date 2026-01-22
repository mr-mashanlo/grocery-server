export class CategoryRepository {

  constructor( model ) {
    this.model = model;
  }

  create = async category => {
    return await this.model.create( category );
  };

  delete = async id => {
    return await this.model.delete( { _id: id } );
  };

  find = async ( { filter, sort } ) => {
    return await this.model.find( filter ).sort( sort );
  };

  findById = async id => {
    return await this.model.findOne( { _id: id } );
  };

  findBySlug = async slug => {
    return await this.model.findOne( { slug } );
  };

  update = async ( id, category ) => {
    return await this.model.findOneAndUpdate( { _id: id }, category, { new: true } );
  };

}