import { Request, Response } from "express";
import { DataTypeUseCase } from "../../../application/data-type/data-type-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class DataTypeController {
    constructor(private dataTypeUseCase: DataTypeUseCase, private socketAdapter: SocketAdapter) {
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
                const dataTypes = await this.dataTypeUseCase.getDataTypes()
                return res.status(200).send({
                    success: true,
                    message: 'Data types retornados.',
                    ...paginator(dataTypes, page.toString(), perPage.toString())
                });
            } else {
                const dataTypes = await this.dataTypeUseCase.getDataTypes()
                return res.status(200).send({
                    success: true,
                    message: 'Data types retornados.',
                    data: dataTypes
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los data types.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const dtp_uuid = req.params.dtp_uuid;
            if(!dtp_uuid || dtp_uuid.toLowerCase() === 'null' || dtp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el data type.',
                    error: 'Debe proporcionar un Id de data type.'
                });
            }
            const dataType = await this.dataTypeUseCase.getDetailDataType(`${dtp_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Data type retornado.',
                data: dataType
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el data type.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const dtp_name = body.dtp_name;
            if(!dtp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el data type.',
                    error: 'Debe proporcionar un Nombre para el data type.'
                })
            };
            const dataTypeByName = await this.dataTypeUseCase.findDataTypeByName(dtp_name);
            if(dataTypeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el data type.',
                    error: `El nombre ${dtp_name} de data type ya existe.`
                });
            }
            const dataType = await this.dataTypeUseCase.createDataType(body)
            return res.status(200).json({
                success: true,
                message: 'Data type insertado.',
                data: dataType
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el data type.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const dtp_uuid = req.params.dtp_uuid;
            const update = req.body;
            if(!update.dtp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el data type.',
                    error: 'Debe proporcionar un Nombre para el data type.'
                })
            };
            const dataTypeByName = await this.dataTypeUseCase.findDataTypeByName(update.dtp_name, update.dtp_uuid);
            if(dataTypeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el data type.',
                    error: `El nombre ${update.dtp_name} de data type ya existe.`
                });
            }
            const dataType = await this.dataTypeUseCase.updateDataType(dtp_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Data type actualizado.',
                data: dataType
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el data type.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const dtp_uuid = req.params.dtp_uuid;
            if(!dtp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el data type.',
                    error: 'Debe proporcionar un Id de data type.'
                });
            };
            const dataType = await this.dataTypeUseCase.deleteDataType(dtp_uuid)
            return res.status(200).json({
                success: true,
                message: 'Data type eliminado.',
                data: dataType
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el data type.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}