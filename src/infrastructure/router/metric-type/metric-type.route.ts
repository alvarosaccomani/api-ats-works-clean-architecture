import { Express } from "express";
import { SequelizeRepository } from "../../repository/metric-type/sequelize-metric-type.repository";
import { MetricTypeUseCase } from "../../../application/metric-type/metric-type-use-case";
import { MetricTypeController } from "../../controller/metric-type/metric-type.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureMetricTypeRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeMetricTypeRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const metricTypeUseCase = new MetricTypeUseCase(sequelizeMetricTypeRepository);
    
    /*
    *   Iniciar controller
    */
    const metricTypeCtrl = new MetricTypeController(metricTypeUseCase, socketAdapter);

    app.get(`/${process.env.BASE_URL_API}/metric-types/:filter?/:page?/:perPage?`, metricTypeCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/metric-type/:mety_uuid`, metricTypeCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/metric-type`, metricTypeCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/metric-type/:mety_uuid`, metricTypeCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/metric-type/:mety_uuid`, metricTypeCtrl.deleteCtrl);
}

export default configureMetricTypeRoutes;
