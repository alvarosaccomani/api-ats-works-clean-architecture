import { Express } from "express";
import { SequelizeRepository } from "../../repository/customer/sequelize-customer.repository";
import { CustomerUseCase } from "../../../application/customer/customer-use-case";
import { CustomerController } from "../../controller/customer/customer.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCustomerRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCustomerRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const customerUseCase = new CustomerUseCase(sequelizeCustomerRepository);
    
    /*
    *   Iniciar controller
    */
    
    const customerCtrl = new CustomerController(customerUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/customers/:cmp_uuid`, customerCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/customer/:cmp_uuid/:cus_uuid`, customerCtrl.getCtrl);
    app.get(`/${process.env.BASE_URL_API}/customer-user/:cmp_uuid/:usr_uuid`, customerCtrl.getByUserIdCtrl);
    app.post(`/${process.env.BASE_URL_API}/customer`, customerCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/customer/:cmp_uuid/:cus_uuid`, customerCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/customer/:cmp_uuid/:cus_uuid`, customerCtrl.deleteCtrl);
    app.delete(`/${process.env.BASE_URL_API}/customer-soft-delete/:cmp_uuid/:cus_uuid`, customerCtrl.softDeleteCtrl);
    app.put(`/${process.env.BASE_URL_API}/customers/bulk-order/:cmp_uuid/:rou_uuid`, customerCtrl.updateCustomersOrderCtrl);
}

export default configureCustomerRoutes;