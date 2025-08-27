import { Express } from "express";
import { SequelizeRepository } from "../../repository/address/sequelize-address.repository";
import { AddressUseCase } from "../../../application/address/address-use-case";
import { AddressController } from "../../controller/address/address.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureAddressRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeAddressRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const addressUseCase = new AddressUseCase(sequelizeAddressRepository);
    
    /*
    *   Iniciar controller
    */
    
    const addressCtrl = new AddressController(addressUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/addresses/:filter?/:page?/:perPage?`, addressCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/address/:cmp_uuid/:adr_uuid`, addressCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/address`, addressCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/address/:cmp_uuid/:adr_uuid`, addressCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/address/:cmp_uuid/:adr_uuid`, addressCtrl.deleteCtrl);
}

export default configureAddressRoutes;