export interface WorkHistoryEntity {
    cmp_uuid: string;
    wrk_uuid: string;
    wrkh_uuid: string;
    wrks_uuid: string;
    usr_uuid: string;
    wrkh_comment: string;
    wrkh_createdat: Date;
}

//Update
export type WorkHistoryUpdateData = Pick<WorkHistoryEntity, 'wrkh_comment'>;
