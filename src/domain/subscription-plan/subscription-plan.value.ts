import { v4 as uuid } from "uuid";
import moment from 'moment';
import { SubscriptionPlanEntity } from "./subscription-plan.entity";

export class SubscriptionPlanValue implements SubscriptionPlanEntity {
    cmp_uuid: string;
    subp_uuid: string;
    subp_name: string;
    subp_description: string;
    subp_active: boolean;
    subp_createdat: Date;
    subp_updatedat: Date;
    
    constructor({
            cmp_uuid,
            subp_uuid,
            subp_name,
            subp_description,
            subp_active,
            subp_createdat,
            subp_updatedat
        }:{ 
            cmp_uuid: string,
            subp_uuid: string,
            subp_name: string,
            subp_description: string,
            subp_active: boolean,
            subp_createdat?: Date,
            subp_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.subp_uuid = subp_uuid;
        this.subp_name = subp_name;
        this.subp_description = subp_description;
        this.subp_active = subp_active;
        this.subp_createdat = subp_createdat ?? moment().toDate();
        this.subp_updatedat = subp_updatedat ?? moment().toDate();
    }
}