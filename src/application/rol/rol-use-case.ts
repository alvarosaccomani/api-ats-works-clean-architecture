import { RolRepository } from "../../domain/rol/rol.repository";
import { RolValue } from "../../domain/rol/rol.value";

export class RolUseCase {
    constructor(
        private readonly rolRepository: RolRepository
    ) {
        this.getRoles = this.getRoles.bind(this);
        this.getDetailRol = this.getDetailRol.bind(this);
        this.createRol = this.createRol.bind(this);
        this.updateRol = this.updateRol.bind(this);
        this.deleteRol = this.deleteRol.bind(this);
        this.findRolByName = this.findRolByName.bind(this);
    }

    public async getRoles() {
        try {
            const typeRols = this.rolRepository.getRoles();
            if(!typeRols) {
                throw new Error('No hay roles.');
            }
            return typeRols;
        } catch (error: any) {
            console.error('Error en getRoles (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailRol(rol_uuid: string) {
        try {
            const rol = this.rolRepository.findRolById(rol_uuid);
            if(!rol) {
                throw new Error(`No hay rol con el Id: ${rol_uuid}`);
            }
            return rol;
        } catch (error: any) {
            console.error('Error en getDetailRol (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createRol({ rol_uuid, rol_name, rol_createdat, rol_updatedat } : { rol_uuid: string, rol_name: string, rol_createdat: Date, rol_updatedat: Date }) {
        try {
            const rolValue = new RolValue({ rol_uuid, rol_name, rol_createdat, rol_updatedat });
            const rolCreated = await this.rolRepository.createRol(rolValue);
            if(!rolCreated) {
                throw new Error(`No se pudo insertar el rol.`);
            }
            return rolCreated;
        } catch (error: any) {
            console.error('Error en createRol (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateRol(rol_uuid: string, { rol_name, rol_createdat, rol_updatedat } : { rol_name: string, rol_createdat: Date, rol_updatedat: Date }) {
        try {
            const rolUpdated = await this.rolRepository.updateRol(rol_uuid, { rol_uuid, rol_name, rol_createdat, rol_updatedat });
            if(!rolUpdated) {
                throw new Error(`No se pudo actualizar el rol.`);
            }
            return rolUpdated;
        } catch (error: any) {
            console.error('Error en updateRol (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteRol(rol_uuid: string) {
        try {
            const rolDeleted = await this.rolRepository.deleteRol(rol_uuid);
            if(!rolDeleted) {
                throw new Error(`No se pudo eliminar el rol.`);
            }
            return rolDeleted;
        } catch (error: any) {
            console.error('Error en deleteRol (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findRolByName(rol_name: string, excludeUuid?: string) {
        try {
            const rol = await this.rolRepository.findRolByName(rol_name, excludeUuid)
            if(rol) {
                throw new Error(`Ya existe un rol con el nombre ${rol_name}.`);
            }
            return rol
        } catch (error: any) {
            console.error('Error en findRolByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}