import { Request, Response } from "express";
import { WorkHistoryUseCase } from "../../../application/work-history/work-history-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class WorkHistoryController {
    constructor(private workHistoryUseCase: WorkHistoryUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el historial.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (!wrk_uuid || wrk_uuid.toLowerCase() === 'null' || wrk_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el historial.',
                    error: 'Debe proporcionar un Id de work.'
                });
            }

            const histories = await this.workHistoryUseCase.getWorksHistory(cmp_uuid, wrk_uuid);
            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Historial retornado.',
                    ...paginator(histories, page.toString(), perPage.toString())
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Historial retornado.',
                    data: histories
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el historial.',
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrkh_uuid = req.params.wrkh_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el registro de historial.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (!wrk_uuid || wrk_uuid.toLowerCase() === 'null' || wrk_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el registro de historial.',
                    error: 'Debe proporcionar un Id de work.'
                });
            }
            if (!wrkh_uuid || wrkh_uuid.toLowerCase() === 'null' || wrkh_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el registro de historial.',
                    error: 'Debe proporcionar un Id de historial.'
                });
            }

            const history = await this.workHistoryUseCase.getDetailWorkHistory(cmp_uuid, wrk_uuid, wrkh_uuid);
            return res.status(200).send({
                success: true,
                message: 'Registro de historial retornado.',
                data: history
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el registro de historial.',
                error: error.message
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const wrk_uuid = body.wrk_uuid;
            const wrks_uuid = body.wrks_uuid;
            const usr_uuid = body.usr_uuid;

            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el historial.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (!wrk_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el historial.',
                    error: 'Debe proporcionar un Id de work.'
                });
            }
            if (!wrks_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el historial.',
                    error: 'Debe proporcionar un Id de estado.'
                });
            }
            if (!usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el historial.',
                    error: 'Debe proporcionar un Id de usuario.'
                });
            }

            const history = await this.workHistoryUseCase.createWorkHistory(body);
            return res.status(200).json({
                success: true,
                message: 'Historial insertado.',
                data: history
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el historial.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrkh_uuid = req.params.wrkh_uuid;
            const update = req.body;

            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el historial.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (!wrk_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el historial.',
                    error: 'Debe proporcionar un Id de work.'
                });
            }
            if (!wrkh_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el historial.',
                    error: 'Debe proporcionar un Id de historial.'
                });
            }

            const history = await this.workHistoryUseCase.updateWorkHistory(cmp_uuid, wrk_uuid, wrkh_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Historial actualizado.',
                data: history
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el historial.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrk_uuid = req.params.wrk_uuid;
            const wrkh_uuid = req.params.wrkh_uuid;

            if (!wrkh_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el historial.',
                    error: 'Debe proporcionar un Id de historial.'
                });
            }

            const history = await this.workHistoryUseCase.deleteWorkHistory(cmp_uuid, wrk_uuid, wrkh_uuid);
            return res.status(200).json({
                success: true,
                message: 'Historial eliminado.',
                data: history
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el historial.',
                error: error.message
            });
        }
    }
}
