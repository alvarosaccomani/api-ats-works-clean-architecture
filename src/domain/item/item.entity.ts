export interface ItemEntity {
    itm_uuid: string,
    itm_name: string,
    itm_description: string,
    itm_createdat: Date,
    itm_updatedat: Date
}

//Update
export type ItemUpdateData = Pick<ItemEntity, 'itm_name' | 'itm_description'>