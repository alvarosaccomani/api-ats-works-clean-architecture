import { RolEntity } from "./rol.entity";

export interface RolRepository {
    getRoles(): Promise<RolEntity[] | null>;
    findRolById(rol_uuid: string): Promise<RolEntity | null>;
    createRol(rol: RolEntity): Promise<RolEntity | null>;
    updateRol(rol_uuid: string, rol: RolEntity): Promise<RolEntity | null>;
    deleteRol(rol_uuid: string): Promise<RolEntity | null>;
    findRolByName(rol_name: string, excludeUuid?: string | null): Promise<RolEntity | null>;
}