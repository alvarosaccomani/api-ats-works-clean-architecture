import { Express } from "express";
import { SequelizeRepository } from "../../repository/group-detail-model-item/sequelize-group-detail-model-item.repository";
import { GroupDetailModelItemUseCase } from "../../../application/group-detail-model-item/group-detail-model-item-use-case";
import { GroupDetailModelItemController } from "../../controller/group-detail-model-item/group-detail-model-item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureGroupDetailModelItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeGroupDetailModelItemRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const groupDetailModelItemUseCase = new GroupDetailModelItemUseCase(sequelizeGroupDetailModelItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const groupDetailModelItemCtrl = new GroupDetailModelItemController(groupDetailModelItemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/group-detail-model-items/:cmp_uuid/:filter?/:page?/:perPage?`, groupDetailModelItemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/group-detail-model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid/:gdmitm_uuid`, groupDetailModelItemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/group-detail-model-item`, groupDetailModelItemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/group-detail-model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid/:gdmitm_uuid`, groupDetailModelItemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/group-detail-model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid/:gdmitm_uuid`, groupDetailModelItemCtrl.deleteCtrl);
}

export default configureGroupDetailModelItemRoutes;