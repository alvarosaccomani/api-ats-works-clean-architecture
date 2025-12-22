import { Express } from "express";
import { SequelizeRepository } from "../../repository/subscription-plan/sequelize-subscription-plan.repository";
import { SubscriptionPlanUseCase } from "../../../application/subscription-plan/subscription-plan-use-case";
import { SubscriptionPlanController } from "../../controller/subscription-plan/subscription-plan.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureSubscriptionPlanRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeSubscriptionPlanRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const subscriptionPlanUseCase = new SubscriptionPlanUseCase(sequelizeSubscriptionPlanRepository);
    
    /*
    *   Iniciar controller
    */
    
    const subscriptionPlanCtrl = new SubscriptionPlanController(subscriptionPlanUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/subscription-plans/:cmp_uuid/:filter?/:page?/:perPage?`, subscriptionPlanCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/subscription-plan/:cmp_uuid/:subp_uuid`, subscriptionPlanCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/subscription-plan`, subscriptionPlanCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/subscription-plan/:cmp_uuid/:subp_uuid`, subscriptionPlanCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/subscription-plan/:cmp_uuid/:subp_uuid`, subscriptionPlanCtrl.deleteCtrl);
}

export default configureSubscriptionPlanRoutes;
