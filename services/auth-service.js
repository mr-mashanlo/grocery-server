export class AuthService {

  constructor( databaseService, validatorManager, bcryptManager, documentManager ) {
    this.databaseService = databaseService;
    this.validatorManager = validatorManager;
    this.bcryptManager = bcryptManager;
    this.documentManager = documentManager;
  };

  signIn = async ( data ) => {
    const { nickname, password } = this.validatorManager.parse( data );
    const document = await this.databaseService.getOne( { nickname } );
    this.documentManager.throwIfNotExists( document, 'Nickname' );
    this.bcryptManager.compare( password, document.password );
    return document;
  };

  signUp = async ( data ) => {
    const { nickname, password } = this.validatorManager.parse( data );
    const document = await this.databaseService.getOne( { nickname } );
    this.documentManager.throwIfExists( document, 'Nickname' );
    const hash = this.bcryptManager.hash( password );
    const createdDocument = await this.databaseService.create( { nickname, password: hash } );
    return createdDocument;
  };

};