import { WorkDetailRepository } from "../../domain/work-detail/work-detail.repository";
import { WorkDetailValue } from "../../domain/work-detail/work-detail.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class WorkDetailUseCase {
    constructor(
        private readonly workDetailRepository: WorkDetailRepository
    ) {
        this.getWorkDetails = this.getWorkDetails.bind(this);
        this.getDetailWorkDetail = this.getDetailWorkDetail.bind(this);
        this.createWorkDetail = this.createWorkDetail.bind(this);
        this.updateWorkDetail = this.updateWorkDetail.bind(this);
        this.deleteWorkDetail = this.deleteWorkDetail.bind(this);
    }

    public async getWorkDetails(cmp_uuid: string) {
        try {
            const workDetails = await this.workDetailRepository.getWorkDetails(cmp_uuid);
            if(!workDetails) {
                throw new Error('No hay work details.');
            }
            return workDetails.map((workDetail) => ({
                cmp_uuid,
                wrk_uuid: workDetail.wrk_uuid,
                wrkd_uuid: workDetail.wrkd_uuid,
                wrkd_key: workDetail.wrkd_key,
                wrkd_name: workDetail.wrkd_name,
                wrkd_description: workDetail.wrkd_description,
                dtp_uuid: workDetail.dtp_uuid,
                wrkd_value: workDetail.wrkd_value,
                wrkd_order: workDetail.wrkd_order,
                wrkd_createdat: TimezoneConverter.toIsoStringInTimezone(workDetail.wrkd_createdat, 'America/Argentina/Buenos_Aires'),
                wrkd_updatedat: TimezoneConverter.toIsoStringInTimezone(workDetail.wrkd_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string) {
        try {
            const workDetails = await this.workDetailRepository.findWorkDetailById(cmp_uuid, wrk_uuid, wrkd_uuid);
            if(!workDetails) {
                throw new Error(`No hay work details con el Id: ${cmp_uuid}, ${wrk_uuid}, ${wrkd_uuid}`);
            }
            return {
                cmp_uuid: workDetails.cmp_uuid,
                wrk_uuid: workDetails.wrk_uuid,
                wrkd_uuid: workDetails.wrkd_uuid,
                wrkd_key: workDetails.wrkd_key,
                wrkd_name: workDetails.wrkd_name,
                wrkd_description: workDetails.wrkd_description,
                dtp_uuid: workDetails.dtp_uuid,
                wrkd_value: workDetails.wrkd_value,
                wrkd_order: workDetails.wrkd_order,
                wrkd_createdat: TimezoneConverter.toIsoStringInTimezone(workDetails.wrkd_createdat, 'America/Argentina/Buenos_Aires'),
                wrkd_updatedat: TimezoneConverter.toIsoStringInTimezone(workDetails.wrkd_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWorkDetail({ cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_order } : { cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string, wrkd_key: string, wrkd_name: string, wrkd_description: string, dtp_uuid: string, wrkd_value: string, wrkd_order: string }) {
        try {
            const workDetailsValue = new WorkDetailValue({ cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_order });
            const workDetailsCreated = await this.workDetailRepository.createWorkDetail(workDetailsValue);
            if(!workDetailsCreated) {
                throw new Error(`No se pudo insertar el work detail.`);
            }
            return {
                cmp_uuid: workDetailsCreated.cmp_uuid,
                wrk_uuid: workDetailsCreated.wrk_uuid,
                wrkd_uuid: workDetailsCreated.wrkd_uuid,
                wrkd_key: workDetailsCreated.wrkd_key,
                wrkd_name: workDetailsCreated.wrkd_name,
                wrkd_description: workDetailsCreated.wrkd_description,
                dtp_uuid: workDetailsCreated.dtp_uuid,
                wrkd_value: workDetailsCreated.wrkd_value,
                wrkd_order: workDetailsCreated.wrkd_order,
                wrkd_createdat: TimezoneConverter.toIsoStringInTimezone(workDetailsCreated.wrkd_createdat, 'America/Argentina/Buenos_Aires'),
                wrkd_updatedat: TimezoneConverter.toIsoStringInTimezone(workDetailsCreated.wrkd_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string, { wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_order } : { wrkd_key: string, wrkd_name: string, wrkd_description: string, dtp_uuid: string, wrkd_value: string, wrkd_order: string }) {
        try {
            const workDetailsUpdated = await this.workDetailRepository.updateWorkDetail(cmp_uuid, wrk_uuid, wrkd_uuid, { wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_order });
            if(!workDetailsUpdated) {
                throw new Error(`No se pudo actualizar el workd etail.`);
            }
            return {
                cmp_uuid: workDetailsUpdated.cmp_uuid,
                wrk_uuid: workDetailsUpdated.wrk_uuid,
                wrkd_uuid: workDetailsUpdated.wrkd_uuid,
                wrkd_key: workDetailsUpdated.wrkd_key,
                wrkd_name: workDetailsUpdated.wrkd_name,
                wrkd_description: workDetailsUpdated.wrkd_description,
                dtp_uuid: workDetailsUpdated.dtp_uuid,
                wrkd_value: workDetailsUpdated.wrkd_value,
                wrkd_order: workDetailsUpdated.wrkd_order,
                wrkd_createdat: TimezoneConverter.toIsoStringInTimezone(workDetailsUpdated.wrkd_createdat, 'America/Argentina/Buenos_Aires'),
                wrkd_updatedat: TimezoneConverter.toIsoStringInTimezone(workDetailsUpdated.wrkd_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string) {
        try {
            const workDetailsDeleted = await this.workDetailRepository.deleteWorkDetail(cmp_uuid, wrk_uuid, wrkd_uuid);
            if(!workDetailsDeleted) {
                throw new Error(`No se pudo eliminar el work detail.`);
            }
            return {
                cmp_uuid: workDetailsDeleted.cmp_uuid,
                wrk_uuid: workDetailsDeleted.wrk_uuid,
                wrkd_uuid: workDetailsDeleted.wrkd_uuid,
                wrkd_key: workDetailsDeleted.wrkd_key,
                wrkd_name: workDetailsDeleted.wrkd_name,
                wrkd_description: workDetailsDeleted.wrkd_description,
                dtp_uuid: workDetailsDeleted.dtp_uuid,
                wrkd_value: workDetailsDeleted.wrkd_value,
                wrkd_order: workDetailsDeleted.wrkd_order,
                wrkd_createdat: TimezoneConverter.toIsoStringInTimezone(workDetailsDeleted.wrkd_createdat, 'America/Argentina/Buenos_Aires'),
                wrkd_updatedat: TimezoneConverter.toIsoStringInTimezone(workDetailsDeleted.wrkd_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string) {
        try {
            const workDetail = this.workDetailRepository.existWorkDetail(cmp_uuid, wrk_uuid, wrkd_uuid);
            return workDetail;
        } catch (error: any) {
            console.error('Error en existWorkDetail (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}