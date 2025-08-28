export interface WorkEntity {
    cmp_uuid: string,
    wrk_uuid: string,
    adr_uuid: string,
    wrk_description: string,	
	wrk_workdate: Date,
    wrk_workdateinit: Date,
    wrk_workdatefinish: Date,
	wrks_uuid: string,
    wrk_user_uuid: string,
    wrk_operator_uuid: string,
    itm_uuid: string,
    cmpitm_uuid: string,
    mitm_uuid: string,
	wrk_createdat: Date,
    wrk_updatedat: Date
}