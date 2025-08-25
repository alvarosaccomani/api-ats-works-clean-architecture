import { Express } from "express";
import { SequelizeRepository } from "../../repository/data-type/sequelize-data-type.repository";
import { DataTypeUseCase } from "../../../application/data-type/data-type-use-case";
import { DataTypeController } from "../../controller/data-type/data-type.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureDataTypeRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeDataTypeRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */

    const dataTypeUseCase = new DataTypeUseCase(sequelizeDataTypeRepository);
    
    /*
    *   Iniciar controller
    */
    
    const dataTypeCtrl = new DataTypeController(dataTypeUseCase, socketAdapter);

    app.get(`/${process.env.BASE_URL_API}/data-types/:filter?/:page?/:perPage?`, dataTypeCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/data-type/:dtp_uuid`, dataTypeCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/data-type`, dataTypeCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/data-type/:dtp_uuid`, dataTypeCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/data-type/:dtp_uuid`, dataTypeCtrl.deleteCtrl);
}

export default configureDataTypeRoutes;