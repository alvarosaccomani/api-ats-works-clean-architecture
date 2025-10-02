import { Express } from "express";
import { SequelizeRepository } from "../../repository/user/sequelize-user.repository";
import { UserUseCase } from "../../../application/user/user-use-case";
import { UserController } from "../../../infrastructure/controller/user/user.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureUserRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeUserRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const userUseCase = new UserUseCase(sequelizeUserRepository);
    
    /*
    *   Iniciar controller
    */
    
    const userCtrl = new UserController(userUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/user/:filter?/:page?/:perPage?`, userCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/user/:usr_uuid`, userCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/user`, userCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/user/:usr_uuid`, userCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/user/:usr_uuid`, userCtrl.deleteCtrl);
    app.post(`/${process.env.BASE_URL_API}/login`, userCtrl.loginCtrl);
    app.post(`/${process.env.BASE_URL_API}/register`, userCtrl.saveCtrl);
    app.post(`/${process.env.BASE_URL_API}/confirm-account`, userCtrl.confirmCtrl);
    app.post(`/${process.env.BASE_URL_API}/forgot-password`, userCtrl.forgotCtrl);
    app.post(`/${process.env.BASE_URL_API}/reset-password`, userCtrl.resetCtrl);
}

export default configureUserRoutes;