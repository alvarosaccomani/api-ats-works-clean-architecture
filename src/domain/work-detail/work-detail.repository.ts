import { WorkDetailEntity, WorkDetailUpdateData } from "./work-detail.entity";

export interface WorkDetailRepository {
    getWorkDetails(cmp_uuid: string): Promise<WorkDetailEntity[] | null>;
    findWorkDetailById(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string): Promise<WorkDetailEntity | null>;
    createWorkDetail(workdetail: WorkDetailEntity): Promise<WorkDetailEntity | null>;
    updateWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string, workdetail: WorkDetailUpdateData): Promise<WorkDetailEntity | null>;
    deleteWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string): Promise<WorkDetailEntity | null>;
    existWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string): Promise<WorkDetailEntity | null>;
}