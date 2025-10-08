import { v4 as uuid } from "uuid";
import moment from 'moment';
import { DetailModelItemEntity } from "./detail-model-item.entity";

export class DetailModelItemValue implements DetailModelItemEntity {
    cmp_uuid: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    mitm_uuid: string;	
	dmitm_uuid: string;	
    dmitm_key: string;	
    dmitm_name: string;
    dmitm_description: string;
    dtp_uuid: string;
    dmitm_defaultvalue: string;
    dmitm_arrayvalues: string;
    dmitm_order: number;
    dmitm_active: boolean;
	dmitm_createdat: Date;
    dmitm_updatedat: Date;
	
    
    constructor({
            cmp_uuid,
            itm_uuid,
            cmpitm_uuid,
            mitm_uuid,	
            dmitm_uuid,
            dmitm_key,
            dmitm_name,
            dmitm_description,
            dtp_uuid,
            dmitm_arrayvalues,
            dmitm_defaultvalue,
            dmitm_order,
            dmitm_active,
            dmitm_createdat,
            dmitm_updatedat
        }:{ 
            cmp_uuid: string,
            itm_uuid: string,
            cmpitm_uuid: string,
            mitm_uuid: string,
            dmitm_uuid: string,
            dmitm_key: string,
            dmitm_name: string,
            dmitm_description: string,
            dtp_uuid: string,
            dmitm_arrayvalues: string,
            dmitm_defaultvalue: string,
            dmitm_order: number,
            dmitm_active: boolean,
            dmitm_createdat?: Date,
            dmitm_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid;
        this.mitm_uuid = mitm_uuid;
        this.dmitm_uuid = uuid();
        this.dmitm_key = dmitm_key;
        this.dmitm_name = dmitm_name;
        this.dmitm_description = dmitm_description;
        this.dtp_uuid = dtp_uuid;
        this.dmitm_arrayvalues = dmitm_arrayvalues;
        this.dmitm_defaultvalue = dmitm_defaultvalue;
        this.dmitm_order = dmitm_order;
        this.dmitm_active = dmitm_active;
        this.dmitm_createdat = dmitm_createdat ?? moment().toDate();
        this.dmitm_updatedat = dmitm_updatedat ?? moment().toDate();
    }
}