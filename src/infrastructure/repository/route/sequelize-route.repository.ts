import { Sequelize } from 'sequelize';
import { RouteEntity, RouteUpdateData } from "../../../domain/route/route.entity";
import { RouteRepository } from "../../../domain/route/route.repository";
import { SequelizeRoute } from "../../model/route/route.model";
import { Op } from "sequelize";

export class SequelizeRepository implements RouteRepository {
    async getRoutes(cmp_uuid: string): Promise<RouteEntity[] | null> {
        try {
            const routes = await SequelizeRoute.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null
                },
                order: [
                    [Sequelize.col('rou_order'), 'ASC'], // Ordenar usando Sequelize.col
                ]
            });
            if(!routes) {
                throw new Error(`No hay rutas`)
            };
            return routes;
        } catch (error: any) {
            console.error('Error en getRoutes:', error.message);
            throw error;
        }
    }
    async findRouteById(cmp_uuid: string, rou_uuid: string): Promise<RouteEntity | null> {
        try {
            const route = await SequelizeRoute.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    rou_uuid: rou_uuid ?? null
                } 
            });
            if(!route) {
                throw new Error(`No hay ruta con el Id: ${rou_uuid}`);
            };
            return route.dataValues;
        } catch (error: any) {
            console.error('Error en findRouteById:', error.message);
            throw error;
        }
    }
    async createRoute(route: RouteEntity): Promise<RouteEntity | null> {
        try {
            let { cmp_uuid, rou_uuid, rou_name, rou_order, rou_description, rou_bkcolor, rou_frcolor, rou_active, rou_createdat, rou_updatedat } = route
            const result = await SequelizeRoute.create({ cmp_uuid, rou_uuid, rou_name, rou_order, rou_description, rou_bkcolor, rou_frcolor, rou_active, rou_createdat, rou_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la ruta`);
            }
            let newRoute = result.dataValues as SequelizeRoute
            return newRoute;
        } catch (error: any) {
            console.error('Error en createRoute:', error.message);
            throw error;
        }
    }
    async updateRoute(cmp_uuid: string, rou_uuid: string, route: RouteUpdateData): Promise<RouteEntity | null> {
        try {
            const [updatedCount, [updatedRoute]] = await SequelizeRoute.update(
                {
                    rou_name: route.rou_name,
                    rou_order: route.rou_order,
                    rou_description: route.rou_description,
                    rou_bkcolor: route.rou_bkcolor,
                    rou_frcolor: route.rou_frcolor,
                    rou_active: route.rou_active
                },
                {
                    where: { cmp_uuid, rou_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la ruta`);
            }
            return updatedRoute.get({ plain: true }) as RouteEntity;
        } catch (error: any) {
            console.error('Error en updateRoute:', error.message);
            throw error;
        }
    }
    async deleteRoute(cmp_uuid: string, rou_uuid: string): Promise<RouteEntity | null> {
        try {
            const route = await this.findRouteById(cmp_uuid, rou_uuid);
            const result = await SequelizeRoute.destroy({ where: { cmp_uuid, rou_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la ruta`);
            };
            return route;
        } catch (error: any) {
            console.error('Error en deleteRoute:', error.message);
            throw error;
        }
    }
    async findRouteByName(cmp_uuid: string, rou_name: string, excludeUuid?: string | null): Promise<RouteEntity | null> {
        try {
            const whereCondition: any = { cmp_uuid, rou_name: rou_name ?? null };
            if (excludeUuid) {
                whereCondition.rou_uuid = { [Op.ne]: excludeUuid };
            }
            const route = await SequelizeRoute.findOne({ 
                where: whereCondition
            });
            return route;
        } catch (error: any) {
            console.error('Error en findRouteByName:', error.message);
            throw error;
        }
    }
    
}