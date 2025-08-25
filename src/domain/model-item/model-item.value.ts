import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ModelItemEntity } from "./model-item.entity";

export class ModelItemValue implements ModelItemEntity {
    cmp_uuid: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    mitm_uuid: string;	
	mitm_name: string;
	mitm_description: string;
	mitm_active: boolean;
	mitm_createdat: Date;
    mitm_updatedat: Date;
    
    constructor({
            cmp_uuid,
            itm_uuid,
            cmpitm_uuid,
            mitm_uuid,	
            mitm_name,
            mitm_description,
            mitm_active,
            mitm_createdat,
            mitm_updatedat
        }:{ 
            cmp_uuid: string,
            itm_uuid: string,
            cmpitm_uuid: string,
            mitm_uuid: string,
            mitm_name: string,
            mitm_description: string,
            mitm_active: boolean,
            mitm_createdat: Date,
            mitm_updatedat: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid;
        this.mitm_uuid = uuid();
        this.mitm_name = mitm_name;
        this.mitm_description = mitm_description;
        this.mitm_active = mitm_active;
        this.mitm_createdat = mitm_createdat ?? moment().toDate();
        this.mitm_updatedat = mitm_updatedat ?? moment().toDate();
    }
}