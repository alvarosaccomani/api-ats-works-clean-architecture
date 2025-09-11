import { Request, Response } from "express";
import { WorkStateUseCase } from "../../../application/work-state/work-state-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class WorkStateController {
    constructor(private workStateUseCase: WorkStateUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar los work states.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const workStates = await this.workStateUseCase.getWorkStates(cmp_uuid)
            return res.status(200).send({
                success: true,
                message: 'Work states retornados.',
                data: workStates
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los work states.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrks_uuid = req.params.wrks_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el work state.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!wrks_uuid || wrks_uuid.toLowerCase() === 'null' || wrks_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el work state.',
                    error: 'Debe proporcionar un Id de work state.'
                });
            }
            const workState = await this.workStateUseCase.getDetailWorkState(`${cmp_uuid}`, `${wrks_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Work state retornado.',
                data: workState
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el work state.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const wrks_name = body.wrks_name;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el work state.',
                    error: 'Debe proporcionar un Id de company.'
                })
            };
            if(!wrks_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el work state.',
                    error: 'Debe proporcionar un Nombre para el workstate.'
                })
            };
            const workStateByName = await this.workStateUseCase.findWorkStateByName(cmp_uuid, wrks_name);
            if(workStateByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el work state.',
                    error: `El nombre ${wrks_name} de work state ya existe.`
                });
            }
            const workState = await this.workStateUseCase.createWorkState(body)
            return res.status(200).json({
                success: true,
                message: 'Work state insertado.',
                data: workState
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el work state.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrks_uuid = req.params.wrks_uuid;
            const update = req.body;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el work state.',
                    error: 'Debe proporcionar un Id de company.'
                })
            };
            if(!update.wrks_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el work state.',
                    error: 'Debe proporcionar un Nombre para el work state.'
                })
            };
            const workStateByName = await this.workStateUseCase.findWorkStateByName(update.cmp_uuid, update.wrks_name);
            if(workStateByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el work state.',
                    error: `El nombre ${update.wrks_name} de work state ya existe.`
                });
            }
            const workState = await this.workStateUseCase.updateWorkState(cmp_uuid, wrks_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Work state actualizado.',
                data: workState
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el work state.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const wrks_uuid = req.params.wrks_uuid;
            if(!wrks_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el work state.',
                    error: 'Debe proporcionar un Id de work state.'
                });
            };
            const workState = await this.workStateUseCase.deleteWorkState(cmp_uuid, wrks_uuid)
            return res.status(200).json({
                success: true,
                message: 'Work state eliminada.',
                data: workState
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el work state.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}