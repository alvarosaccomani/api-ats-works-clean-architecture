import { Request, Response } from "express";
import { DashboardUseCase } from "../../../application/dashboard/dashboard-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class DashboardController {
    constructor(private dashboardUseCase: DashboardUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const dashboard = await this.dashboardUseCase.getDashboards(cmp_uuid)
            return res.status(200).send({
                success: true,
                message: 'Dashboard retornado.',
                data: dashboard
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los dashboards.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}