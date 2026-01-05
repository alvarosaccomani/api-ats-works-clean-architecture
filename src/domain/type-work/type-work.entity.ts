export interface TypeWorkEntity {
    cmp_uuid: string,
    twrk_uuid: string,
    twrk_name: string,
    twrk_description: string,
    twrk_createdat: Date,
    twrk_updatedat: Date
}

//Update
export type TypeWorkUpdateData = Pick<TypeWorkEntity, 'twrk_name' | 'twrk_description'>;
