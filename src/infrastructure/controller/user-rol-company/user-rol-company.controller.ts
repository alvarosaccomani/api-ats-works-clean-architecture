import { Request, Response } from "express";
import { UserRolCompanyUseCase } from "../../../application/user-rol-company/user-rol-company-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class UserRolCompanyController {
    constructor(private userRolCompanyUseCase: UserRolCompanyUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getUserRolesCompanyByUserCtrl = this.getUserRolesCompanyByUserCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const userRolesCompany = await this.userRolCompanyUseCase.getUserRolesCompany()
            return res.status(200).send({
                success: true,
                message: 'User roles company retornados.',
                data: userRolesCompany
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los user roles company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;
            const rol_uuid = req.params.rol_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined' || !itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined' || !cmpitm_uuid || cmpitm_uuid.toLowerCase() === 'null' || cmpitm_uuid.toLowerCase() === 'undefined'|| !rol_uuid || rol_uuid.toLowerCase() === 'null' || rol_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el user rol company.',
                    error: 'Debe proporcionar un Id de user rol company.'
                });
            }
            const userRolCompany = await this.userRolCompanyUseCase.getDetailUserRolCompany(`${cmp_uuid}`, `${itm_uuid}`, `${cmpitm_uuid}`, `${rol_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'User rol company retornada.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el user rol company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const itm_uuid = body.itm_uuid;
            const cmpitm_uuid = body.cmpitm_uuid;
            const rol_uuid = body.rol_uuid;
            const userRolCompanyExist = await this.userRolCompanyUseCase.existUserRolCompany(cmp_uuid, itm_uuid, cmpitm_uuid, rol_uuid);
            if(userRolCompanyExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el user rol company.',
                    error: `El user rol company ya existe.`
                });
            }
            const userRolCompany = await this.userRolCompanyUseCase.createUserRolCompany(body)
            return res.status(200).json({
                success: true,
                message: 'User rol company insertado.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el user rol company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            if(!update.cmpitm_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el user rol company.',
                    error: 'Debe proporcionar un Nombre para el user rol company.'
                })
            };
            const userRolCompanyByName = await this.userRolCompanyUseCase.getDetailUserRolCompany(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid, update.rol_uuid);
            if(userRolCompanyByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el user rol company.',
                    error: `El nombre ${update.cmpitm_name} de user rol company ya existe.`
                });
            }
            const userRolCompany = await this.userRolCompanyUseCase.updateUserRolCompany(update.cmp_uuid, update.itm_uuid, update.cmpitm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'User rol company actualizado.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el user rol company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cmpitm_uuid = req.params.cmpitm_uuid;
            const rol_uuid = req.params.rol_uuid;
            if(!cmpitm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el user rol company.',
                    error: 'Debe proporcionar un Id de user rol company.'
                });
            };
            const userRolCompany = await this.userRolCompanyUseCase.deleteUserRolCompany(cmp_uuid, itm_uuid, cmpitm_uuid, rol_uuid)
            return res.status(200).json({
                success: true,
                message: 'User rol company eliminado.',
                data: userRolCompany
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el user rol company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getUserRolesCompanyByUserCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const userRolesCompany = await this.userRolCompanyUseCase.getUserRolesCompanyByUser(usr_uuid);
            return res.status(200).send({
                success: true,
                message: 'User roles company retornados.',
                data: userRolesCompany
            });
        } catch (error: any) {
            console.error('Error en getUserRolesCompanyByUserCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los user roles company',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}