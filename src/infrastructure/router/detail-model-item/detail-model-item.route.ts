import { Express } from "express";
import { SequelizeRepository } from "../../repository/detail-model-item/sequelize-detail-model-item.repository";
import { DetailModelItemUseCase } from "../../../application/detail-model-item/detail-model-item-use-case";
import { DetailModelItemController } from "../../controller/detail-model-item/detail-model-item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureDetailModelItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeDetailModelItemRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const detailModelItemUseCase = new DetailModelItemUseCase(sequelizeDetailModelItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const detailModelItemCtrl = new DetailModelItemController(detailModelItemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/detail-model-items/:filter?/:page?/:perPage?`, detailModelItemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/detail-model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid/:dmitm_uuid`, detailModelItemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/detail-model-item`, detailModelItemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/detail-model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid/:dmitm_uuid`, detailModelItemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/detail-model-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid/:mitm_uuid/:dmitm_uuid`, detailModelItemCtrl.deleteCtrl);
}

export default configureDetailModelItemRoutes;