import { Express } from "express";
import { SequelizeRepository } from "../../repository/company-item/sequelize-company-item.repository";
import { CompanyItemUseCase } from "../../../application/company-item/company-item-use-case";
import { CompanyItemController } from "../../controller/company-item/company-item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCompanyItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCompanyItemRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const companyItemUseCase = new CompanyItemUseCase(sequelizeCompanyItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const companyItemCtrl = new CompanyItemController(companyItemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/company-items/:cmp_uuid/:filter?/:page?/:perPage?`, companyItemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/company-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid`, companyItemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/company-item`, companyItemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/company-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid`, companyItemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/company-item/:cmp_uuid/:itm_uuid/:cmpitm_uuid`, companyItemCtrl.deleteCtrl);
}

export default configureCompanyItemRoutes;