import { AddressEntity, AddressUpdateData } from "../../../domain/address/address.entity";
import { AddressRepository } from "../../../domain/address/address.repository";
import { SequelizeAddress } from "../../model/address/address.model";
import { Op } from "sequelize";

export class SequelizeRepository implements AddressRepository {
    async getAddresses(cmp_uuid: string, cus_uuid: string): Promise<AddressEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    cus_uuid: cus_uuid ?? null
                }
            }
            const addresses = await SequelizeAddress.findAll(config);
            if(!addresses) {
                throw new Error(`No hay addresses`)
            };
            return addresses;
        } catch (error: any) {
            console.error('Error en getAddresses:', error.message);
            throw error;
        }
    }
    async findAddressById(cmp_uuid: string, cus_uuid: string, adr_uuid: string): Promise<AddressEntity | null> {
        try {
            const address = await SequelizeAddress.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cus_uuid: cus_uuid ?? null,
                    adr_uuid: adr_uuid ?? null
                } 
            });
            if(!address) {
                throw new Error(`No hay address con el Id: ${cmp_uuid}, ${adr_uuid}`);
            };
            return address.dataValues;
        } catch (error: any) {
            console.error('Error en findAddressById:', error.message);
            throw error;
        }
    }
    async createAddress(address: AddressEntity): Promise<AddressEntity | null> {
        try {
            let { cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_dimensions, subp_uuid, adr_createdat, adr_updatedat } = address
            const result = await SequelizeAddress.create({ cmp_uuid, adr_uuid, cus_uuid, adr_address, adr_city, adr_province, adr_postalcode, adr_dimensions, subp_uuid, adr_createdat, adr_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el address`);
            }
            let newAddress = result.dataValues as SequelizeAddress
            return newAddress;
        } catch (error: any) {
            console.error('Error en createAddress:', error.message);
            throw error;
        }
    }
    async updateAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string, address: AddressUpdateData): Promise<AddressEntity | null> {
        try {
            const [updatedCount, [updatedAddress]] = await SequelizeAddress.update(
                { 
                    adr_address: address.adr_address, 
                    adr_city: address.adr_city, 
                    adr_province: address.adr_province, 
                    adr_postalcode: address.adr_postalcode,
                    adr_dimensions: address.adr_dimensions,
                    subp_uuid: address.subp_uuid
                },
                { 
                    where: { cmp_uuid, cus_uuid, adr_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el address`);
            };
            return updatedAddress.get({ plain: true }) as AddressEntity;
        } catch (error: any) {
            console.error('Error en updateAddress:', error.message);
            throw error;
        }
    }
    async deleteAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string): Promise<AddressEntity | null> {
        try {
            const address = await this.findAddressById(cmp_uuid, cus_uuid, adr_uuid);
            const result = await SequelizeAddress.destroy({ where: { cmp_uuid, cus_uuid, adr_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el address`);
            };
            return address;
        } catch (error: any) {
            console.error('Error en deleteAddress:', error.message);
            throw error;
        }
    }
    async findAddressByName(cmp_uuid: string, cus_uuid: string, excludeUuid?: string): Promise<AddressEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                cus_uuid: cus_uuid ?? null
             };
            if (excludeUuid) {
                whereCondition.adr_uuid = { [Op.ne]: excludeUuid };
            }
            const address = await SequelizeAddress.findOne({ 
                where: whereCondition
            });
            return address;
        } catch (error: any) {
            console.error('Error en findAddressByName:', error.message);
            throw error;
        }
    }
    
}