import { Request, Response } from "express";
import { WorkUseCase } from "../../../application/work/work-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { getStringFromQuery } from "../../utils/util";
import { paginator } from "../../services/paginator.service";

export class WorkController {
    constructor(private workUseCase: WorkUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const { wrk_dateFrom, wrk_dateTo, wrk_fullname, page, perPage, field_order, wrk_order } = req.query;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los works.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const works = await this.workUseCase.getWorks(cmp_uuid, wrk_dateFrom ? new Date(wrk_dateFrom.toString()) : undefined, wrk_dateTo ? new Date(wrk_dateTo.toString()) : undefined, getStringFromQuery(wrk_fullname), getStringFromQuery(field_order), getStringFromQuery(wrk_order));
                return res.status(200).send({
                    success: true,
                    message: 'Works retornados.',
                    ...paginator(works, page.toString(), perPage.toString())
                });
            } else {
                const works = await this.workUseCase.getWorks(cmp_uuid, wrk_dateFrom ? new Date(wrk_dateFrom.toString()) : undefined, wrk_dateTo ? new Date(wrk_dateTo.toString()) : undefined, getStringFromQuery(wrk_fullname), getStringFromQuery(field_order), getStringFromQuery(wrk_order));
                return res.status(200).send({
                    success: true,
                    message: 'Works retornados.',
                    data: works
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los works.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el work.',
                    error: 'Debe proporcionar un Id de work.'
                });
            }
            const work = await this.workUseCase.getDetailWork(`${cmp_uuid}`, `${wrk_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Work retornado.',
                data: work
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el work.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const wrk_uuid = body.wrk_uuid;
            const workExist = await this.workUseCase.existWork(cmp_uuid, wrk_uuid);
            if(workExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el work.',
                    error: `El work ya existe.`
                });
            }
            const work = await this.workUseCase.createWork(body)
            return res.status(200).json({
                success: true,
                message: 'Work insertado.',
                data: work
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el work.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const work = await this.workUseCase.updateWork(update.cmp_uuid, update.wrk_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Work actualizado.',
                data: work
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el work.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el work.',
                    error: 'Debe proporcionar un Id de work.'
                });
            };
            const work = await this.workUseCase.deleteWork(cmp_uuid, wrk_uuid)
            return res.status(200).json({
                success: true,
                message: 'Work eliminado.',
                data: work
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el work.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}