import { Request, Response } from "express";
import { RouteUseCase } from "../../../application/route/route-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class RouteController {
    constructor(private routeUseCase: RouteUseCase, private socketAdapter: SocketAdapter) {
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
                const routes = await this.routeUseCase.getRoutes(cmp_uuid);
                return res.status(200).send({
                    success: true,
                    message: 'Rutas retornadas.',
                    ...paginator(routes, page.toString(), perPage.toString())
                });
            } else {
                const routes = await this.routeUseCase.getRoutes(cmp_uuid);
                return res.status(200).send({
                    success: true,
                    message: 'Rutas retornadas.',
                    data: routes
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las rutas.',
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
                    message: 'No se pudo recuperar la ruta.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!rou_uuid || rou_uuid.toLowerCase() === 'null' || rou_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la ruta.',
                    error: 'Debe proporcionar un Id de ruta.'
                });
            }
            const route = await this.routeUseCase.getDetailRoute(`${cmp_uuid}`, `${rou_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Ruta retornada.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la ruta.',
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
                    message: 'No se pudo insertar la ruta.',
                    error: 'Debe proporcionar un Nombre para la ruta.'
                })
            };
            const routeByName = await this.routeUseCase.findRouteByName(cmp_uuid, rou_name);
            if(routeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la ruta.',
                    error: `El nombre ${rou_name} de ruta ya existe.`
                });
            }
            const route = await this.routeUseCase.createRoute(body)
            return res.status(200).json({
                success: true,
                message: 'Ruta insertada.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la ruta.',
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
                    message: 'No se pudo actualizar la ruta.',
                    error: 'Debe proporcionar un Nombre para la ruta.'
                })
            };
            const routeByName = await this.routeUseCase.findRouteByName(cmp_uuid, update.rou_name, rou_uuid);
            if(routeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la ruta.',
                    error: `El nombre ${update.rou_name} de ruta ya existe.`
                });
            }
            const route = await this.routeUseCase.updateRoute(cmp_uuid, rou_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Ruta actualizada.',
                data: route
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la ruta.',
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
            const route = await this.routeUseCase.deleteRoute(cmp_uuid, rou_uuid)
            return res.status(200).json({
                success: true,
                message: 'Ruta eliminada.',
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