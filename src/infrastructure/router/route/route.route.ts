import { Express } from "express";
import { SequelizeRepository } from "../../repository/route/sequelize-route.repository";
import { RouteUseCase } from "../../../application/route/route-use-case";
import { RouteController } from "../../controller/route/route.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureRouteRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeRouteRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const routeUseCase = new RouteUseCase(sequelizeRouteRepository);
    
    /*
    *   Iniciar controller
    */
    
    const routeCtrl = new RouteController(routeUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/routes/:cmp_uuid/:filter?/:page?/:perPage?`, routeCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/route/:cmp_uuid/:rou_uuid`, routeCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/route`, routeCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/route/:cmp_uuid/:rou_uuid`, routeCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/route/:cmp_uuid/:rou_uuid`, routeCtrl.deleteCtrl);
}

export default configureRouteRoutes;
