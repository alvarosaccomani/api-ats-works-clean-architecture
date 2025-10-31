export interface GroupDetailModelItemEntity {
    cmp_uuid: string,
    itm_uuid: string,
    cmpitm_uuid: string,
    mitm_uuid: string,
    gdmitm_uuid: string,
	gdmitm_key: string,
    gdmitm_name: string,
	gdmitm_description: string,
	gdmitm_order: number,
	gdmitm_active: boolean,
	gdmitm_createdat: Date,
    gdmitm_updatedat: Date
}

//Update
export type GroupDetailModelItemUpdateData = Pick<GroupDetailModelItemEntity, 'gdmitm_key' | 'gdmitm_name' | 'gdmitm_description' | 'gdmitm_order' | 'gdmitm_active'>
