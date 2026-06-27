import { v4 as uuid } from "uuid";
import moment from 'moment';
import { MenuEntity } from "./menu.entity";

export class MenuValue implements MenuEntity {
    mnu_uuid: string;
    mnu_parent_uuid: string;
    mnu_cod: string;
    mnu_title: string;
    mnu_description: string;
    mnu_icon: string;
    mnu_route: string;
    mnu_order: number;
    mnu_showifcompanyactive: boolean;
    mnu_itemactive: boolean;
    mnu_active: boolean;
    mnu_createdat: Date;
    mnu_updatedat: Date;
    per_uuid?: string | null;
    
    constructor({
            mnu_uuid,
            mnu_parent_uuid,
            mnu_cod,
            mnu_title,
            mnu_description,
            mnu_icon,
            mnu_route,
            mnu_order,
            mnu_showifcompanyactive,
            mnu_itemactive,
            mnu_active,
            mnu_createdat,
            mnu_updatedat,
            per_uuid
        }:{ 
            mnu_uuid: string,
            mnu_parent_uuid: string,
            mnu_cod: string,
            mnu_title: string,
            mnu_description: string,
            mnu_icon: string,
            mnu_route: string,
            mnu_order: number,
            mnu_showifcompanyactive: boolean,
            mnu_itemactive: boolean,
            mnu_active: boolean,
            mnu_createdat?: Date,
            mnu_updatedat?: Date,
            per_uuid?: string | null
        }) {
        this.mnu_uuid = uuid();
        this.mnu_parent_uuid = mnu_parent_uuid;
        this.mnu_cod = mnu_cod;
        this.mnu_title = mnu_title;
        this.mnu_description = mnu_description;
        this.mnu_icon = mnu_icon;
        this.mnu_route = mnu_route;
        this.mnu_order = mnu_order;
        this.mnu_showifcompanyactive = mnu_showifcompanyactive;
        this.mnu_itemactive = mnu_itemactive;
        this.mnu_active = mnu_active;
        this.mnu_createdat = mnu_createdat ?? moment().toDate();
        this.mnu_updatedat = mnu_updatedat ?? moment().toDate();
        this.per_uuid = per_uuid ?? null;
    }
}