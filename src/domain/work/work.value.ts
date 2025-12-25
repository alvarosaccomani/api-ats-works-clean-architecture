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
    wrk_operator_uuid1: string;
    wrk_operator_uuid2: string;
    wrk_operator_uuid3: string;
    wrk_operator_uuid4: string;
    wrk_eventualclient: string;
    wrk_eventualaddress: string;
    wrk_eventualphone: string;
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
            wrk_operator_uuid1,
            wrk_operator_uuid2,
            wrk_operator_uuid3,
            wrk_operator_uuid4,
            wrk_eventualclient,
            wrk_eventualaddress,
            wrk_eventualphone,
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
            wrk_operator_uuid1: string,
            wrk_operator_uuid2: string,
            wrk_operator_uuid3: string,
            wrk_operator_uuid4: string,
            wrk_eventualclient: string,
            wrk_eventualaddress: string,
            wrk_eventualphone: string,
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
        this.wrk_operator_uuid1 = wrk_operator_uuid1;
        this.wrk_operator_uuid2 = wrk_operator_uuid2;
        this.wrk_operator_uuid3 = wrk_operator_uuid3;
        this.wrk_operator_uuid4 = wrk_operator_uuid4;
        this.wrk_eventualclient = wrk_eventualclient;
        this.wrk_eventualaddress = wrk_eventualaddress;
        this.wrk_eventualphone = wrk_eventualphone;
        this.itm_uuid = itm_uuid;
        this.cmpitm_uuid = cmpitm_uuid;
        this.mitm_uuid = mitm_uuid;
        this.wrk_createdat = wrk_createdat ?? moment().toDate();
        this.wrk_updatedat = wrk_updatedat ?? moment().toDate();
    }
}