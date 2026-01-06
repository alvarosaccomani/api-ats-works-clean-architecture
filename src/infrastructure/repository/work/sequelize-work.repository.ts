import { Sequelize } from 'sequelize';
import { WorkEntity, WorkUpdateData } from "../../../domain/work/work.entity";
import { WorkRepository } from "../../../domain/work/work.repository";
import { SequelizeWork } from "../../model/work/work.model";
import { Op } from 'sequelize';
import { SequelizeAddress } from "../../model/address/address.model";
import { SequelizeCustomer } from '../../model/customer/customer.model';
import { SequelizeRoute } from '../../model/route/route.model';
import { SequelizeWorkState } from "../../model/work-state/work-state.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeModelItem } from "../../model/model-item/model-item.model";
import { SequelizeDetailModelItem } from '../../model/detail-model-item/detail-model-item.model';
import { SequelizeWorkDetail } from "../../model/work-detail/work-detail.model";
import { SequelizeDataType } from "../../model/data-type/data-type.model";
import { SequelizeWorkAttachment } from '../../model/work-attachment/work-attachment.model';

export class SequelizeRepository implements WorkRepository {
    async getWorks(cmp_uuid: string, wrk_dateFrom: Date | undefined, wrk_dateTo: Date | undefined, wrk_fullname: string | undefined, field_order: string | undefined, wrk_order: string | undefined): Promise<WorkEntity[] | null> {
        try {
            // Base del where
            const where: any = {
                cmp_uuid: cmp_uuid ?? null
            };

            // Condiciones opcionales para AND

            const andConditions: any[] = [];

            // Filtro por rango de fechas
            if (wrk_dateFrom || wrk_dateTo) {
                const dateCondition: any = {};
                if (wrk_dateFrom) dateCondition[Op.gte] = wrk_dateFrom;
                if (wrk_dateTo) dateCondition[Op.lte] = wrk_dateTo;
                andConditions.push({ wrk_workdate: dateCondition });
            }

            // Filtro por nombre (OR entre work y customer)
            if (wrk_fullname) {
                const search = `%${wrk_fullname.toLowerCase()}%`;
                andConditions.push({
                    [Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('SequelizeWork.wrk_customer')),
                        'LIKE',
                        search
                    ),
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('adr.cus.cus_fullname')),
                        'LIKE',
                        search
                    )
                    ]
                });
            }

            if (andConditions.length > 0) {
                where[Op.and] = andConditions;
            }

            const works = await SequelizeWork.findAll({ 
                where,
                include: [
                    {
                        as: 'adr',
                        model: SequelizeAddress,
                        include: [
                            { 
                                as: 'cus', 
                                model: SequelizeCustomer,
                                include: [
                                    { 
                                        as: 'rou', 
                                        model: SequelizeRoute
                                    }
                                ]
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
                        as: 'wrk_operator1',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator2',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator3',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator4',
                        model: SequelizeUser
                    },
                    {
                        as: 'mitm',
                        model: SequelizeModelItem
                    }
                ],
                order: [
                    [
                        Sequelize.col(field_order ? field_order : 'wrk_workdate'), 
                        wrk_order ? wrk_order : 'ASC'
                    ]
                ]
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
                                model: SequelizeCustomer,
                                include: [
                                    { 
                                        as: 'rou', 
                                        model: SequelizeRoute
                                    }
                                ]
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
                        as: 'wrk_operator1',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator2',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator3',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator4',
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
                    },
                    { 
                        as: "workAttachments",
                        model: SequelizeWorkAttachment
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
            let { cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid1, wrk_operator_uuid2, wrk_operator_uuid3, wrk_operator_uuid4, wrk_customer, wrk_address, wrk_coordinates, wrk_phone, wrk_route, twrk_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat } = work
            const result = await SequelizeWork.create({ cmp_uuid, wrk_uuid, adr_uuid, wrk_description, wrk_workdate, wrk_workdateinit, wrk_workdatefinish, wrks_uuid, wrk_user_uuid, wrk_operator_uuid1, wrk_operator_uuid2, wrk_operator_uuid3, wrk_operator_uuid4, wrk_customer, wrk_address, wrk_coordinates, wrk_phone, wrk_route, twrk_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, wrk_createdat, wrk_updatedat });
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
    async updateWork(cmp_uuid: string, wrk_uuid: string, work: WorkUpdateData): Promise<WorkEntity | null> {
        try {
            const [updatedCount, [updatedWork]] = await SequelizeWork.update(
                { 
                    wrk_description: work.wrk_description,
                    wrk_workdate: work.wrk_workdate,
                    wrk_workdateinit: work.wrk_workdateinit,
                    wrk_workdatefinish: work.wrk_workdatefinish,
                    wrks_uuid: work.wrks_uuid,
                    wrk_user_uuid: work.wrk_user_uuid,
                    wrk_operator_uuid1: work.wrk_operator_uuid1,
                    wrk_operator_uuid2: work.wrk_operator_uuid2,
                    wrk_operator_uuid3: work.wrk_operator_uuid3,
                    wrk_operator_uuid4: work.wrk_operator_uuid4,
                    wrk_customer: work.wrk_customer,
                    wrk_address: work.wrk_address,
                    wrk_coordinates: work.wrk_coordinates,
                    wrk_phone: work.wrk_phone,
                    wrk_route: work.wrk_route,
                    twrk_uuid: work.twrk_uuid,
                    itm_uuid: work.itm_uuid,
                    cmpitm_uuid: work.cmpitm_uuid,
                    mitm_uuid: work.mitm_uuid, 
                }, 
                { 
                    where: { cmp_uuid, wrk_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el work`);
            };
            return updatedWork.get({ plain: true }) as WorkEntity;
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
    async getPendingWorks(cmp_uuid: string, wrks_uuid: string | undefined, wrk_route: string | undefined, field_order: string | undefined, wrk_order: string | undefined): Promise<WorkEntity[] | null> {
        try {
            // Base del where
            const where: any = {
                cmp_uuid: cmp_uuid ?? null
            };

            // Condiciones opcionales para AND
            const andConditions: any[] = [];

            // Filtro por estado
            if (wrks_uuid) {
                andConditions.push({ wrks_uuid: wrks_uuid });
            }

            // Filtro por recorrido
            if (wrk_route) {
                andConditions.push({ wrk_route: wrk_route });
            }

            //TODO Add users

            if (andConditions.length > 0) {
                where[Op.and] = andConditions;
            }

            const works = await SequelizeWork.findAll({ 
                where,
                include: [
                    {
                        as: 'adr',
                        model: SequelizeAddress,
                        include: [
                            { 
                                as: 'cus', 
                                model: SequelizeCustomer,
                                include: [
                                    { 
                                        as: 'rou', 
                                        model: SequelizeRoute
                                    }
                                ]
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
                        as: 'wrk_operator1',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator2',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator3',
                        model: SequelizeUser
                    },
                    {
                        as: 'wrk_operator4',
                        model: SequelizeUser
                    },
                    {
                        as: 'mitm',
                        model: SequelizeModelItem
                    }
                ],
                order: [
                    [
                        Sequelize.col(field_order ? field_order : 'wrk_workdate'), 
                        wrk_order ? wrk_order : 'ASC'
                    ]
                ]
            });
            return works;
        } catch (error: any) {
            console.error('Error en getPendingWorks:', error.message);
            throw error;
        }
    }
    
}