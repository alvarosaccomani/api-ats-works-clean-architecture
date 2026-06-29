import { DashboardRepository } from "../../domain/dashboard/dashboard.repository";

export class DashboardUseCase {
    constructor(
        private readonly dashboardRepository: DashboardRepository
    ) {
        this.getDashboards = this.getDashboards.bind(this);
        this.getDashboardAnalytics = this.getDashboardAnalytics.bind(this);
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

    public async getDashboardAnalytics(cmp_uuid: string) {
        try {
            const analytics = await this.dashboardRepository.getDashboardAnalytics(cmp_uuid);
            if (!analytics) {
                throw new Error('No hay datos analíticos para el dashboard.');
            }
            return analytics;
        } catch (error: any) {
            console.error('Error en getDashboardAnalytics (use case):', error.message);
            throw error;
        }
    }
}