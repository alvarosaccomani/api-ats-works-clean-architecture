import { WorkStateRepository } from "../../domain/work-state/work-state.repository";
import { WorkStateValue } from "../../domain/work-state/work-state.value";

export class WorkStateUseCase {
    constructor(
        private readonly workstateRepository: WorkStateRepository
    ) {
        this.getWorkStates = this.getWorkStates.bind(this);
        this.getDetailWorkState = this.getDetailWorkState.bind(this);
        this.createWorkState = this.createWorkState.bind(this);
        this.updateWorkState = this.updateWorkState.bind(this);
        this.deleteWorkState = this.deleteWorkState.bind(this);
        this.findWorkStateByName = this.findWorkStateByName.bind(this);
    }

    public async getWorkStates() {
        try {
            const typeWorkStates = this.workstateRepository.getWorkStates();
            if(!typeWorkStates) {
                throw new Error('No hay work states.');
            }
            return typeWorkStates;
        } catch (error: any) {
            console.error('Error en getWorkStates (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailWorkState(cmp_uuid: string, wrks_uuid: string) {
        try {
            const workState = this.workstateRepository.findWorkStateById(cmp_uuid, wrks_uuid);
            if(!workState) {
                throw new Error(`No hay work state con el Id: ${cmp_uuid}, ${wrks_uuid}`);
            }
            return workState;
        } catch (error: any) {
            console.error('Error en getDetailWorkState (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWorkState({ cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor, wrks_createdat, wrks_updatedat } : { cmp_uuid: string, wrks_uuid: string, wrks_name: string, wrks_description: string, wrks_bkcolor: string, wrks_frcolor: string, wrks_createdat: Date, wrks_updatedat: Date }) {
        try {
            const workStateValue = new WorkStateValue({ cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor, wrks_createdat, wrks_updatedat });
            const workStateCreated = await this.workstateRepository.createWorkState(workStateValue);
            if(!workStateCreated) {
                throw new Error(`No se pudo insertar el work state.`);
            }
            return workStateCreated;
        } catch (error: any) {
            console.error('Error en createWorkState (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWorkState(cmp_uuid: string, wrks_uuid: string, { wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor, wrks_createdat, wrks_updatedat } : { wrks_name: string, wrks_description: string, wrks_bkcolor: string, wrks_frcolor: string, wrks_createdat: Date, wrks_updatedat: Date }) {
        try {
            const workStateUpdated = await this.workstateRepository.updateWorkState(cmp_uuid, wrks_uuid, { cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor, wrks_createdat, wrks_updatedat });
            if(!workStateUpdated) {
                throw new Error(`No se pudo actualizar el work state.`);
            }
            return workStateUpdated;
        } catch (error: any) {
            console.error('Error en updateWorkState (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteWorkState(cmp_uuid: string, wrks_uuid: string) {
        try {
            const workStateDeleted = await this.workstateRepository.deleteWorkState(cmp_uuid, wrks_uuid);
            if(!workStateDeleted) {
                throw new Error(`No se pudo eliminar el work state.`);
            }
            return workStateDeleted;
        } catch (error: any) {
            console.error('Error en deleteWorkState (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findWorkStateByName(cmp_uuid: string, wrks_name: string, excludeUuid?: string) {
        try {
            const workState = await this.workstateRepository.findWorkStateByName(cmp_uuid, wrks_name, excludeUuid)
            if(workState) {
                throw new Error(`Ya existe un work state con el nombre ${wrks_name}.`);
            }
            return workState
        } catch (error: any) {
            console.error('Error en findWorkStateByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}