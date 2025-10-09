import { WorkStateRepository } from "../../domain/work-state/work-state.repository";
import { WorkStateValue } from "../../domain/work-state/work-state.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

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

    public async getWorkStates(cmp_uuid: string) {
        try {
            const typeWorkStates = await this.workstateRepository.getWorkStates(cmp_uuid);
            if(!typeWorkStates) {
                throw new Error('No hay work states.');
            }
            return typeWorkStates.map((workState) => ({
                cmp_uuid: workState.cmp_uuid,
                wrks_uuid: workState.wrks_uuid,
                wrks_name: workState.wrks_name,
                wrks_description: workState.wrks_description,
                wrks_bkcolor: workState.wrks_bkcolor,
                wrks_frcolor: workState.wrks_frcolor,
                wrks_createdat: TimezoneConverter.toIsoStringInTimezone(workState.wrks_createdat, 'America/Argentina/Buenos_Aires'),
                wrks_updatedat: TimezoneConverter.toIsoStringInTimezone(workState.wrks_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getWorkStates (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailWorkState(cmp_uuid: string, wrks_uuid: string) {
        try {
            const workState = await this.workstateRepository.findWorkStateById(cmp_uuid, wrks_uuid);
            if(!workState) {
                throw new Error(`No hay work state con el Id: ${cmp_uuid}, ${wrks_uuid}`);
            }
            return {
                cmp_uuid: workState.cmp_uuid,
                wrks_uuid: workState.wrks_uuid,
                wrks_name: workState.wrks_name,
                wrks_description: workState.wrks_description,
                wrks_bkcolor: workState.wrks_bkcolor,
                wrks_frcolor: workState.wrks_frcolor,
                wrks_createdat: TimezoneConverter.toIsoStringInTimezone(workState.wrks_createdat, 'America/Argentina/Buenos_Aires'),
                wrks_updatedat: TimezoneConverter.toIsoStringInTimezone(workState.wrks_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailWorkState (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWorkState({ cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor } : { cmp_uuid: string, wrks_uuid: string, wrks_name: string, wrks_description: string, wrks_bkcolor: string, wrks_frcolor: string }) {
        try {
            const workStateValue = new WorkStateValue({ cmp_uuid, wrks_uuid, wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor });
            const workStateCreated = await this.workstateRepository.createWorkState(workStateValue);
            if(!workStateCreated) {
                throw new Error(`No se pudo insertar el work state.`);
            }
            return {
                cmp_uuid: workStateCreated.cmp_uuid,
                wrks_uuid: workStateCreated.wrks_uuid,
                wrks_name: workStateCreated.wrks_name,
                wrks_description: workStateCreated.wrks_description,
                wrks_bkcolor: workStateCreated.wrks_bkcolor,
                wrks_frcolor: workStateCreated.wrks_frcolor,
                wrks_createdat: TimezoneConverter.toIsoStringInTimezone(workStateCreated.wrks_createdat, 'America/Argentina/Buenos_Aires'),
                wrks_updatedat: TimezoneConverter.toIsoStringInTimezone(workStateCreated.wrks_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createWorkState (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWorkState(cmp_uuid: string, wrks_uuid: string, { wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor } : { wrks_name: string, wrks_description: string, wrks_bkcolor: string, wrks_frcolor: string }) {
        try {
            const workStateUpdated = await this.workstateRepository.updateWorkState(cmp_uuid, wrks_uuid, { wrks_name, wrks_description, wrks_bkcolor, wrks_frcolor });
            if(!workStateUpdated) {
                throw new Error(`No se pudo actualizar el work state.`);
            }
            return {
                cmp_uuid: workStateUpdated.cmp_uuid,
                wrks_uuid: workStateUpdated.wrks_uuid,
                wrks_name: workStateUpdated.wrks_name,
                wrks_description: workStateUpdated.wrks_description,
                wrks_bkcolor: workStateUpdated.wrks_bkcolor,
                wrks_frcolor: workStateUpdated.wrks_frcolor,
                wrks_createdat: TimezoneConverter.toIsoStringInTimezone(workStateUpdated.wrks_createdat, 'America/Argentina/Buenos_Aires'),
                wrks_updatedat: TimezoneConverter.toIsoStringInTimezone(workStateUpdated.wrks_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: workStateDeleted.cmp_uuid,
                wrks_uuid: workStateDeleted.wrks_uuid,
                wrks_name: workStateDeleted.wrks_name,
                wrks_description: workStateDeleted.wrks_description,
                wrks_bkcolor: workStateDeleted.wrks_bkcolor,
                wrks_frcolor: workStateDeleted.wrks_frcolor,
                wrks_createdat: TimezoneConverter.toIsoStringInTimezone(workStateDeleted.wrks_createdat, 'America/Argentina/Buenos_Aires'),
                wrks_updatedat: TimezoneConverter.toIsoStringInTimezone(workStateDeleted.wrks_updatedat, 'America/Argentina/Buenos_Aires')
            };
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