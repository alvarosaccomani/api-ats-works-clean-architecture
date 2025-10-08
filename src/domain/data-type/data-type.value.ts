import { v4 as uuid } from "uuid";
import moment from 'moment';
import { DataTypeEntity } from "./data-type.entity";

export class DataTypeValue implements DataTypeEntity {
    dtp_uuid: string;
    dtp_cod: string;
    dtp_name: string;
    dtp_description: string;
    dtp_active: boolean;
    dtp_createdat: Date;
    dtp_updatedat: Date;
    
    constructor({
            dtp_uuid,
            dtp_cod,
            dtp_name,
            dtp_description,
            dtp_active,
            dtp_createdat,
            dtp_updatedat
        }:{ 
            dtp_uuid: string,
            dtp_cod: string,
            dtp_name: string,
            dtp_description: string,
            dtp_active: boolean,
            dtp_createdat?: Date,
            dtp_updatedat?: Date
        }) {
        this.dtp_uuid = uuid();
        this.dtp_cod = dtp_cod;
        this.dtp_name = dtp_name;
        this.dtp_description = dtp_description,
        this.dtp_active = dtp_active ?? true,
        this.dtp_createdat = dtp_createdat ?? moment().toDate(),
        this.dtp_updatedat = dtp_updatedat ?? moment().toDate()
    }
}