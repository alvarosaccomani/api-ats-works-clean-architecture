import { RouteEntity } from "../route/route.entity"
import { SubscriptionPlanEntity } from "../subscription-plan/subscription-plan.entity"

export interface CustomerEntity {
    cmp_uuid: string,
    cus_uuid: string,
    cus_fullname: string,
    cus_email: string,
    cus_phone: string,
    cus_dateofbirth: Date,
    cus_addresses?: string,
    rou_uuid: string,
    rou?: RouteEntity
    pmt_uuid: string,
    usr_uuid: string,
    cus_subscriptionplanbycustomer: boolean,
    subp_uuid: string,
    subp?: SubscriptionPlanEntity,
    cus_active: boolean,
    cus_createdat: Date,
    cus_updatedat: Date
}

//Update
export type CustomerUpdateData = Pick<CustomerEntity, 'cus_fullname' | 'cus_email' | 'cus_phone' | 'cus_dateofbirth' | 'rou_uuid' | 'pmt_uuid' | 'usr_uuid' | 'cus_subscriptionplanbycustomer' | 'subp_uuid' | 'cus_active'>