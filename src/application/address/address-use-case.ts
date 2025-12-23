import { AddressRepository } from "../../domain/address/address.repository";
import { AddressValue } from "../../domain/address/address.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class AddressUseCase {
    constructor(
        private readonly addressRepository: AddressRepository
    ) {
        this.getAddresses = this.getAddresses.bind(this);
        this.getDetailAddress = this.getDetailAddress.bind(this);
        this.createAddress = this.createAddress.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.deleteAddress = this.deleteAddress.bind(this);
        this.findAddressByName = this.findAddressByName.bind(this);
    }

    public async getAddresses(cmp_uuid: string, cus_uuid: string) {
        try {
            const address = await this.addressRepository.getAddresses(cmp_uuid, cus_uuid);
            if(!address) {
                throw new Error('No hay addresses.');
            }
            return address.map(address => ({
                cmp_uuid: address.cmp_uuid,
                cus_uuid: address.cus_uuid,
                adr_uuid: address.adr_uuid,
                adr_address: address.adr_address,
                adr_city: address.adr_city,
                adr_province: address.adr_province,
                adr_postalcode: address.adr_postalcode,
                adr_dimensions: address.adr_dimensions,
                subp_uuid: address.subp_uuid,
                subp: address.subp,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddresses (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string) {
        try {
            const address = await this.addressRepository.findAddressById(cmp_uuid, cus_uuid, adr_uuid);
            if(!address) {
                throw new Error(`No hay address con el Id: ${cmp_uuid}, ${cus_uuid}, ${adr_uuid}`);
            }
            return {
                cmp_uuid: address.cmp_uuid,
                cus_uuid: address.cus_uuid,
                adr_uuid: address.adr_uuid,
                adr_address: address.adr_address,
                adr_city: address.adr_city,
                adr_province: address.adr_province,
                adr_postalcode: address.adr_postalcode,
                adr_dimensions: address.adr_dimensions,
                subp_uuid: address.subp_uuid,
                subp: address.subp,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createAddress({ cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_dimensions, subp_uuid } : { cmp_uuid: string, adr_uuid: string, cus_uuid: string, adr_address: string, adr_city: string, adr_province: string, adr_postalcode: string, adr_dimensions: string, subp_uuid: string }) {
        try {
            const addressValue = new AddressValue({ cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_dimensions, subp_uuid });
            const addressCreated = await this.addressRepository.createAddress(addressValue);
            if(!addressCreated) {
                throw new Error(`No se pudo insertar el address.`);
            }
            return {
                cmp_uuid: addressCreated.cmp_uuid,
                cus_uuid: addressCreated.cus_uuid,
                adr_uuid: addressCreated.adr_uuid,
                adr_address: addressCreated.adr_address,
                adr_city: addressCreated.adr_city,
                adr_province: addressCreated.adr_province,
                adr_postalcode: addressCreated.adr_postalcode,
                adr_dimensions: addressCreated.adr_dimensions,
                subp_uuid: addressCreated.subp_uuid,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(addressCreated.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(addressCreated.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string, { adr_address, adr_city, adr_province, adr_postalcode, adr_dimensions, subp_uuid } : { adr_address: string, adr_city: string, adr_province: string, adr_postalcode: string, adr_dimensions: string, subp_uuid: string }) {
        try {
            const addressUpdated = await this.addressRepository.updateAddress(cmp_uuid, cus_uuid, adr_uuid, { adr_address, adr_city, adr_province, adr_postalcode, adr_dimensions, subp_uuid });
            if(!addressUpdated) {
                throw new Error(`No se pudo actualizar el address.`);
            }
            return {
                cmp_uuid: addressUpdated.cmp_uuid,
                cus_uuid: addressUpdated.cus_uuid,
                adr_uuid: addressUpdated.adr_uuid,
                adr_address: addressUpdated.adr_address,
                adr_city: addressUpdated.adr_city,
                adr_province: addressUpdated.adr_province,
                adr_postalcode: addressUpdated.adr_postalcode,
                adr_dimensions: addressUpdated.adr_dimensions,
                subp_uuid: addressUpdated.subp_uuid,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(addressUpdated.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(addressUpdated.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string) {
        try {
            const addressDeleted = await this.addressRepository.deleteAddress(cmp_uuid, cus_uuid, adr_uuid);
            if(!addressDeleted) {
                throw new Error(`No se pudo eliminar el address.`);
            }
            return {
                cmp_uuid: addressDeleted.cmp_uuid,
                cus_uuid: addressDeleted.cus_uuid,
                adr_uuid: addressDeleted.adr_uuid,
                adr_address: addressDeleted.adr_address,
                adr_city: addressDeleted.adr_city,
                adr_province: addressDeleted.adr_province,
                adr_postalcode: addressDeleted.adr_postalcode,
                adr_dimensions: addressDeleted.adr_dimensions,
                subp_uuid: addressDeleted.subp_uuid,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(addressDeleted.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(addressDeleted.adr_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findAddressByName(cmp_uuid: string, cus_uuid: string, adr_address: string, excludeUuid?: string) {
        try {
            const address = await this.addressRepository.findAddressByName(cmp_uuid, cus_uuid, adr_address, excludeUuid)
            if(address) {
                throw new Error(`Ya existe un address con el nombre ${adr_address}.`);
            }
            return address
        } catch (error: any) {
            console.error('Error en findAddressByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}