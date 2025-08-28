import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WorkDetailEntity } from "./work-detail.entity";

export class WorkDetailValue implements WorkDetailEntity {
    cmp_uuid: string;
    wrk_uuid: string;
    wrkd_uuid: string;
    wrkd_key: string;	
    wrkd_name: string;
    wrkd_description: string;
    dtp_uuid: string;
    wrkd_value: string;
    wrkd_createdat: Date;
    wrkd_updatedat: Date;
    
    constructor({
            cmp_uuid,
            wrk_uuid,
            wrkd_uuid,
            wrkd_key,	
            wrkd_name,
            wrkd_description,
            dtp_uuid,
            wrkd_value,
            wrkd_createdat,
            wrkd_updatedat
        }:{ 
            cmp_uuid: string,
            wrk_uuid: string,
            wrkd_uuid: string,
            wrkd_key: string,	
            wrkd_name: string,
            wrkd_description: string,
            dtp_uuid: string,
            wrkd_value: string,
            wrkd_createdat: Date,
            wrkd_updatedat: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.wrk_uuid = wrk_uuid;
        this.wrkd_uuid = uuid();
        this.wrkd_key = wrkd_key;
        this.wrkd_name = wrkd_name;
        this.wrkd_description = wrkd_description;
        this.dtp_uuid = dtp_uuid;
        this.wrkd_value = wrkd_value;
        this.wrkd_createdat = wrkd_createdat ?? moment().toDate();
        this.wrkd_updatedat = wrkd_updatedat ?? moment().toDate();
    }
}