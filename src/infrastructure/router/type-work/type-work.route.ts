import { Express } from "express";
import { SequelizeRepository } from "../../repository/type-work/sequelize-type-work.repository";
import { TypeWorkUseCase } from "../../../application/type-work/type-work-use-case";
import { TypeWorkController } from "../../controller/type-work/type-work.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureTypeWorkRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeTypeWorkRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const typeWorkUseCase = new TypeWorkUseCase(sequelizeTypeWorkRepository);
    
    /*
    *   Iniciar controller
    */
    
    const typeWorkCtrl = new TypeWorkController(typeWorkUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/type-works/:cmp_uuid/:filter?/:page?/:perPage?`, typeWorkCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/type-works/:cmp_uuid/:twrk_uuid`, typeWorkCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/type-works`, typeWorkCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/type-works/:cmp_uuid/:twrk_uuid`, typeWorkCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/type-works/:cmp_uuid/:twrk_uuid`, typeWorkCtrl.deleteCtrl);
}

export default configureTypeWorkRoutes;
