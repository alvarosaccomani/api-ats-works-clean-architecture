import { WorkDetailEntity, WorkDetailUpdateData } from "../../../domain/work-detail/work-detail.entity";
import { WorkDetailRepository } from "../../../domain/work-detail/work-detail.repository";
import { SequelizeWorkDetail } from "../../model/work-detail/work-detail.model";

export class SequelizeRepository implements WorkDetailRepository {
    async getWorkDetails(cmp_uuid: string): Promise<WorkDetailEntity[] | null> {
        try {
            const workDetails = await SequelizeWorkDetail.findAll({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!workDetails) {
                throw new Error(`No hay work details`)
            };
            return workDetails;
        } catch (error: any) {
            console.error('Error en getWorkDetails:', error.message);
            throw error;
        }
    }
    async findWorkDetailById(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string): Promise<WorkDetailEntity | null> {
        try {
            const workDetail = await SequelizeWorkDetail.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null,
                    wrkd_uuid: wrkd_uuid ?? null
                } 
            });
            if(!workDetail) {
                throw new Error(`No hay work detail con el Id: ${cmp_uuid}`);
            };
            return workDetail.dataValues;
        } catch (error: any) {
            console.error('Error en findWorkDetailById:', error.message);
            throw error;
        }
    }
    async createWorkDetail(workDetail: WorkDetailEntity): Promise<WorkDetailEntity | null> {
        try {
            let { cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_order, wrkd_createdat, wrkd_updatedat } = workDetail
            const result = await SequelizeWorkDetail.create({ cmp_uuid, wrk_uuid, wrkd_uuid, wrkd_key, wrkd_name, wrkd_description, dtp_uuid, wrkd_value, wrkd_order, wrkd_createdat, wrkd_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el work detail`);
            }
            let newWorkDetail = result.dataValues as SequelizeWorkDetail
            return newWorkDetail;
        } catch (error: any) {
            console.error('Error en createWorkDetail:', error.message);
            throw error;
        }
    }
    async updateWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string, workDetail: WorkDetailUpdateData): Promise<WorkDetailEntity | null> {
        try {
            const [updatedCount, [updatedWorkDetail]] = await SequelizeWorkDetail.update(
                { 
                    wrkd_key: workDetail.wrkd_key,
                    wrkd_name: workDetail.wrkd_name,
                    wrkd_description: workDetail.wrkd_description,
                    dtp_uuid: workDetail.dtp_uuid,
                    wrkd_value: workDetail.wrkd_value,
                    wrkd_order: workDetail.wrkd_order
                }, 
                { 
                    where: { cmp_uuid, wrk_uuid, wrkd_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el work detail`);
            };
            return updatedWorkDetail.get({ plain: true }) as WorkDetailEntity;
        } catch (error: any) {
            console.error('Error en updateWorkDetail:', error.message);
            throw error;
        }
    }
    async deleteWorkDetail(cmp_uuid: string, wrk_uuid: string, wrkd_uuid: string): Promise<WorkDetailEntity | null> {
        try {
            const workdetail = await this.findWorkDetailById(cmp_uuid, wrk_uuid, wrkd_uuid);
            const result = await SequelizeWorkDetail.destroy({ where: { cmp_uuid, wrk_uuid, wrkd_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el work detail`);
            };
            return workdetail;
        } catch (error: any) {
            console.error('Error en deleteWorkDetail:', error.message);
            throw error;
        }
    }
    async existWorkDetail(cmp_uuid: string, wrk_uuid: string): Promise<WorkDetailEntity | null> {
        try {
            const workdetail = await SequelizeWorkDetail.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null
                } 
            });
            return workdetail;
        } catch (error: any) {
            console.error('Error en deleteWorkDetail:', error.message);
            throw error;
        }
    }
    
}