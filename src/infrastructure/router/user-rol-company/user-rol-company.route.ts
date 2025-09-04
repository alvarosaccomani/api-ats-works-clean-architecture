import { Express } from "express";
import { SequelizeRepository } from "../../repository/user-rol-company/sequelize-user-rol-company.repository";
import { UserRolCompanyUseCase } from "../../../application/user-rol-company/user-rol-company-use-case";
import { UserRolCompanyController } from "../../controller/user-rol-company/user-rol-company.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureUserRolCompanyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeUserRolCompanyRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const userRolCompanyUseCase = new UserRolCompanyUseCase(sequelizeUserRolCompanyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const userRolCompanyCtrl = new UserRolCompanyController(userRolCompanyUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/user-roles-company/:filter?/:page?/:perPage?`, userRolCompanyCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/user-rol-company/:cmp_uuid/:usrrolcmp_uuid/:usr_uuid/:rol_uuid`, userRolCompanyCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/user-rol-company`, userRolCompanyCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/user-rol-company/:cmp_uuid/:usrrolcmp_uuid/:usr_uuid/:rol_uuid`, userRolCompanyCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/user-rol-company/:cmp_uuid/:usrrolcmp_uuid/:usr_uuid/:rol_uuid`, userRolCompanyCtrl.deleteCtrl);
    app.get(`/${process.env.BASE_URL_API}/user-roles-company-by-user/:usr_uuid`, userRolCompanyCtrl.getUserRolesCompanyByUserCtrl);
}

export default configureUserRolCompanyRoutes;