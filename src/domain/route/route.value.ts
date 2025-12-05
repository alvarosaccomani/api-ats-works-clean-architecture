import { v4 as uuid } from "uuid";
import moment from 'moment';
import { RouteEntity } from "./route.entity";

export class RouteValue implements RouteEntity {
    cmp_uuid: string;
    rou_uuid: string;
    rou_name: string;
    rou_order: number;
    rou_description: string;
    rou_bkcolor: string;
    rou_frcolor: string;
    rou_active: boolean;
    rou_createdat: Date;
    rou_updatedat: Date;
    
    constructor({
            cmp_uuid,
            rou_uuid,
            rou_name,
            rou_order,
            rou_description,
            rou_bkcolor,
            rou_frcolor,
            rou_active,
            rou_createdat,
            rou_updatedat
        }:{ 
            cmp_uuid: string,
            rou_uuid: string,
            rou_name: string,
            rou_order: number,
            rou_description: string,
            rou_bkcolor: string,
            rou_frcolor: string,
            rou_active: boolean,
            rou_createdat?: Date,
            rou_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.rou_uuid = uuid();
        this.rou_name = rou_name;
        this.rou_order = rou_order;
        this.rou_description = rou_description;
        this.rou_bkcolor = rou_bkcolor;
        this.rou_frcolor = rou_frcolor;
        this.rou_active = rou_active;
        this.rou_createdat = rou_createdat ?? moment().toDate();
        this.rou_updatedat = rou_updatedat ?? moment().toDate();
    }
}