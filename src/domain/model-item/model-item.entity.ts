export interface ModelItemEntity {
    cmp_uuid: string,
    itm_uuid: string,
    cmpitm_uuid: string,
    mitm_uuid: string,	
	mitm_name: string,
	mitm_description: string,
	mitm_active: boolean,
	mitm_createdat: Date,
    mitm_updatedat: Date
}

//Update
export type ModelItemUpdateData = Pick<ModelItemEntity, 'mitm_name' | 'mitm_description' | 'mitm_active'>