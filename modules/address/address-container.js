import { AddressController } from './address-controller.js';
import { AddressModel } from './address-model.js';
import { AddressRepository } from './address-repository.js';
import { AddressService } from './address-service.js';

export const addressRepository = new AddressRepository( AddressModel );
const addressService = new AddressService( addressRepository );
export const addressController = new AddressController( addressService );