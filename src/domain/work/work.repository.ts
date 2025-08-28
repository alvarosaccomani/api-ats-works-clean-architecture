import { WorkEntity } from "./work.entity";

export interface WorkRepository {
    getWorks(): Promise<WorkEntity[] | null>;
    findWorkById(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null>;
    createWork(work: WorkEntity): Promise<WorkEntity | null>;
    updateWork(cmp_uuid: string, wrk_uuid: string, work: WorkEntity): Promise<WorkEntity | null>;
    deleteWork(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null>;
    existWork(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null>;
}