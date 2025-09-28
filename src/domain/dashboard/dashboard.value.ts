import { v4 as uuid } from "uuid";
import moment from 'moment';
import { DashboardEntity } from "./dashboard.entity";

export class DashboardValue implements DashboardEntity {
    cmp_uuid: string;
    companiesCount: string;
    usersCount: string;
    itemsCount: string;
    modelsItemsCount: string;
    worksCount: string;
    customersCount: string;
    
    constructor({
            cmp_uuid,
            companiesCount,
            usersCount,
            itemsCount,
            modelsItemsCount,    
            worksCount,
            customersCount
        }:{ 
            cmp_uuid: string,
            companiesCount: string,
            usersCount: string,
            itemsCount: string,
            modelsItemsCount: string,
            worksCount: string,    
            customersCount: string
        }) {
        this.cmp_uuid = cmp_uuid;
        this.companiesCount = companiesCount;
        this.usersCount = usersCount;
        this.itemsCount = itemsCount;
        this.modelsItemsCount = modelsItemsCount;
        this.worksCount = worksCount;  
        this.customersCount = customersCount;
    }
}