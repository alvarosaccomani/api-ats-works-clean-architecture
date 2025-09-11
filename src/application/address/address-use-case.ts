import { AddressRepository } from "../../domain/address/address.repository";
import { AddressValue } from "../../domain/address/address.value";

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

    public async getAddresses(cmp_uuid: string) {
        try {
            const address = this.addressRepository.getAddresses(cmp_uuid);
            if(!address) {
                throw new Error('No hay addresses.');
            }
            return address;
        } catch (error: any) {
            console.error('Error en getAddresses (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailAddress(cmp_uuid: string, adr_uuid: string) {
        try {
            const address = this.addressRepository.findAddressById(cmp_uuid, adr_uuid);
            if(!address) {
                throw new Error(`No hay address con el Id: ${cmp_uuid}, ${adr_uuid}`);
            }
            return address;
        } catch (error: any) {
            console.error('Error en getDetailAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createAddress({ cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_createdat, adr_updatedat } : { cmp_uuid: string, adr_uuid: string, cus_uuid: string, adr_address: string, adr_city: string, adr_province: string, adr_postalcode: string, adr_createdat: Date, adr_updatedat: Date }) {
        try {
            const addressValue = new AddressValue({ cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_createdat, adr_updatedat });
            const addressCreated = await this.addressRepository.createAddress(addressValue);
            if(!addressCreated) {
                throw new Error(`No se pudo insertar el address.`);
            }
            return addressCreated;
        } catch (error: any) {
            console.error('Error en createAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateAddress(cmp_uuid: string, adr_uuid: string, { cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_createdat, adr_updatedat } : { cus_uuid: string, adr_address: string, adr_city: string, adr_province: string, adr_postalcode: string, adr_createdat: Date, adr_updatedat: Date }) {
        try {
            const addressUpdated = await this.addressRepository.updateAddress(cmp_uuid, adr_uuid, { cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_createdat, adr_updatedat });
            if(!addressUpdated) {
                throw new Error(`No se pudo actualizar el address.`);
            }
            return addressUpdated;
        } catch (error: any) {
            console.error('Error en updateAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteAddress(cmp_uuid: string, adr_uuid: string) {
        try {
            const addressDeleted = await this.addressRepository.deleteAddress(cmp_uuid, adr_uuid);
            if(!addressDeleted) {
                throw new Error(`No se pudo eliminar el address.`);
            }
            return addressDeleted;
        } catch (error: any) {
            console.error('Error en deleteAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findAddressByName(cmp_uuid: string, adr_address: string, excludeUuid?: string) {
        try {
            const address = await this.addressRepository.findAddressByName(cmp_uuid, adr_address, excludeUuid)
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