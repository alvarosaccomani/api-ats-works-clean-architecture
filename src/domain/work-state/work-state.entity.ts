export interface WorkStateEntity {
    cmp_uuid: string,
    wrks_uuid: string,
    wrks_name: string,
    wrks_description: string,
    wrks_bkcolor: string,
    wrks_frcolor: string,
    wrks_createdat: Date,
    wrks_updatedat: Date
}

//Update
export type WorkStateUpdateData = Pick<WorkStateEntity, 'wrks_name' | 'wrks_description' | 'wrks_bkcolor' | 'wrks_frcolor'>