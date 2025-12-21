import { Request, Response } from "express";
import { GroupDetailModelItemUseCase } from "../../../application/group-detail-model-item/group-detail-model-item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class GroupDetailModelItemController {
    constructor(private groupDetailModelItemUseCase: GroupDetailModelItemUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar los group detail model items.',
                    error: 'Debe proporcionar un Id de group detail model item.'
                });
            }
            if (page && perPage) {
                const groupDetailModelItems = await this.groupDetailModelItemUseCase.getGroupDetailModelItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Group detail model items items retornados.',
                    ...paginator(groupDetailModelItems, page.toString(), perPage.toString())
                });
            } else {
                const groupDetailModelItems = await this.groupDetailModelItemUseCase.getGroupDetailModelItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Group detail model items items retornados.',
                    data: groupDetailModelItems
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los group detail model items.',
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
            const gdmitm_uuid = req.params.gdmitm_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' || !itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined' || !cmpitm_uuid || cmpitm_uuid.toLowerCase() === 'null' || cmpitm_uuid.toLowerCase() === 'undefined' || !mitm_uuid || mitm_uuid.toLowerCase() === 'null' || mitm_uuid.toLowerCase() === 'undefined' || !gdmitm_uuid || gdmitm_uuid.toLowerCase() === 'null' || gdmitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la group detail model item.',
                    error: 'Debe proporcionar un Id de group detail model item.'
                });
            }
            const groupDetailModelItem = await this.groupDetailModelItemUseCase.getDetailGroupDetailModelItem(`${cmp_uuid}`, `${itm_uuid}`, `${cmpitm_uuid}`, `${mitm_uuid}`, `${gdmitm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Group detail model item retornada.',
                data: groupDetailModelItem
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la group detail model item.',
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
            const gdmitm_uuid = body.gdmitm_uuid;
            const groupDetailModelItemExist = await this.groupDetailModelItemUseCase.existGroupDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid);
            if(groupDetailModelItemExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la group detail model item.',
                    error: `El group detail model item ya existe.`
                });
            }
            const groupDetailModelItem = await this.groupDetailModelItemUseCase.createGroupDetailModelItem(body)
            return res.status(200).json({
                success: true,
                message: 'Group detail model item insertado.',
                data: groupDetailModelItem
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el group detail model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const groupDetailModelItem = await this.groupDetailModelItemUseCase.updateGroupDetailModelItem(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid, update.mitm_uuid, update.gdmitm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Group detail model item actualizado.',
                data: groupDetailModelItem
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el group detail model item.',
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
            const gdmitm_uuid = req.params.gdmitm_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la group detail model item.',
                    error: 'Debe proporcionar un Id de group detail model item.'
                });
            };
            const groupDetailModelItem = await this.groupDetailModelItemUseCase.deleteGroupDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Group detail model item eliminado.',
                data: groupDetailModelItem
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el group detail model item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}