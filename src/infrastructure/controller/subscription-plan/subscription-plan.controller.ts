import { Request, Response } from "express";
import { SubscriptionPlanUseCase } from "../../../application/subscription-plan/subscription-plan-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { getStringFromQuery } from "../../utils/util";
import { paginator } from "../../services/paginator.service";

export class SubscriptionPlanController {
    constructor(private subscriptionPlanUseCase: SubscriptionPlanUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const { subp_name, page, perPage, field_order, subp_order } = req.query;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los planes de suscripción.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const subscriptionPlans = await this.subscriptionPlanUseCase.getSubscriptionPlans(cmp_uuid, getStringFromQuery(subp_name), getStringFromQuery(field_order), getStringFromQuery(subp_order));
                return res.status(200).send({
                    success: true,
                    message: 'Planes de suscripción retornados.',
                    ...paginator(subscriptionPlans, page.toString(), perPage.toString())
                });
            } else {
                const subscriptionPlans = await this.subscriptionPlanUseCase.getSubscriptionPlans(cmp_uuid, getStringFromQuery(subp_name), getStringFromQuery(field_order), getStringFromQuery(subp_order));
                return res.status(200).send({
                    success: true,
                    message: 'Planes de suscripción retornados.',
                    data: subscriptionPlans
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los planes de suscripción.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const rou_uuid = req.params.rou_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el plan de suscripción.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!rou_uuid || rou_uuid.toLowerCase() === 'null' || rou_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el plan de suscripción.',
                    error: 'Debe proporcionar un Id de plan de suscripción.'
                });
            }
            const route = await this.subscriptionPlanUseCase.getDetailSubscriptionPlan(`${cmp_uuid}`, `${rou_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Plan de suscripción retornado.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el plan de suscripción.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const rou_name = body.rou_name;
            if(!rou_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el plan de suscripción.',
                    error: 'Debe proporcionar un Nombre para el plan de suscripción.'
                })
            };
            const routeByName = await this.subscriptionPlanUseCase.findSubscriptionPlanByName(cmp_uuid, rou_name);
            if(routeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el plan de suscripción.',
                    error: `El nombre ${rou_name} de plan de suscripción ya existe.`
                });
            }
            const route = await this.subscriptionPlanUseCase.createSubscriptionPlan(body)
            return res.status(200).json({
                success: true,
                message: 'Plan de suscripción insertado.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el plan de suscripción.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const rou_uuid = req.params.rou_uuid;
            const update = req.body;
            if(!update.rou_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el plan de suscripción.',
                    error: 'Debe proporcionar un Nombre para el plan de suscripción.'
                })
            };
            const routeByName = await this.subscriptionPlanUseCase.findSubscriptionPlanByName(cmp_uuid, update.rou_name, rou_uuid);
            if(routeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el plan de suscripción.',
                    error: `El nombre ${update.rou_name} de plan de suscripción ya existe.`
                });
            }
            const route = await this.subscriptionPlanUseCase.updateSubscriptionPlan(cmp_uuid, rou_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Plan de suscripción actualizado.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el plan de suscripción.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const rou_uuid = req.params.rou_uuid;
            if(!rou_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la ruta.',
                    error: 'Debe proporcionar un Id de ruta.'
                });
            };
            const route = await this.subscriptionPlanUseCase.deleteSubscriptionPlan(cmp_uuid, rou_uuid)
            return res.status(200).json({
                success: true,
                message: 'Plan de suscripción eliminado.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la ruta.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}