import { Request, Response } from "express";
import { CompanyItemUseCase } from "../../../application/company-item/company-item-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class CompanyItemController {
    constructor(private companyItemUseCase: CompanyItemUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const companies = await this.companyItemUseCase.getCompanyItems()
            return res.status(200).send({
                success: true,
                message: 'Companies items retornados.',
                data: companies
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los companies items.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' || !itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined' || !cmpitm_uuid || cmpitm_uuid.toLowerCase() === 'null' || cmpitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la company item.',
                    error: 'Debe proporcionar un Id de company item.'
                });
            }
            const companyItem = await this.companyItemUseCase.getDetailCompanyItem(`${cmp_uuid}`, `${itm_uuid}`, `${cmpitm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Company Item retornada.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la company item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const itm_uuid = body.itm_uuid;
            const cmpitm_uuid = body.cmpitm_uuid;
            const companyItemExist = await this.companyItemUseCase.existCompanyItem(cmp_uuid, itm_uuid);
            if(companyItemExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la company item.',
                    error: `El company item ya existe.`
                });
            }
            const companyItem = await this.companyItemUseCase.createCompanyItem(body)
            return res.status(200).json({
                success: true,
                message: 'Company Item insertado.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el company item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            if(!update.cmp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el company item.',
                    error: 'Debe proporcionar un Nombre para el company item.'
                })
            };
            const companyItemByName = await this.companyItemUseCase.getDetailCompanyItem(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid);
            if(companyItemByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el company item.',
                    error: `El nombre ${update.cmp_name} de company item ya existe.`
                });
            }
            const companyItem = await this.companyItemUseCase.updateCompanyItem(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Company Item actualizado.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el company item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la company item.',
                    error: 'Debe proporcionar un Id de company item.'
                });
            };
            const companyItem = await this.companyItemUseCase.deleteCompanyItem(cmp_uuid, itm_uuid, cmpitm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Company Item eliminado.',
                data: companyItem
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el company item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}