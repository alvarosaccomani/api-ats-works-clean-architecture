import { Request, Response } from "express";
import { MetricTypeUseCase } from "../../../application/metric-type/metric-type-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class MetricTypeController {
    constructor(private metricTypeUseCase: MetricTypeUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const filter = req.params.filter;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const metricTypes = await this.metricTypeUseCase.getMetricTypes(filter)
                return res.status(200).send({
                    success: true,
                    message: 'Metric types retornados.',
                    ...paginator(metricTypes, page.toString(), perPage.toString())
                });
            } else {
                const metricTypes = await this.metricTypeUseCase.getMetricTypes(filter)
                return res.status(200).send({
                    success: true,
                    message: 'Metric types retornados.',
                    data: metricTypes
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los metric types.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const mety_uuid = req.params.mety_uuid;
            if(!mety_uuid || mety_uuid.toLowerCase() === 'null' || mety_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el metric type.',
                    error: 'Debe proporcionar un Id de metric type.'
                });
            }
            const metricType = await this.metricTypeUseCase.getDetailMetricType(`${mety_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Metric type retornado.',
                data: metricType
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el metric type.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const mety_name = body.mety_name;
            if(!mety_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el metric type.',
                    error: 'Debe proporcionar un Nombre para el metric type.'
                })
            };
            const metricTypeByName = await this.metricTypeUseCase.findMetricTypeByName(mety_name);
            if(metricTypeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el metric type.',
                    error: `El nombre ${mety_name} de metric type ya existe.`
                });
            }
            const metricType = await this.metricTypeUseCase.createMetricType(body)
            return res.status(200).json({
                success: true,
                message: 'Metric type insertado.',
                data: metricType
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el metric type.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const mety_uuid = req.params.mety_uuid;
            const update = req.body;
            if(!update.mety_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el metric type.',
                    error: 'Debe proporcionar un Nombre para el metric type.'
                })
            };
            const metricTypeByName = await this.metricTypeUseCase.findMetricTypeByName(update.mety_name, update.mety_uuid);
            if(metricTypeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el metric type.',
                    error: `El nombre ${update.mety_name} de metric type ya existe.`
                });
            }
            const metricType = await this.metricTypeUseCase.updateMetricType(mety_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Metric type actualizado.',
                data: metricType
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el metric type.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const mety_uuid = req.params.mety_uuid;
            if(!mety_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el metric type.',
                    error: 'Debe proporcionar un Id de metric type.'
                });
            };
            const metricType = await this.metricTypeUseCase.deleteMetricType(mety_uuid)
            return res.status(200).json({
                success: true,
                message: 'Metric type eliminado.',
                data: metricType
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el metric type.',
                error: error.message,
            });
        }
    }
}
