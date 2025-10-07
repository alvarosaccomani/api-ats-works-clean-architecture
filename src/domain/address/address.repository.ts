import { AddressEntity, AddressUpdateData } from "./address.entity";

export interface AddressRepository {
    getAddresses(cmp_uuid: string, cus_uuid: string): Promise<AddressEntity[] | null>;
    findAddressById(cmp_uuid: string, cus_uuid: string, adr_uuid: string): Promise<AddressEntity | null>;
    createAddress(address: AddressEntity): Promise<AddressEntity | null>;
    updateAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string, address: AddressUpdateData): Promise<AddressEntity | null>;
    deleteAddress(cmp_uuid: string, cus_uuid: string, adr_uuid: string): Promise<AddressEntity | null>;
    findAddressByName(cmp_uuid: string, cus_uuid: string, adr_address: string, excludeUuid?: string | null): Promise<AddressEntity | null>;
}