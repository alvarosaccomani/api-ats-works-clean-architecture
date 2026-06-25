import { Express } from "express";
import { SequelizeRepository } from "../../repository/work-history/sequelize-work-history.repository";
import { WorkHistoryUseCase } from "../../../application/work-history/work-history-use-case";
import { WorkHistoryController } from "../../controller/work-history/work-history.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWorkHistoryRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeWorkHistoryRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const workHistoryUseCase = new WorkHistoryUseCase(sequelizeWorkHistoryRepository);
    
    /*
    *   Iniciar controller
    */
    const workHistoryCtrl = new WorkHistoryController(workHistoryUseCase, socketAdapter);
    
    // Rutas Express
    app.get(`/${process.env.BASE_URL_API}/works-history/:cmp_uuid/:wrk_uuid/:page?/:perPage?`, workHistoryCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work-history/:cmp_uuid/:wrk_uuid/:page?/:perPage?`, workHistoryCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work-history/:cmp_uuid/:wrk_uuid/:wrkh_uuid`, workHistoryCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/work-history`, workHistoryCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/work-history/:cmp_uuid/:wrk_uuid/:wrkh_uuid`, workHistoryCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/work-history/:cmp_uuid/:wrk_uuid/:wrkh_uuid`, workHistoryCtrl.deleteCtrl);
}

export default configureWorkHistoryRoutes;
