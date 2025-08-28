import { Express } from "express";
import { SequelizeRepository } from "../../repository/work-detail/sequelize-work-detail.repository";
import { WorkDetailUseCase } from "../../../application/work-detail/work-detail-use-case";
import { WorkDetailController } from "../../controller/work-detail/work-detail.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWorkDetailRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeWorkDetailRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const workdetailUseCase = new WorkDetailUseCase(sequelizeWorkDetailRepository);
    
    /*
    *   Iniciar controller
    */
    
    const workDetailCtrl = new WorkDetailController(workdetailUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/work-details/:filter?/:page?/:perPage?`, workDetailCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work-detail/:cmp_uuid/:wrk_uuid/:wrkd_uuid`, workDetailCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/work-detail`, workDetailCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/work-detail/:cmp_uuid/:wrk_uuid/:wrkd_uuid`, workDetailCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/work-detail/:cmp_uuid/:wrk_uuid/:wrkd_uuid`, workDetailCtrl.deleteCtrl);
}

export default configureWorkDetailRoutes;