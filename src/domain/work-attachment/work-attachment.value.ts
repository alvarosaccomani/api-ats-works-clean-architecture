import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WorkAttachmentEntity } from "./work-attachment.entity";

export class WorkAttachmentValue implements WorkAttachmentEntity {
    cmp_uuid: string;
    wrk_uuid: string;
    wrka_uuid: string;
    wrka_attachmenttype: string;	
	wrka_filepath: string;
    wrka_createdat: Date;
    wrka_updatedat: Date;
    
    constructor({
            cmp_uuid,
            wrk_uuid,
            wrka_uuid,
            wrka_attachmenttype,	
            wrka_filepath,
            wrka_createdat,
            wrka_updatedat
        }:{ 
            cmp_uuid: string,
            wrk_uuid: string,
            wrka_uuid: string,
            wrka_attachmenttype: string,	
            wrka_filepath: string,
            wrka_createdat: Date,
            wrka_updatedat: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.wrk_uuid = wrk_uuid;
        this.wrka_uuid = uuid();
        this.wrka_attachmenttype = wrka_attachmenttype;
        this.wrka_filepath = wrka_filepath;
        this.wrka_createdat = wrka_createdat ?? moment().toDate();
        this.wrka_updatedat = wrka_updatedat ?? moment().toDate();
    }
}