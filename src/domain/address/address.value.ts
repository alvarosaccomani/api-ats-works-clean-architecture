import { v4 as uuid } from "uuid";
import moment from 'moment';
import { AddressEntity } from "./address.entity";

export class AddressValue implements AddressEntity {
    cmp_uuid: string;
    adr_uuid: string;
    cus_uuid: string;
    adr_address: string;
    adr_city: string;
    adr_province: string;    
    adr_postalcode: string;
    adr_createdat: Date;
    adr_updatedat: Date;
    
    constructor({
            cmp_uuid,
            adr_uuid,
            cus_uuid,
            adr_address,
            adr_city,    
            adr_province,
            adr_postalcode,
            adr_createdat,
            adr_updatedat
        }:{ 
            cmp_uuid: string,
            adr_uuid: string,
            cus_uuid: string,
            adr_address: string,
            adr_city: string,
            adr_province: string,    
            adr_postalcode: string,
            adr_createdat?: Date,
            adr_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.adr_uuid = uuid();
        this.cus_uuid = cus_uuid;
        this.adr_address = adr_address;
        this.adr_city = adr_city;
        this.adr_province = adr_province;  
        this.adr_postalcode = adr_postalcode;
        this.adr_createdat = adr_createdat ?? moment().toDate();
        this.adr_updatedat = adr_updatedat ?? moment().toDate();
    }
}