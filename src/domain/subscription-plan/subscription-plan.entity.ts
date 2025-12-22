export interface SubscriptionPlanEntity {
    cmp_uuid: string,
    subp_uuid: string,
    subp_name: string,
    subp_description: string,
    subp_active: boolean,
    subp_createdat: Date,
    subp_updatedat: Date
}

//Update
export type SubscriptionPlanUpdateData = Pick<SubscriptionPlanEntity, 'subp_name' | 'subp_description' | 'subp_active'>