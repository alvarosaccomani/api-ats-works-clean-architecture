import { WorkRepository } from "../../domain/work/work.repository";
import { WorkValue } from "../../domain/work/work.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

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

    public async getWorks(cmp_uuid: string) {
        try {
            const works = await this.workRepository.getWorks(cmp_uuid);
            if(!works) {
                throw new Error('No hay works.');
            }
            return works.map((work) => ({
                cmp_uuid: work.cmp_uuid,
                wrk_uuid: work.wrk_uuid,
                adr_uuid: work.adr_uuid,
                adr: work.adr,
                wrk_description: work.wrk_description,
                wrk_workdate: TimezoneConverter.toIsoStringInTimezone(work.wrk_workdate, 'America/Argentina/Buenos_Aires'),
                wrk_workdateinit: TimezoneConverter.toIsoStringInTimezone(work.wrk_workdateinit, 'America/Argentina/Buenos_Aires'),
                wrk_workdatefinish: TimezoneConverter.toIsoStringInTimezone(work.wrk_workdatefinish, 'America/Argentina/Buenos_Aires'),
                wrks_uuid: work.wrks_uuid,
                wrks: work.wrks,
                wrk_user_uuid: work.wrk_user_uuid,
                wrk_user: work.wrk_user,
                wrk_operator_uuid: work.wrk_operator_uuid,
                wrk_operator: work.wrk_operator,
                itm_uuid: work.itm_uuid,
                cmpitm_uuid: work.cmpitm_uuid,
                mitm_uuid: work.mitm_uuid,
                mitm: work.mitm,
                wrk_createdat: TimezoneConverter.toIsoStringInTimezone(work.wrk_createdat, 'America/Argentina/Buenos_Aires'),
                wrk_updatedat: TimezoneConverter.toIsoStringInTimezone(work.wrk_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getWorks (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailWork(cmp_uuid: string, wrk_uuid: string) {
        try {
            const works = await this.workRepository.findWorkById(cmp_uuid, wrk_uuid);
            if(!works) {
                throw new Error(`No hay works con el Id: ${cmp_uuid}, ${wrk_uuid}`);
            }
            return {
                cmp_uuid: works.cmp_uuid,
                wrk_uuid: works.wrk_uuid,
                adr_uuid: works.adr_uuid,
                adr: works.adr,
                wrk_description: works.wrk_description,
                wrk_workdate: TimezoneConverter.toIsoStringInTimezone(works.wrk_workdate, 'America/Argentina/Buenos_Aires'),
                wrk_workdateinit: TimezoneConverter.toIsoStringInTimezone(works.wrk_workdateinit, 'America/Argentina/Buenos_Aires'),
                wrk_workdatefinish: TimezoneConverter.toIsoStringInTimezone(works.wrk_workdatefinish, 'America/Argentina/Buenos_Aires'),
                wrks_uuid: works.wrks_uuid,
                wrks: works.wrks,
                wrk_user_uuid: works.wrk_user_uuid,
                wrk_user: works.wrk_user,
                wrk_operator_uuid: works.wrk_operator_uuid,
                wrk_operator: works.wrk_operator,
                itm_uuid: works.itm_uuid,
                cmpitm_uuid: works.cmpitm_uuid,
                mitm_uuid: works.mitm_uuid,
                mitm: works.mitm,
                workDetails: works.workDetails,
                workAttachments: works.workAttachments,
                wrk_createdat: TimezoneConverter.toIsoStringInTimezone(works.wrk_createdat, 'America/Argentina/Buenos_Aires'),
                wrk_updatedat: TimezoneConverter.toIsoStringInTimezone(works.wrk_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: worksCreated.cmp_uuid,
                wrk_uuid: worksCreated.wrk_uuid,
                adr_uuid: worksCreated.adr_uuid,
                wrk_description: worksCreated.wrk_description,
                wrk_workdate: TimezoneConverter.toIsoStringInTimezone(worksCreated.wrk_workdate, 'America/Argentina/Buenos_Aires'),
                wrk_workdateinit: TimezoneConverter.toIsoStringInTimezone(worksCreated.wrk_workdateinit, 'America/Argentina/Buenos_Aires'),
                wrk_workdatefinish: TimezoneConverter.toIsoStringInTimezone(worksCreated.wrk_workdatefinish, 'America/Argentina/Buenos_Aires'),
                wrks_uuid: worksCreated.wrks_uuid,
                wrk_user_uuid: worksCreated.wrk_user_uuid,
                wrk_operator_uuid: worksCreated.wrk_operator_uuid,
                itm_uuid: worksCreated.itm_uuid,
                cmpitm_uuid: worksCreated.cmpitm_uuid,
                mitm_uuid: worksCreated.mitm_uuid,
                wrk_createdat: TimezoneConverter.toIsoStringInTimezone(worksCreated.wrk_createdat, 'America/Argentina/Buenos_Aires'),
                wrk_updatedat: TimezoneConverter.toIsoStringInTimezone(worksCreated.wrk_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: worksUpdated.cmp_uuid,
                wrk_uuid: worksUpdated.wrk_uuid,
                adr_uuid: worksUpdated.adr_uuid,
                wrk_description: worksUpdated.wrk_description,
                wrk_workdate: TimezoneConverter.toIsoStringInTimezone(worksUpdated.wrk_workdate, 'America/Argentina/Buenos_Aires'),
                wrk_workdateinit: TimezoneConverter.toIsoStringInTimezone(worksUpdated.wrk_workdateinit, 'America/Argentina/Buenos_Aires'),
                wrk_workdatefinish: TimezoneConverter.toIsoStringInTimezone(worksUpdated.wrk_workdatefinish, 'America/Argentina/Buenos_Aires'),
                wrks_uuid: worksUpdated.wrks_uuid,
                wrk_user_uuid: worksUpdated.wrk_user_uuid,
                wrk_operator_uuid: worksUpdated.wrk_operator_uuid,
                itm_uuid: worksUpdated.itm_uuid,
                cmpitm_uuid: worksUpdated.cmpitm_uuid,
                mitm_uuid: worksUpdated.mitm_uuid,
                wrk_createdat: TimezoneConverter.toIsoStringInTimezone(worksUpdated.wrk_createdat, 'America/Argentina/Buenos_Aires'),
                wrk_updatedat: TimezoneConverter.toIsoStringInTimezone(worksUpdated.wrk_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: worksDeleted.cmp_uuid,
                wrk_uuid: worksDeleted.wrk_uuid,
                adr_uuid: worksDeleted.adr_uuid,
                wrk_description: worksDeleted.wrk_description,
                wrk_workdate: TimezoneConverter.toIsoStringInTimezone(worksDeleted.wrk_workdate, 'America/Argentina/Buenos_Aires'),
                wrk_workdateinit: TimezoneConverter.toIsoStringInTimezone(worksDeleted.wrk_workdateinit, 'America/Argentina/Buenos_Aires'),
                wrk_workdatefinish: TimezoneConverter.toIsoStringInTimezone(worksDeleted.wrk_workdatefinish, 'America/Argentina/Buenos_Aires'),
                wrks_uuid: worksDeleted.wrks_uuid,
                wrk_user_uuid: worksDeleted.wrk_user_uuid,
                wrk_operator_uuid: worksDeleted.wrk_operator_uuid,
                itm_uuid: worksDeleted.itm_uuid,
                cmpitm_uuid: worksDeleted.cmpitm_uuid,
                mitm_uuid: worksDeleted.mitm_uuid,
                wrk_createdat: TimezoneConverter.toIsoStringInTimezone(worksDeleted.wrk_createdat, 'America/Argentina/Buenos_Aires'),
                wrk_updatedat: TimezoneConverter.toIsoStringInTimezone(worksDeleted.wrk_updatedat, 'America/Argentina/Buenos_Aires')
            };
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