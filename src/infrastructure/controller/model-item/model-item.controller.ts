import { Request, Response } from "express";
import { ModelItemUseCase } from "../../../application/model-item/model-item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ModelItemController {
    constructor(private modelItemUseCase: ModelItemUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar el model item.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const modelItems = await this.modelItemUseCase.getModelItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Model items items retornados.',
                    ...paginator(modelItems, page.toString(), perPage.toString())
                });
            } else {
                const modelItems = await this.modelItemUseCase.getModelItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Model items items retornados.',
                    data: modelItems
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los model items.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;
            const mitm_uuid = req.params.mitm_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' || !itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined' || !cmpitm_uuid || cmpitm_uuid.toLowerCase() === 'null' || cmpitm_uuid.toLowerCase() === 'undefined' || !mitm_uuid || mitm_uuid.toLowerCase() === 'null' || mitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el model item.',
                    error: 'Debe proporcionar un Id de model item.'
                });
            }
            const modelItem = await this.modelItemUseCase.getDetailModelItem(`${cmp_uuid}`, `${itm_uuid}`, `${cmpitm_uuid}`, `${mitm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Model Item retornada.',
                data: modelItem
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const itm_uuid = body.itm_uuid;
            const cmpitm_uuid = body.cmpitm_uuid;
            const mitm_uuid = body.mitm_uuid;
            const modelItemExist = await this.modelItemUseCase.existModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid);
            if(modelItemExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el model item.',
                    error: `El model item ya existe.`
                });
            }
            const modelItem = await this.modelItemUseCase.createModelItem(body)
            return res.status(200).json({
                success: true,
                message: 'Model Item insertado.',
                data: modelItem
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const modelItem = await this.modelItemUseCase.updateModelItem(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid, update.mitm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Model Item actualizado.',
                data: modelItem
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;
            const mitm_uuid = req.params.mitm_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el model item.',
                    error: 'Debe proporcionar un Id de model item.'
                });
            };
            const modelItem = await this.modelItemUseCase.deleteModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Model Item eliminado.',
                data: modelItem
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}