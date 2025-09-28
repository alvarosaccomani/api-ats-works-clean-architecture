import { DashboardRepository } from "../../domain/dashboard/dashboard.repository";

export class DashboardUseCase {
    constructor(
        private readonly dashboardRepository: DashboardRepository
    ) {
        this.getDashboards = this.getDashboards.bind(this);
    }

    public async getDashboards(cmp_uuid: string) {
        try {
            const dashboard = this.dashboardRepository.getDashboards(cmp_uuid);
            if(!dashboard) {
                throw new Error('No hay dashboard.');
            }
            return dashboard;
        } catch (error: any) {
            console.error('Error en getDashboards (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
}