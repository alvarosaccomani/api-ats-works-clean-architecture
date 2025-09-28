import { DashboardEntity } from "./dashboard.entity";

export interface DashboardRepository {
    getDashboards(cmp_uuid: string): Promise<DashboardEntity | null>;
}