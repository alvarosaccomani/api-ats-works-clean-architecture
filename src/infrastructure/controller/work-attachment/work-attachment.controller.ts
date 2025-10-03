import { Request, Response } from "express";
import { WorkAttachmentUseCase } from "../../../application/work-attachment/work-attachment-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class WorkAttachmentController {
    constructor(private workAttachmentUseCase: WorkAttachmentUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los work attachments.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const workAttachments = await this.workAttachmentUseCase.getWorkAttachments(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Work attachments retornados.',
                    ...paginator(workAttachments, page, perPage)
                });
            } else {
                const workAttachments = await this.workAttachmentUseCase.getWorkAttachments(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Work attachments retornados.',
                    data: workAttachments
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los work attachments.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrka_uuid = req.params.wrka_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el work attachment.',
                    error: 'Debe proporcionar un Id de work attachment.'
                });
            }
            const workAttachment = await this.workAttachmentUseCase.getAttachmentWorkAttachment(`${cmp_uuid}`, `${wrk_uuid}`, `${wrka_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Work attachment retornado.',
                data: workAttachment
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el work attachment.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const workAttachment = await this.workAttachmentUseCase.createWorkAttachment(body)
            return res.status(200).json({
                success: true,
                message: 'Work attachment insertado.',
                data: workAttachment
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el work attachment.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const workAttachmentByName = await this.workAttachmentUseCase.getAttachmentWorkAttachment(update.cmp_uuid, update.wrk_uuid, update.wrka_uuid);
            if(workAttachmentByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el work attachment.',
                    error: `El nombre ${update.cmp_name} de work attachment ya existe.`
                });
            }
            const workAttachment = await this.workAttachmentUseCase.updateWorkAttachment(update.cmp_uuid, update.wrk_uuid, update.wrka_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Work attachment actualizado.',
                data: workAttachment
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el work attachment.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrka_uuid = req.params.wrka_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el work attachment.',
                    error: 'Debe proporcionar un Id de work attachment.'
                });
            };
            const workAttachment = await this.workAttachmentUseCase.deleteWorkAttachment(cmp_uuid, wrk_uuid, wrka_uuid)
            return res.status(200).json({
                success: true,
                message: 'Work attachment eliminado.',
                data: workAttachment
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el work attachment.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}