import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WorkHistoryEntity } from "./work-history.entity";

export class WorkHistoryValue implements WorkHistoryEntity {
    cmp_uuid: string;
    wrk_uuid: string;
    wrkh_uuid: string;
    wrks_uuid: string;
    usr_uuid: string;
    wrkh_comment: string;
    wrkh_createdat: Date;
    
    constructor({
            cmp_uuid,
            wrk_uuid,
            wrkh_uuid,
            wrks_uuid,
            usr_uuid,
            wrkh_comment,
            wrkh_createdat
        }:{ 
            cmp_uuid: string,
            wrk_uuid: string,
            wrkh_uuid?: string,
            wrks_uuid: string,
            usr_uuid: string,
            wrkh_comment: string,
            wrkh_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.wrk_uuid = wrk_uuid;
        this.wrkh_uuid = wrkh_uuid ?? uuid();
        this.wrks_uuid = wrks_uuid;
        this.usr_uuid = usr_uuid;
        this.wrkh_comment = wrkh_comment;
        this.wrkh_createdat = wrkh_createdat ?? moment().toDate();
    }
}