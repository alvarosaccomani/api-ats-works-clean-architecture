import { SubscriptionPlanEntity } from "../subscription-plan/subscription-plan.entity";

export interface AddressEntity {
    cmp_uuid: string,
    adr_uuid: string,
    cus_uuid: string,    
    adr_address: string,
    adr_city: string,
    adr_province: string,    
    adr_postalcode: string,
    adr_dimensions: string,
    subp_uuid: string,
    subp?: SubscriptionPlanEntity,
    adr_createdat: Date,
    adr_updatedat: Date
}

//Update
export type AddressUpdateData = Pick<AddressEntity, 'adr_address' | 'adr_city' | 'adr_province' | 'adr_postalcode' | 'adr_dimensions' | 'subp_uuid'>;