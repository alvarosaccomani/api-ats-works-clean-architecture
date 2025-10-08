export interface DataTypeEntity {
    dtp_uuid: string,
    dtp_cod: string,
    dtp_name: string,
    dtp_description: string,
    dtp_active: boolean,
    dtp_createdat: Date,
    dtp_updatedat: Date
}

//Update
export type DataTypeUpdateData = Pick<DataTypeEntity, 'dtp_cod' | 'dtp_name' | 'dtp_description' | 'dtp_active'>