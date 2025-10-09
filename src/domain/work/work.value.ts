import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WorkEntity } from "./work.entity";

export class WorkValue implements WorkEntity {
    cmp_uuid: string;
    wrk_uuid: string;
    adr_uuid: string;
    wrk_description: string;	
	wrk_workdate: Date;
    wrk_workdateinit: Date;
    wrk_workdatefinish: Date;
	wrks_uuid: string;
    wrk_user_uuid: string;
    wrk_operator_uuid: string;
    itm_uuid: string;
    cmpitm_uuid: string;
    mitm_uuid: string;
	wrk_createdat: Date;
    wrk_updatedat: Date;
    
    constructor({
            cmp_uuid,
            wrk_uuid,
            adr_uuid,
            wrk_description,	
            wrk_workdate,
            wrk_workdateinit,
            wrk_workdatefinish,
            wrks_uuid,
            wrk_user_uuid,
            wrk_operator_uuid,
            itm_uuid,
            cmpitm_uuid,
            mitm_uuid,
            wrk_createdat,
            wrk_updatedat
        }:{ 
            cmp_uuid: string,
            wrk_uuid: string,
            adr_uuid: string,
            wrk_description: string,	
            wrk_workdate: Date,
            wrk_workdateinit: Date,
            wrk_workdatefinish: Date,
            wrks_uuid: string,
            wrk_user_uuid: string,
            wrk_operator_uuid: string,
            itm_uuid: string,
            cmpitm_uuid: string,
            mitm_uuid: string,
            wrk_createdat?: Date,
            wrk_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.wrk_uuid = uuid();
        this.adr_uuid = adr_uuid;
        this.wrk_description = wrk_description;
        this.wrk_workdate = wrk_workdate;
        this.wrk_workdateinit = wrk_workdateinit;
        this.wrk_workdatefinish = wrk_workdatefinish;
        this.wrks_uuid = wrks_uuid;
        this.wrk_user_uuid = wrk_user_uuid;
        this.wrk_operator_uuid = wrk_operator_uuid;
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid;
        this.mitm_uuid = mitm_uuid;
        this.wrk_createdat = wrk_createdat ?? moment().toDate();
        this.wrk_updatedat = wrk_updatedat ?? moment().toDate();
    }
}