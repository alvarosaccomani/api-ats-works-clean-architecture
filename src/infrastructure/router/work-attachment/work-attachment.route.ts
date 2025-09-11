import { Express } from "express";
import { SequelizeRepository } from "../../repository/work-attachment/sequelize-work-attachment.repository";
import { WorkAttachmentUseCase } from "../../../application/work-attachment/work-attachment-use-case";
import { WorkAttachmentController } from "../../controller/work-attachment/work-attachment.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWorkAttachmentRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeWorkAttachmentRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const workAttachmentUseCase = new WorkAttachmentUseCase(sequelizeWorkAttachmentRepository);
    
    /*
    *   Iniciar controller
    */
    
    const workAttachmentCtrl = new WorkAttachmentController(workAttachmentUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/work-attachments/:cmp_uuid/:filter?/:page?/:perPage?`, workAttachmentCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/work-attachment/:cmp_uuid/:wrk_uuid/:wrka_uuid`, workAttachmentCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/work-attachment`, workAttachmentCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/work-attachment/:cmp_uuid/:wrk_uuid/:wrka_uuid`, workAttachmentCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/work-attachment/:cmp_uuid/:wrk_uuid/:wrka_uuid`, workAttachmentCtrl.deleteCtrl);
}

export default configureWorkAttachmentRoutes;