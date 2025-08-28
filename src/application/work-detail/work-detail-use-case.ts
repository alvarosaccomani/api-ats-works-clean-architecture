import { WorkDetailRepository } from "../../domain/work-detail/work-detail.repository";
import { WorkDetailValue } from "../../domain/work-detail/work-detail.value";

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

    public async getWorkDetails() {
        try {
            const workDetails = this.workDetailRepository.getWorkDetails();
            if(!workDetails) {
                throw new Error('No hay work details.');
            }
            return workDetails;
        } catch (error: any) {
            console.error('Error en getWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string) {
        try {
            const workDetails = this.workDetailRepository.findWorkDetailById(cmp_uuid, wrk_uuid, wrkd_uuid);
            if(!workDetails) {
                throw new Error(`No hay work details con el Id: ${cmp_uuid}, ${wrk_uuid}, ${wrkd_uuid}`);
            }
            return workDetails;
        } catch (error: any) {
            console.error('Error en getDetailWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWorkDetail({ cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_createdat, wrkd_updatedat } : { cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string, wrkd_key: string, wrkd_name: string, wrkd_description: string, dtp_uuid: string, wrkd_value: string, wrkd_createdat: Date, wrkd_updatedat: Date }) {
        try {
            const workDetailsValue = new WorkDetailValue({ cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_createdat, wrkd_updatedat });
            const workDetailsCreated = await this.workDetailRepository.createWorkDetail(workDetailsValue);
            if(!workDetailsCreated) {
                throw new Error(`No se pudo insertar el work detail.`);
            }
            return workDetailsCreated;
        } catch (error: any) {
            console.error('Error en createWorkDetails (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string, { wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_createdat, wrkd_updatedat } : { wrkd_key: string, wrkd_name: string, wrkd_description: string, dtp_uuid: string, wrkd_value: string, wrkd_createdat: Date, wrkd_updatedat: Date }) {
        try {
            const workDetailsUpdated = await this.workDetailRepository.updateWorkDetail(cmp_uuid, wrk_uuid, wrkd_uuid, { cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_createdat, wrkd_updatedat });
            if(!workDetailsUpdated) {
                throw new Error(`No se pudo actualizar el workd etail.`);
            }
            return workDetailsUpdated;
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
            return workDetailsDeleted;
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