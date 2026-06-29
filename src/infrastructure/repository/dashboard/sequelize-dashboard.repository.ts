import { DashboardEntity } from "../../../domain/dashboard/dashboard.entity";
import { DashboardRepository } from "../../../domain/dashboard/dashboard.repository";
import { SequelizeCompany } from "../../model/company/company.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeItem } from "../../model/item/item.model";
import { SequelizeModelItem } from "../../model/model-item/model-item.model";
import { SequelizeWork } from "../../model/work/work.model";
import { SequelizeCustomer } from "../../model/customer/customer.model";
import { SequelizeWorkState } from "../../model/work-state/work-state.model";

export class SequelizeRepository implements DashboardRepository {
    async getDashboards(cmp_uuid: string): Promise<DashboardEntity | null> {
        try {
            
            let dashboard: DashboardEntity;
            if(!cmp_uuid) {
                dashboard = {
                    cmp_uuid: cmp_uuid,
                    companiesCount: (await SequelizeCompany.count()).toString(),
                    usersCount: (await SequelizeUser.count({
                                        where: {
                                            usr_sysadmin: false
                                        }
                                    })).toString(),
                    itemsCount: (await SequelizeItem.count()).toString(),
                    modelsItemsCount: (await SequelizeModelItem.count()).toString(),
                    worksCount: (await SequelizeWork.count()).toString(),
                    customersCount: (await SequelizeCustomer.count({
                                        where: {
                                            cus_active: true
                                        }
                                    })).toString()
                }
            } else {
                dashboard = {
                    cmp_uuid: cmp_uuid,
                    companiesCount: (await SequelizeCompany.count({
                                        where: {
                                            cmp_uuid: cmp_uuid
                                        }
                                    })).toString(),
                    usersCount: (await SequelizeUser.count({
                                        where: {
                                            usr_sysadmin: false
                                        }
                                    })).toString(),
                    itemsCount: (await SequelizeItem.count()).toString(),
                    modelsItemsCount: (await SequelizeModelItem.count({
                                        where: {
                                            cmp_uuid: cmp_uuid
                                        }
                                    })).toString(),
                    worksCount: (await SequelizeWork.count({
                                        where: {
                                            cmp_uuid: cmp_uuid
                                        }
                                    })).toString(),
                    customersCount: (await SequelizeCustomer.count({
                                        where: {
                                            cmp_uuid: cmp_uuid,
                                            cus_active: true
                                        }
                                    })).toString()
                }
            }

            return dashboard;
        } catch (error: any) {
            console.error('Error en getCompanies:', error.message);
            throw error;
        }
    }

    async getDashboardAnalytics(cmp_uuid: string): Promise<any> {
        try {
            // 1. Trabajos por estado
            const works = await SequelizeWork.findAll({
                where: cmp_uuid ? { cmp_uuid } : {},
                include: [{
                    model: SequelizeWorkState,
                    as: 'wrks',
                    attributes: ['wrks_name']
                }]
            });

            const statesMap: { [key: string]: number } = {};
            const trendsMap: { [key: string]: number } = {};

            // Inicializar las últimas 15 fechas en formato YYYY-MM-DD
            for (let i = 14; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                const dateStr = `${yyyy}-${mm}-${dd}`;
                trendsMap[dateStr] = 0;
            }

            for (const work of works) {
                // Estado
                const stateName = (work as any).wrks?.wrks_name || 'Sin Estado';
                statesMap[stateName] = (statesMap[stateName] || 0) + 1;

                // Tendencias (últimos 15 días)
                if (work.wrk_createdat) {
                    const date = new Date(work.wrk_createdat);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    const createdDate = `${yyyy}-${mm}-${dd}`;
                    if (trendsMap[createdDate] !== undefined) {
                        trendsMap[createdDate]++;
                    }
                }
            }

            const workStates = Object.keys(statesMap).map(name => ({
                name,
                value: statesMap[name]
            }));

            const workTrends = Object.keys(trendsMap).map(date => ({
                date,
                count: trendsMap[date]
            }));

            return {
                workStates,
                workTrends
            };
        } catch (error: any) {
            console.error('Error en getDashboardAnalytics:', error.message);
            throw error;
        }
    }
}