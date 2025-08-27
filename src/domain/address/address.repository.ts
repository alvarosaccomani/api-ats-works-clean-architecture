import { AddressEntity } from "./address.entity";

export interface AddressRepository {
    getAddresses(): Promise<AddressEntity[] | null>;
    findAddressById(cmp_uuid: string, adr_uuid: string): Promise<AddressEntity | null>;
    createAddress(address: AddressEntity): Promise<AddressEntity | null>;
    updateAddress(cmp_uuid: string, adr_uuid: string, address: AddressEntity): Promise<AddressEntity | null>;
    deleteAddress(cmp_uuid: string, adr_uuid: string): Promise<AddressEntity | null>;
    findAddressByName(cmp_uuid: string, adr_address: string, excludeUuid?: string | null): Promise<AddressEntity | null>;
}