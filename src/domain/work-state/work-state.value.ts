import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WorkStateEntity } from "./work-state.entity";

export class WorkStateValue implements WorkStateEntity {
    cmp_uuid: string;
    wrks_uuid: string;
    wrks_name: string;
    wrks_description: string;
    wrks_bkcolor: string;
    wrks_frcolor: string;
    wrks_createdat: Date;
    wrks_updatedat: Date;
    
    constructor({
            cmp_uuid,
            wrks_uuid,
            wrks_name,
            wrks_description,
            wrks_bkcolor,
            wrks_frcolor,
            wrks_createdat,
            wrks_updatedat
        }:{ 
            cmp_uuid: string,
            wrks_uuid: string,
            wrks_name: string,
            wrks_description: string,
            wrks_bkcolor: string,
            wrks_frcolor: string,
            wrks_createdat?: Date,
            wrks_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.wrks_uuid = uuid();
        this.wrks_name = wrks_name;
        this.wrks_description = wrks_description;
        this.wrks_bkcolor = wrks_bkcolor;
        this.wrks_frcolor = wrks_frcolor;
        this.wrks_createdat = wrks_createdat ?? moment().toDate();
        this.wrks_updatedat = wrks_updatedat ?? moment().toDate();
    }
}