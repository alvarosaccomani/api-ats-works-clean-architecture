import { Express } from "express";
import { SequelizeRepository as SequelizeWorkRepository } from "../../repository/work/sequelize-work.repository";
import { SequelizeRepository as SequelizeWorkDetailRepository } from "../../repository/work-detail/sequelize-work-detail.repository";
import { WorkUseCase } from "../../../application/work/work-use-case";
import { WorkController } from "../../controller/work/work.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWorkRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeWorkRepository = new SequelizeWorkRepository();
    const sequelizeWorkDetailRepository = new SequelizeWorkDetailRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const workUseCase = new WorkUseCase(sequelizeWorkRepository, sequelizeWorkDetailRepository);
    
    /*
    *   Iniciar controller
    */
    
    const workCtrl = new WorkController(workUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/works/:cmp_uuid`, workCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work/:cmp_uuid/:wrk_uuid`, workCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/work`, workCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/work/:cmp_uuid/:wrk_uuid`, workCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/work/:cmp_uuid/:wrk_uuid`, workCtrl.deleteCtrl);
    app.get(`/${process.env.BASE_URL_API}/pending-works/:cmp_uuid`, workCtrl.getPendingWorksCtrl);
    app.get(`/${process.env.BASE_URL_API}/works-scheduler/:cmp_uuid`, workCtrl.getWorksSchedulerCtrl);
}

export default configureWorkRoutes;