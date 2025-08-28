import { WorkRepository } from "../../domain/work/work.repository";
import { WorkValue } from "../../domain/work/work.value";

export class WorkUseCase {
    constructor(
        private readonly workRepository: WorkRepository
    ) {
        this.getWorks = this.getWorks.bind(this);
        this.getDetailWork = this.getDetailWork.bind(this);
        this.createWork = this.createWork.bind(this);
        this.updateWork = this.updateWork.bind(this);
        this.deleteWork = this.deleteWork.bind(this);
    }

    public async getWorks() {
        try {
            const works = this.workRepository.getWorks();
            if(!works) {
                throw new Error('No hay works.');
            }
            return works;
        } catch (error: any) {
            console.error('Error en getWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailWork(cmp_uuid: string, wrk_uuid: string) {
        try {
            const works = this.workRepository.findWorkById(cmp_uuid, wrk_uuid);
            if(!works) {
                throw new Error(`No hay works con el Id: ${cmp_uuid}, ${wrk_uuid}`);
            }
            return works;
        } catch (error: any) {
            console.error('Error en getDetailWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWork({ cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat } : { cmp_uuid: string, wrk_uuid: string, adr_uuid: string, wrk_description: string, wrk_workdate: Date, wrk_workdateinit: Date, wrk_workdatefinish: Date, wrks_uuid: string, wrk_user_uuid: string, wrk_operator_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, wrk_createdat: Date, wrk_updatedat: Date }) {
        try {
            const worksValue = new WorkValue({ cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat });
            const worksCreated = await this.workRepository.createWork(worksValue);
            if(!worksCreated) {
                throw new Error(`No se pudo insertar el work.`);
            }
            return worksCreated;
        } catch (error: any) {
            console.error('Error en createWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWork(cmp_uuid: string, wrk_uuid: string, { adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat } : { cmp_uuid: string, wrk_uuid: string, adr_uuid: string, wrk_description: string, wrk_workdate: Date, wrk_workdateinit: Date, wrk_workdatefinish: Date, wrks_uuid: string, wrk_user_uuid: string, wrk_operator_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, wrk_createdat: Date, wrk_updatedat: Date }) {
        try {
            const worksUpdated = await this.workRepository.updateWork(cmp_uuid, wrk_uuid, { cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat });
            if(!worksUpdated) {
                throw new Error(`No se pudo actualizar el work.`);
            }
            return worksUpdated;
        } catch (error: any) {
            console.error('Error en updateWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteWork(cmp_uuid: string, wrk_uuid: string) {
        try {
            const worksDeleted = await this.workRepository.deleteWork(cmp_uuid, wrk_uuid);
            if(!worksDeleted) {
                throw new Error(`No se pudo eliminar el work.`);
            }
            return worksDeleted;
        } catch (error: any) {
            console.error('Error en deleteWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existWork(cmp_uuid: string, wrk_uuid: string) {
        try {
            const work = this.workRepository.existWork(cmp_uuid, wrk_uuid);
            return work;
        } catch (error: any) {
            console.error('Error en existWork (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}