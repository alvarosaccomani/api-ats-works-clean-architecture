import { WorkStateEntity } from "./work-state.entity";

export interface WorkStateRepository {
    getWorkStates(): Promise<WorkStateEntity[] | null>;
    findWorkStateById(cmp_uuid: string, wrks_uuid: string): Promise<WorkStateEntity | null>;
    createWorkState(workState: WorkStateEntity): Promise<WorkStateEntity | null>;
    updateWorkState(cmp_uuid: string, wrks_uuid: string, workState: WorkStateEntity): Promise<WorkStateEntity | null>;
    deleteWorkState(cmp_uuid: string, wrks_uuid: string): Promise<WorkStateEntity | null>;
    findWorkStateByName(cmp_uuid: string, wrks_name: string, excludeUuid?: string | null): Promise<WorkStateEntity | null>;
}