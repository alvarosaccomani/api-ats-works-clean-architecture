import { Request, Response } from "express";
import { TypeWorkUseCase } from "../../../application/type-work/type-work-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class TypeWorkController {
    constructor(private typeWorkUseCase: TypeWorkUseCase, private socketAdapter: SocketAdapter) {
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
                const typeWorks = await this.typeWorkUseCase.getTypeWorks(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Tipos de trabajo retornados.',
                    ...paginator(typeWorks, page.toString(), perPage.toString())
                });
            } else {
                const typeWorks = await this.typeWorkUseCase.getTypeWorks(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Tipos de trabajo retornados.',
                    data: typeWorks
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los tipos de trabajo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const twrk_uuid = req.params.twrk_uuid;
            if(!twrk_uuid || twrk_uuid.toLowerCase() === 'null' || twrk_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el tipo de trabajo.',
                    error: 'Debe proporcionar un Id de tipo de trabajo.'
                });
            }
            const typeWork = await this.typeWorkUseCase.getDetailTypeWork(`${cmp_uuid}`, `${twrk_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Tipo de trabajo retornado.',
                data: typeWork
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el tipo de trabajo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const twrk_name = body.twrk_name;
            if(!twrk_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el tipo de trabajo.',
                    error: 'Debe proporcionar un Nombre para el tipo de trabajo.'
                })
            };
            const typeWorkByName = await this.typeWorkUseCase.findTypeWorkByName(cmp_uuid, twrk_name);
            if(typeWorkByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el tipo de trabajo.',
                    error: `El nombre ${twrk_name} de tipo de trabajo ya existe.`
                });
            }
            const typeWork = await this.typeWorkUseCase.createTypeWork(body)
            return res.status(200).json({
                success: true,
                message: 'Tipo de trabajo insertado.',
                data: typeWork
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el tipo de trabajo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const typeWork = await this.typeWorkUseCase.updateTypeWork(update.cmp_uuid, update.twrk_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Tipo de trabajo actualizado.',
                data: typeWork
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el tipo de trabajo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const twrk_uuid = req.params.twrk_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el tipo de trabajo.',
                    error: 'Debe proporcionar un Id de tipo de trabajo.'
                });
            };
            const typeWork = await this.typeWorkUseCase.deleteTypeWork(cmp_uuid,twrk_uuid)
            return res.status(200).json({
                success: true,
                message: 'Tipo de trabajo eliminado.',
                data: typeWork
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el tipo de trabajo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}