import { v4 as uuid } from "uuid";
import moment from 'moment';
import { TypeWorkEntity } from "./type-work.entity";

export class TypeWorkValue implements TypeWorkEntity {
    cmp_uuid: string;
    twrk_uuid: string;
    twrk_name: string;
    twrk_description: string;
    twrk_createdat: Date;
    twrk_updatedat: Date;
    
    constructor({
            cmp_uuid,
            twrk_uuid,
            twrk_name,
            twrk_description,
            twrk_createdat,
            twrk_updatedat
        }:{ 
            cmp_uuid: string,
            twrk_uuid: string,
            twrk_name: string,
            twrk_description: string,
            twrk_createdat?: Date,
            twrk_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.twrk_uuid = uuid();
        this.twrk_name = twrk_name;
        this.twrk_description = twrk_description;
        this.twrk_createdat = twrk_createdat ?? moment().toDate();
        this.twrk_updatedat = twrk_updatedat ?? moment().toDate();
    }
}