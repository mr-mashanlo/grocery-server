import { AddressService } from './application/address-service.js';
import { AddressController } from './infrastructure/address-controller.js';
import { AddressModel } from './infrastructure/address-model.js';
import { AddressRepository } from './infrastructure/address-repository.js';

export const addressRepository = new AddressRepository( AddressModel );
const addressService = new AddressService( addressRepository );
export const addressController = new AddressController( addressService );