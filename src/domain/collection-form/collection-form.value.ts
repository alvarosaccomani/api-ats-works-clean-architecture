import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CollectionFormEntity } from "./collection-form.entity";

export class CollectionFormValue implements CollectionFormEntity {
    cmp_uuid: string;
    cfrm_uuid: string;
    cfrm_name: string;
    cfrm_order: number;
    cfrm_bkcolor: string;    
    cfrm_frcolor: string;
    cfrm_active: boolean;
    cfrm_createdat: Date;
    cfrm_updatedat: Date;
    
    constructor({
            cmp_uuid,
            cfrm_uuid,
            cfrm_name,
            cfrm_order,
            cfrm_bkcolor,    
            cfrm_frcolor,
            cfrm_active,
            cfrm_createdat,
            cfrm_updatedat
        }:{ 
            cmp_uuid: string,
            cfrm_uuid: string,
            cfrm_name: string,
            cfrm_order: number,
            cfrm_bkcolor: string,    
            cfrm_frcolor: string,
            cfrm_active: boolean,
            cfrm_createdat?: Date,
            cfrm_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cfrm_uuid = uuid();
        this.cfrm_name = cfrm_name;
        this.cfrm_order = cfrm_order;
        this.cfrm_bkcolor = cfrm_bkcolor;  
        this.cfrm_frcolor = cfrm_frcolor;
        this.cfrm_active = cfrm_active;
        this.cfrm_createdat = cfrm_createdat ?? moment().toDate();
        this.cfrm_updatedat = cfrm_updatedat ?? moment().toDate();
    }
}