import { WorkHistoryEntity, WorkHistoryUpdateData } from "./work-history.entity";

export interface WorkHistoryRepository {
    getWorksHistory(cmp_uuid: string, wrk_uuid: string): Promise<WorkHistoryEntity[] | null>;
    findWorkHistoryById(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string): Promise<WorkHistoryEntity | null>;
    createWorkHistory(workHistory: WorkHistoryEntity): Promise<WorkHistoryEntity | null>;
    updateWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string, workHistory: WorkHistoryUpdateData): Promise<WorkHistoryEntity | null>;
    deleteWorkHistory(cmp_uuid: string, wrk_uuid: string, wrkh_uuid: string): Promise<WorkHistoryEntity | null>;
}