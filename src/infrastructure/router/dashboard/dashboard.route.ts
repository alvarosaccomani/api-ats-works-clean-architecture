import { Express } from "express";
import { SequelizeRepository } from "../../repository/dashboard/sequelize-dashboard.repository";
import { DashboardUseCase } from "../../../application/dashboard/dashboard-use-case";
import { DashboardController } from "../../controller/dashboard/dashboard.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureDashboardRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeDashboardRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const dashboardUseCase = new DashboardUseCase(sequelizeDashboardRepository);
    
    /*
    *   Iniciar controller
    */
    
    const dashboardCtrl = new DashboardController(dashboardUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/dashboards/:cmp_uuid?/:filter?/:page?/:perPage?`, dashboardCtrl.getAllCtrl);
}

export default configureDashboardRoutes;