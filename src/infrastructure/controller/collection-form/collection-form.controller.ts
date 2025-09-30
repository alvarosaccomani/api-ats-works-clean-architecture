import { Request, Response } from "express";
import { CollectionFormUseCase } from "../../../application/collection-form/collection-form-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CollectionFormController {
    constructor(private collectionFormUseCase: CollectionFormUseCase, private socketAdapter: SocketAdapter) {
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
            if (page && perPage) {
                const collectionForms = await this.collectionFormUseCase.getCollectionForms(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Collection forms retornados.',
                    ...paginator(collectionForms, page, perPage)
                });
            } else {
                const collectionForms = await this.collectionFormUseCase.getCollectionForms(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Collection forms retornados.',
                    data: collectionForms
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los collection forms.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cfrm_uuid = req.params.cfrm_uuid;
            if(!cfrm_uuid || cfrm_uuid.toLowerCase() === 'null' || cfrm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el collection form.',
                    error: 'Debe proporcionar un Id de collection form.'
                });
            }
            const collectionForm = await this.collectionFormUseCase.getDetailCollectionForm(`${cmp_uuid}`,`${cfrm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Collection form retornado.',
                data: collectionForm
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el collection form.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.params.cmp_uuid;
            const cfrm_name = body.cfrm_name;
            if(!cfrm_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el collection form.',
                    error: 'Debe proporcionar un Nombre para el collection form.'
                })
            };
            const collectionFormByName = await this.collectionFormUseCase.findCollectionFormByName(cmp_uuid, cfrm_name);
            if(collectionFormByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el collection form.',
                    error: `El nombre ${cfrm_name} de collection form ya existe.`
                });
            }
            const collectionForm = await this.collectionFormUseCase.createCollectionForm(body)
            return res.status(200).json({
                success: true,
                message: 'Collection form insertado.',
                data: collectionForm
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el collection form.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cfrm_uuid = req.params.cfrm_uuid;
            const update = req.body;
            if(!update.dtp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el collection form.',
                    error: 'Debe proporcionar un Nombre para el collection form.'
                })
            };
            const collectionFormByName = await this.collectionFormUseCase.findCollectionFormByName(update.dtp_name, update.cfrm_uuid);
            if(collectionFormByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el collection form.',
                    error: `El nombre ${update.dtp_name} de collection form ya existe.`
                });
            }
            const collectionForm = await this.collectionFormUseCase.updateCollectionForm(cmp_uuid, cfrm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Collection form actualizado.',
                data: collectionForm
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el collection form.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cfrm_uuid = req.params.cfrm_uuid;
            if(!cfrm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el collection form.',
                    error: 'Debe proporcionar un Id de collection form.'
                });
            };
            const collectionForm = await this.collectionFormUseCase.deleteCollectionForm(cmp_uuid, cfrm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Collection form eliminado.',
                data: collectionForm
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el collection form.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}