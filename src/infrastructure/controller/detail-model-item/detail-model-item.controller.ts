import { Request, Response } from "express";
import { DetailModelItemUseCase } from "../../../application/detail-model-item/detail-model-item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class DetailModelItemController {
    constructor(private detailModelItemUseCase: DetailModelItemUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar los detail model items.',
                    error: 'Debe proporcionar un Id de company item.'
                });
            }
            if (page && perPage) {
                const detailModelItems = await this.detailModelItemUseCase.getDetailModelItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Detail model items items retornados.',
                    ...paginator(detailModelItems, page, perPage)
                });
            } else {
                const detailModelItems = await this.detailModelItemUseCase.getDetailModelItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Detail model items items retornados.',
                    data: detailModelItems
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los detail model items.',
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
            const dmitm_uuid = req.params.dmitm_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' || !itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined' || !cmpitm_uuid || cmpitm_uuid.toLowerCase() === 'null' || cmpitm_uuid.toLowerCase() === 'undefined' || !mitm_uuid || mitm_uuid.toLowerCase() === 'null' || mitm_uuid.toLowerCase() === 'undefined' || !dmitm_uuid || dmitm_uuid.toLowerCase() === 'null' || dmitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la detail model item.',
                    error: 'Debe proporcionar un Id de detail model item.'
                });
            }
            const detailModelItem = await this.detailModelItemUseCase.getDetailDetailModelItem(`${cmp_uuid}`, `${itm_uuid}`, `${cmpitm_uuid}`, `${mitm_uuid}`, `${dmitm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Detail model item retornada.',
                data: detailModelItem
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la detail model item.',
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
            const dmitm_uuid = body.dmitm_uuid;
            const detailModelItemExist = await this.detailModelItemUseCase.existDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid);
            if(detailModelItemExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la detail model item.',
                    error: `El detail model item ya existe.`
                });
            }
            const detailModelItem = await this.detailModelItemUseCase.createDetailModelItem(body)
            return res.status(200).json({
                success: true,
                message: 'Detail model item insertado.',
                data: detailModelItem
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el detail model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const detailModelItem = await this.detailModelItemUseCase.updateDetailModelItem(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid, update.mitm_uuid, update.dmitm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Detail model item actualizado.',
                data: detailModelItem
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el detail model item.',
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
            const dmitm_uuid = req.params.dmitm_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la detail model item.',
                    error: 'Debe proporcionar un Id de detail model item.'
                });
            };
            const detailModelItem = await this.detailModelItemUseCase.deleteDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Detail model item eliminado.',
                data: detailModelItem
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el detail model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}