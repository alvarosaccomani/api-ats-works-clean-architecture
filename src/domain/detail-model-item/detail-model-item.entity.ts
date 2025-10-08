export interface DetailModelItemEntity {
    cmp_uuid: string,
    itm_uuid: string,
    cmpitm_uuid: string,
    mitm_uuid: string,	
	dmitm_uuid: string,	
    dmitm_key: string,	
    dmitm_name: string,
    dmitm_description: string,
    dtp_uuid: string,
    dmitm_arrayvalues: string,
    dmitm_defaultvalue: string,
    dmitm_order: number,
    dmitm_active: boolean,
	dmitm_createdat: Date,
    dmitm_updatedat: Date
}

//Update
export type DetailModelItemUpdateData = Pick<DetailModelItemEntity, 'dmitm_key' | 'dmitm_name' | 'dmitm_description' | 'dtp_uuid' | 'dmitm_arrayvalues' | 'dmitm_defaultvalue' | 'dmitm_order' | 'dmitm_active'>