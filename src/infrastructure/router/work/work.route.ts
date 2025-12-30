import { Express } from "express";
import { SequelizeRepository } from "../../repository/work/sequelize-work.repository";
import { WorkUseCase } from "../../../application/work/work-use-case";
import { WorkController } from "../../controller/work/work.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWorkRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeWorkRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const workUseCase = new WorkUseCase(sequelizeWorkRepository);
    
    /*
    *   Iniciar controller
    */
    
    const workCtrl = new WorkController(workUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/works/:cmp_uuid`, workCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work/:cmp_uuid/:wrk_uuid`, workCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/work`, workCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/work/:cmp_uuid/:wrk_uuid`, workCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/work/:cmp_uuid/:wrk_uuid`, workCtrl.deleteCtrl);
}

export default configureWorkRoutes;