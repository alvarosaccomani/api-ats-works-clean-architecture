export interface WorkDetailEntity {
    cmp_uuid: string,
    wrk_uuid: string,
    wrkd_uuid: string,
    wrkd_key: string,	
	wrkd_name: string,
    wrkd_description: string,
    dtp_uuid: string,
	wrkd_value: string,
    wrkd_order: string,
	wrkd_createdat: Date,
    wrkd_updatedat: Date
}

//Update
export type WorkDetailUpdateData = Pick<WorkDetailEntity, 'wrkd_key' | 'wrkd_name' | 'wrkd_description' | 'dtp_uuid' | 'wrkd_value' | 'wrkd_order'>