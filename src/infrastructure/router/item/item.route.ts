import { Express } from "express";
import { SequelizeRepository } from "../../repository/item/sequelize-item.repository";
import { ItemUseCase } from "../../../application/item/item-use-case";
import { ItemController } from "../../controller/item/item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeItemRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const itemUseCase = new ItemUseCase(sequelizeItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const ItemCtrl = new ItemController(itemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/items/:filter?/:page?/:perPage?`, ItemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/item/:itm_uuid`, ItemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/item`, ItemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/item/:itm_uuid`, ItemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/item/:itm_uuid`, ItemCtrl.deleteCtrl);
}

export default configureItemRoutes;