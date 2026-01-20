import { Express } from "express";
import { SequelizeRepository as SequelizeModelItemRepository } from "../../repository/model-item/sequelize-model-item.repository";
import { SequelizeRepository as SequelizeDetailModelItemRepository } from "../../repository/detail-model-item/sequelize-detail-model-item.repository";
import { ModelItemUseCase } from "../../../application/model-item/model-item-use-case";
import { ModelItemController } from "../../controller/model-item/model-item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureModelItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeModelItemRepository = new SequelizeModelItemRepository();
    const sequelizeDetailModelItemRepository = new SequelizeDetailModelItemRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const modelItemUseCase = new ModelItemUseCase(sequelizeModelItemRepository, sequelizeDetailModelItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const modelItemCtrl = new ModelItemController(modelItemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/model-items/:cmp_uuid/:filter?/:page?/:perPage?`, modelItemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid`, modelItemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/model-item`, modelItemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid`, modelItemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid`, modelItemCtrl.deleteCtrl);
}

export default configureModelItemRoutes;