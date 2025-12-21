import { Request, Response } from "express";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CompanyController {
    constructor(private companyUseCase: CompanyUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const companies = await this.companyUseCase.getCompanies()
                return res.status(200).send({
                    success: true,
                    message: 'Companies retornadas.',
                    ...paginator(companies, page.toString(), perPage.toString())
                });
            } else {
                const companies = await this.companyUseCase.getCompanies()
                return res.status(200).send({
                    success: true,
                    message: 'Companies retornadas.',
                    data: companies
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las companies.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la company.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const company = await this.companyUseCase.getDetailCompany(`${cmp_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Company retornada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_name = body.cmp_name;
            if(!cmp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la company.',
                    error: 'Debe proporcionar un Nombre para el company.'
                })
            };
            const companyByName = await this.companyUseCase.findCompanyByName(cmp_name);
            if(companyByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la company.',
                    error: `El nombre ${cmp_name} de company ya existe.`
                });
            }
            const company = await this.companyUseCase.createCompany(body)
            return res.status(200).json({
                success: true,
                message: 'Company insertada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const update = req.body;
            if(!update.cmp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la company.',
                    error: 'Debe proporcionar un Nombre para el company.'
                })
            };
            const companyByName = await this.companyUseCase.findCompanyByName(update.cmp_name, update.cmp_uuid);
            if(companyByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la company.',
                    error: `El nombre ${update.cmp_name} de company ya existe.`
                });
            }
            const company = await this.companyUseCase.updateCompany(cmp_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Company actualizada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la company.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            const company = await this.companyUseCase.deleteCompany(cmp_uuid)
            return res.status(200).json({
                success: true,
                message: 'Company eliminada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la company.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}