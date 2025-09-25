import { Sequelize } from 'sequelize';
import { WorkEntity } from "../../../domain/work/work.entity";
import { WorkRepository } from "../../../domain/work/work.repository";
import { SequelizeWork } from "../../model/work/work.model";
import { SequelizeAddress } from "../../model/address/address.model";
import { SequelizeCustomer } from '../../model/customer/customer.model';
import { SequelizeWorkState } from "../../model/work-state/work-state.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeModelItem } from "../../model/model-item/model-item.model";
import { SequelizeDetailModelItem } from '../../model/detail-model-item/detail-model-item.model';
import { SequelizeWorkDetail } from "../../model/work-detail/work-detail.model";
import { SequelizeDataType } from "../../model/data-type/data-type.model";

export class SequelizeRepository implements WorkRepository {
    async getWorks(cmp_uuid: string): Promise<WorkEntity[] | null> {
        try {
            const works = await SequelizeWork.findAll({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!works) {
                throw new Error(`No hay works`)
            };
            return works;
        } catch (error: any) {
            console.error('Error en getWorks:', error.message);
            throw error;
        }
    }
    async findWorkById(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null> {
        try {
            const work = await SequelizeWork.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null
                },
                include: [
                    {
                        as: 'adr',
                        model: SequelizeAddress,
                        include: [
                            { 
                                as: 'cus', 
                                model: SequelizeCustomer
                            }
                        ]
                    },
                    {
                        as: 'wrks',
                        model: SequelizeWorkState
                    },
                    {
                        as: 'wrk_user',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator',
                        model: SequelizeUser
                    },
                    {
                        as: 'mitm',
                        model: SequelizeModelItem,
                        include: [
                            { 
                                as: 'detailModelItems', 
                                model: SequelizeDetailModelItem
                            }
                        ] 
                    },
                    { 
                        as: "workDetails",
                        model: SequelizeWorkDetail,
                        include: [
                            { 
                                as: 'dtp', 
                                model: SequelizeDataType
                            }
                        ] 
                    }
                ],
                order: [
                    [Sequelize.col('workDetails.wrkd_order'), 'ASC'], // Ordenar usando Sequelize.col
                ]
            });
            if(!work) {
                throw new Error(`No hay work con el Id: ${cmp_uuid}`);
            };
            return work.dataValues;
        } catch (error: any) {
            console.error('Error en findWorkById:', error.message);
            throw error;
        }
    }
    async createWork(work: WorkEntity): Promise<WorkEntity | null> {
        try {
            let { cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat } = work
            const result = await SequelizeWork.create({ cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el work`);
            }
            let newWork = result.dataValues as SequelizeWork
            return newWork;
        } catch (error: any) {
            console.error('Error en createWork:', error.message);
            throw error;
        }
    }
    async updateWork(cmp_uuid: string, wrk_uuid: string, work: WorkEntity): Promise<WorkEntity | null> {
        try {
            let { adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat } = work
            const result = await SequelizeWork.update({ adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat }, { where: { cmp_uuid, wrk_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el work`);
            };
            return work;
        } catch (error: any) {
            console.error('Error en updateWork:', error.message);
            throw error;
        }
    }
    async deleteWork(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null> {
        try {
            const work = await this.findWorkById(cmp_uuid, wrk_uuid);
            const result = await SequelizeWork.destroy({ where: { cmp_uuid, wrk_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el work`);
            };
            return work;
        } catch (error: any) {
            console.error('Error en deleteWork:', error.message);
            throw error;
        }
    }
    async existWork(cmp_uuid: string, wrk_uuid: string): Promise<WorkEntity | null> {
        try {
            const work = await SequelizeWork.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null
                } 
            });
            return work;
        } catch (error: any) {
            console.error('Error en deleteWork:', error.message);
            throw error;
        }
    }
    
}