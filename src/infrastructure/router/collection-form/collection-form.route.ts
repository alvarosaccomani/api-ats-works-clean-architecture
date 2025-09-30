import { Express } from "express";
import { SequelizeRepository } from "../../repository/collection-form/sequelize-collection-form.repository";
import { CollectionFormUseCase } from "../../../application/collection-form/collection-form-use-case";
import { CollectionFormController } from "../../controller/collection-form/collection-form.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCollectionFormRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCollectionFormRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */

    const collectionFormUseCase = new CollectionFormUseCase(sequelizeCollectionFormRepository);
    
    /*
    *   Iniciar controller
    */
    
    const collectionFormCtrl = new CollectionFormController(collectionFormUseCase, socketAdapter);

    app.get(`/${process.env.BASE_URL_API}/collection-forms/:cmp_uuid/:filter?/:page?/:perPage?`, collectionFormCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/collection-form/:cmp_uuid/:cfrm_uuid`, collectionFormCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/collection-form`, collectionFormCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/collection-form/:cmp_uuid/:cfrm_uuid`, collectionFormCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/collection-form/:cmp_uuid/:cfrm_uuid`, collectionFormCtrl.deleteCtrl);
}

export default configureCollectionFormRoutes;