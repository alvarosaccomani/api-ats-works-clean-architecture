import { Request, Response } from "express";
import { WorkDetailUseCase } from "../../../application/work-detail/work-detail-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class WorkDetailController {
    constructor(private workDetailUseCase: WorkDetailUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los work details.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const workDetails = await this.workDetailUseCase.getWorkDetails(cmp_uuid)
            return res.status(200).send({
                success: true,
                message: 'Work details retornados.',
                data: workDetails
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los work details.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrkd_uuid = req.params.wrkd_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el work detail.',
                    error: 'Debe proporcionar un Id de work detail.'
                });
            }
            const workdetail = await this.workDetailUseCase.getDetailWorkDetail(`${cmp_uuid}`, `${wrk_uuid}`, `${wrkd_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Work detail retornado.',
                data: workdetail
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el work detail.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const wrk_uuid = body.wrk_uuid;
            const wrkd_uuid = body.wrkd_uuid;
            const workdetailExist = await this.workDetailUseCase.existWorkDetail(cmp_uuid, wrk_uuid, wrkd_uuid);
            if(workdetailExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el work detail.',
                    error: `El work detail ya existe.`
                });
            }
            const workdetail = await this.workDetailUseCase.createWorkDetail(body)
            return res.status(200).json({
                success: true,
                message: 'WorkDetail insertado.',
                data: workdetail
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el work detail.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const workdetailByName = await this.workDetailUseCase.getDetailWorkDetail(update.cmp_uuid, update.wrk_uuid, update.wrkd_uuid);
            if(workdetailByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el workdetail.',
                    error: `El nombre ${update.cmp_name} de workdetail ya existe.`
                });
            }
            const workdetail = await this.workDetailUseCase.updateWorkDetail(update.cmp_uuid, update.wrk_uuid, update.wrkd_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'WorkDetail actualizado.',
                data: workdetail
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el workdetail.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrkd_uuid = req.params.wrkd_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el workdetail.',
                    error: 'Debe proporcionar un Id de workdetail.'
                });
            };
            const workdetail = await this.workDetailUseCase.deleteWorkDetail(cmp_uuid, wrk_uuid, wrkd_uuid)
            return res.status(200).json({
                success: true,
                message: 'WorkDetail eliminado.',
                data: workdetail
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el workdetail.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}