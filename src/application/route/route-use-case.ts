import { RouteRepository } from "../../domain/route/route.repository";
import { RouteValue } from "../../domain/route/route.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class RouteUseCase {
    constructor(
        private readonly routeRepository: RouteRepository
    ) {
        this.getRoutes = this.getRoutes.bind(this);
        this.getDetailRoute = this.getDetailRoute.bind(this);
        this.createRoute = this.createRoute.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
        this.deleteRoute = this.deleteRoute.bind(this);
        this.findRouteByName = this.findRouteByName.bind(this);
    }

    public async getRoutes(cmp_uuid: string) {
        try {
            const routes = await this.routeRepository.getRoutes(cmp_uuid);
            if(!routes) {
                throw new Error('No hay rutas.');
            }
            return routes.map(route => ({
                rou_uuid: route.rou_uuid,
                rou_name: route.rou_name,
                rou_order: route.rou_order,
                rou_description: route.rou_description,
                rou_bkcolor: route.rou_bkcolor,
                rou_frcolor: route.rou_frcolor,
                rou_active: route.rou_active,
                rou_createdat: TimezoneConverter.toIsoStringInTimezone(route.rou_createdat, 'America/Buenos_Aires'),
                rou_updatedat: TimezoneConverter.toIsoStringInTimezone(route.rou_updatedat, 'America/Buenos_Aires'),
            }));
        } catch (error: any) {
            console.error('Error en getRoutes (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailRoute(cmp_uuid: string, rou_uuid: string) {
        try {
            const route = await this.routeRepository.findRouteById(cmp_uuid, rou_uuid);
            if(!route) {
                throw new Error(`No hay ruta con el Id: ${rou_uuid}`);
            }
            return {
                rou_uuid: route.rou_uuid,
                rou_name: route.rou_name,
                rou_order: route.rou_order,
                rou_description: route.rou_description,
                rou_bkcolor: route.rou_bkcolor,
                rou_frcolor: route.rou_frcolor,
                rou_active: route.rou_active,
                rou_createdat: TimezoneConverter.toIsoStringInTimezone(route.rou_createdat, 'America/Buenos_Aires'),
                rou_updatedat: TimezoneConverter.toIsoStringInTimezone(route.rou_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en getDetailRoute (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createRoute({ cmp_uuid, rou_uuid, rou_name, rou_order, rou_description, rou_bkcolor, rou_frcolor, rou_active } : { cmp_uuid: string, rou_uuid: string, rou_name: string, rou_order: number, rou_description: string, rou_bkcolor: string, rou_frcolor: string, rou_active: boolean }) {
        try {
            const routeValue = new RouteValue({ cmp_uuid, rou_uuid, rou_name, rou_order, rou_description, rou_bkcolor, rou_frcolor, rou_active });
            const routeCreated = await this.routeRepository.createRoute(routeValue);
            if(!routeCreated) {
                throw new Error(`No se pudo insertar la ruta.`);
            }
            return {
                rou_uuid: routeCreated.rou_uuid,
                rou_name: routeCreated.rou_name,
                rou_order: routeCreated.rou_order,
                rou_description: routeCreated.rou_description,
                rou_bkcolor: routeCreated.rou_bkcolor,
                rou_frcolor: routeCreated.rou_frcolor,
                rou_active: routeCreated.rou_active,
                rou_createdat: TimezoneConverter.toIsoStringInTimezone(routeCreated.rou_createdat, 'America/Buenos_Aires'),
                rou_updatedat: TimezoneConverter.toIsoStringInTimezone(routeCreated.rou_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en createRoute (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateRoute(cmp_uuid: string, rou_uuid: string, { rou_name, rou_order, rou_description, rou_bkcolor, rou_frcolor, rou_active } : { rou_name: string, rou_order: number, rou_description: string, rou_bkcolor: string, rou_frcolor: string, rou_active: boolean }) {
        try {
            const routeUpdated = await this.routeRepository.updateRoute(cmp_uuid, rou_uuid, { rou_name, rou_order, rou_description, rou_bkcolor, rou_frcolor, rou_active });
            if(!routeUpdated) {
                throw new Error(`No se pudo actualizar la ruta.`);
            }
            return {
                rou_uuid: routeUpdated.rou_uuid,
                rou_name: routeUpdated.rou_name,
                rou_order: routeUpdated.rou_order,
                rou_description: routeUpdated.rou_description,
                rou_bkcolor: routeUpdated.rou_bkcolor,
                rou_frcolor: routeUpdated.rou_frcolor,
                rou_active: routeUpdated.rou_active,
                rou_createdat: TimezoneConverter.toIsoStringInTimezone(routeUpdated.rou_createdat, 'America/Buenos_Aires'),
                rou_updatedat: TimezoneConverter.toIsoStringInTimezone(routeUpdated.rou_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en updateRol (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteRoute(cmp_uuid: string, rou_uuid: string) {
        try {
            const routeDeleted = await this.routeRepository.deleteRoute(cmp_uuid, rou_uuid);
            if(!routeDeleted) {
                throw new Error(`No se pudo eliminar la ruta.`);
            }
            return {
                rou_uuid: routeDeleted.rou_uuid,
                rou_name: routeDeleted.rou_name,
                rou_order: routeDeleted.rou_order,
                rou_description: routeDeleted.rou_description,
                rou_bkcolor: routeDeleted.rou_bkcolor,
                rou_frcolor: routeDeleted.rou_frcolor,
                rou_active: routeDeleted.rou_active,
                rou_createdat: TimezoneConverter.toIsoStringInTimezone(routeDeleted.rou_createdat, 'America/Buenos_Aires'),
                rou_updatedat: TimezoneConverter.toIsoStringInTimezone(routeDeleted.rou_updatedat, 'America/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en deleteRoute (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findRouteByName(cmp_uuid: string, rou_name: string, excludeUuid?: string) {
        try {
            const route = await this.routeRepository.findRouteByName(cmp_uuid, rou_name, excludeUuid)
            if(route) {
                throw new Error(`Ya existe una ruta con el nombre ${rou_name}.`);
            }
            return route
        } catch (error: any) {
            console.error('Error en findRolByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}