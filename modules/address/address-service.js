import { AddressFilteringSchema, AddressPaginationSchema, AddressSchema, AddressSortingSchema } from './address-schema.js';

export class AddressService {

  constructor( addressRepository ) {
    this.addressRepository = addressRepository;
  };

  createAddress = async body => {
    AddressSchema.parse( body );
    return await this.addressRepository.create( body );
  };

  deleteAddress = async id => {
    return await this.addressRepository.delete( { _id: id } );
  };

  getAddresses = async query => {
    const filters = AddressFilteringSchema.parse( query );
    const sort = AddressSortingSchema.parse( query );
    const pagination = AddressPaginationSchema.parse( query );
    const data = await this.addressRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.addressRepository.count( { filters } );
    return { data, total, ...pagination };
  };

  getAddress = async query => {
    return await this.addressRepository.findOne( query );
  };

  getAddressById = async id => {
    return await this.addressRepository.findById( id );
  };

  updateAddress = async ( id, body ) => {
    AddressSchema.parse( body );
    return await this.addressRepository.update( { _id: id }, body );
  };

};