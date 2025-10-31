import { v4 as uuid } from "uuid";
import moment from 'moment';
import { GroupDetailModelItemEntity } from "./group-detail-model-item.entity";

export class GroupDetailModelItemValue implements GroupDetailModelItemEntity {
    cmp_uuid: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    mitm_uuid: string;
    gdmitm_uuid: string;
	gdmitm_key: string;
    gdmitm_name: string;
	gdmitm_description: string;
	gdmitm_order: number;
	gdmitm_active: boolean;
	gdmitm_createdat: Date;
    gdmitm_updatedat: Date;
    
    constructor({
            cmp_uuid,
            itm_uuid,
            cmpitm_uuid,
            mitm_uuid,
            gdmitm_uuid,
            gdmitm_key,
            gdmitm_name,
            gdmitm_description,
            gdmitm_order,
            gdmitm_active,
            gdmitm_createdat,
            gdmitm_updatedat
        }:{ 
            cmp_uuid: string,
            itm_uuid: string,
            cmpitm_uuid: string,
            mitm_uuid: string,
            gdmitm_uuid: string,
            gdmitm_key: string,
            gdmitm_name: string,
            gdmitm_description: string,
            gdmitm_order: number,
            gdmitm_active: boolean,
            gdmitm_createdat?: Date,
            gdmitm_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid;
        this.mitm_uuid = mitm_uuid;
        this.gdmitm_uuid = uuid();
        this.gdmitm_key = gdmitm_key;
        this.gdmitm_name = gdmitm_name;
        this.gdmitm_description = gdmitm_description;
        this.gdmitm_order = gdmitm_order;
        this.gdmitm_active = gdmitm_active;
        this.gdmitm_createdat = gdmitm_createdat ?? moment().toDate();
        this.gdmitm_updatedat = gdmitm_updatedat ?? moment().toDate();
    }
}