import { RouteEntity, RouteUpdateData } from "./route.entity";

export interface RouteRepository {
    getRoutes(cmp_uuid: string): Promise<RouteEntity[] | null>;
    findRouteById(cmp_uuid: string, rou_uuid: string): Promise<RouteEntity | null>;
    createRoute(route: RouteEntity): Promise<RouteEntity | null>;
    updateRoute(cmp_uuid: string, rou_uuid: string, route: RouteUpdateData): Promise<RouteEntity | null>;
    deleteRoute(cmp_uuid: string, rou_uuid: string): Promise<RouteEntity | null>;
    findRouteByName(cmp_uuid: string, rou_name: string, excludeUuid?: string | null): Promise<RouteEntity | null>;
}