import { Express } from "express";
import { SequelizeRepository } from "../../repository/work-state/sequelize-work-state.repository";
import { WorkStateUseCase } from "../../../application/work-state/work-state-use-case";
import { WorkStateController } from "../../controller/work-state/work-state.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWorkStateRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeWorkStateRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const workStateUseCase = new WorkStateUseCase(sequelizeWorkStateRepository);
    
    /*
    *   Iniciar controller
    */
    
    const workStateCtrl = new WorkStateController(workStateUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/work-states/:cmp_uuid/:filter?/:page?/:perPage?`, workStateCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work-state/:cmp_uuid/:wrks_uuid`, workStateCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/work-state`, workStateCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/work-state/:cmp_uuid/:wrks_uuid`, workStateCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/work-state/:cmp_uuid/:wrks_uuid`, workStateCtrl.deleteCtrl);
}

export default configureWorkStateRoutes;