export interface CollectionFormEntity {
    cmp_uuid: string,
    cfrm_uuid: string,
    cfrm_name: string,
    cfrm_order: number,
    cfrm_bkcolor: string,    
    cfrm_frcolor: string,
    cfrm_active: boolean,
    cfrm_createdat: Date,
    cfrm_updatedat: Date
}

//Update
export type CollectionFormUpdateData = Pick<CollectionFormEntity, 'cfrm_name' | 'cfrm_order' | 'cfrm_bkcolor' | 'cfrm_frcolor' | 'cfrm_active'>