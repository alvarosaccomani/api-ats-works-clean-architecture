import { Express } from "express";
import { SequelizeRepository } from "../../repository/company/sequelize-company.repository";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import { CompanyController } from "../../controller/company/company.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCompanyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCompanyRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const companyUseCase = new CompanyUseCase(sequelizeCompanyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const companyCtrl = new CompanyController(companyUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/companies/:filter?/:page?/:perPage?`, companyCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, companyCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/company`, companyCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, companyCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, companyCtrl.deleteCtrl);
}

export default configureCompanyRoutes;