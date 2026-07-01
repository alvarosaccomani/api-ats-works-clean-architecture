import { v4 as uuid } from "uuid";
import moment from 'moment';
import { MetricTypeEntity } from "./metric-type.entity";

export class MetricTypeValue implements MetricTypeEntity {
    mety_uuid: string;
    mety_cod: string;
    mety_name: string;
    mety_description: string;
    mety_active: boolean;
    mety_createdat: Date;
    mety_updatedat: Date;
    
    constructor({
            mety_uuid,
            mety_cod,
            mety_name,
            mety_description,
            mety_active,
            mety_createdat,
            mety_updatedat
        }:{ 
            mety_uuid: string,
            mety_cod: string,
            mety_name: string,
            mety_description: string,
            mety_active: boolean,
            mety_createdat?: Date,
            mety_updatedat?: Date
        }) {
        this.mety_uuid = uuid();
        this.mety_cod = mety_cod;
        this.mety_name = mety_name;
        this.mety_description = mety_description,
        this.mety_active = mety_active ?? true,
        this.mety_createdat = mety_createdat ?? moment().toDate(),
        this.mety_updatedat = mety_updatedat ?? moment().toDate()
    }
}