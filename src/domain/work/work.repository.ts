import { WorkEntity, WorkUpdateData } from "./work.entity";

export interface WorkRepository {
    getWorks(cmp_uuid: string, wrk_dateFrom: Date | undefined, wrk_dateTo: Date | undefined, wrk_fullname: string | undefined, field_order: string | undefined, wrk_order: string | undefined): Promise<WorkEntity[] | null>;
    findWorkById(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null>;
    createWork(work: WorkEntity): Promise<WorkEntity | null>;
    updateWork(cmp_uuid: string, wrk_uuid: string, work: WorkUpdateData): Promise<WorkEntity | null>;
    deleteWork(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null>;
    existWork(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null>;
    getPendingWorks(cmp_uuid: string, wrks_uuid: string | undefined, wrk_route: string | undefined, field_order: string | undefined, wrk_order: string | undefined): Promise<WorkEntity[] | null>;
    getWorksScheduler(cmp_uuid: string, wrk_dateFrom: Date | undefined, wrk_dateTo: Date | undefined, wrks_uuid: string | undefined, wrk_route: string | undefined, field_order: string | undefined, wrk_order: string | undefined): Promise<WorkEntity[] | null>;
}