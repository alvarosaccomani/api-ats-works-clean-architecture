import { DashboardEntity } from "../../../domain/dashboard/dashboard.entity";
import { DashboardRepository } from "../../../domain/dashboard/dashboard.repository";
import { SequelizeCompany } from "../../model/company/company.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeItem } from "../../model/item/item.model";
import { SequelizeModelItem } from "../../model/model-item/model-item.model";
import { SequelizeWork } from "../../model/work/work.model";
import { SequelizeCustomer } from "../../model/customer/customer.model";
import { SequelizeWorkState } from "../../model/work-state/work-state.model";
import { SequelizeWorkHistory } from "../../model/work-history/work-history.model";
import { SequelizeWorkDetail } from "../../model/work-detail/work-detail.model";
import { SequelizeMetricType } from "../../model/metric-type/metric-type.model";
import { Op } from "sequelize";

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

            // 2. Actividad Reciente (historial de trabajos)
            const history = await SequelizeWorkHistory.findAll({
                where: cmp_uuid ? { cmp_uuid } : {},
                limit: 10,
                order: [['wrkh_createdat', 'DESC']],
                include: [
                    {
                        model: SequelizeWork,
                        as: 'wrk',
                        attributes: ['wrk_description', 'wrk_customer']
                    },
                    {
                        model: SequelizeWorkState,
                        as: 'wrks',
                        attributes: ['wrks_name', 'wrks_bkcolor', 'wrks_frcolor']
                    },
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_name', 'usr_surname', 'usr_nick']
                    }
                ]
            });

            const recentActivity = history.map((h: any) => ({
                uuid: h.wrkh_uuid,
                workUuid: h.wrk_uuid,
                workDescription: h.wrk?.wrk_description || 'Trabajo sin descripción',
                workCustomer: h.wrk?.wrk_customer || 'Sin cliente',
                stateName: h.wrks?.wrks_name || 'Sin Estado',
                stateBgColor: h.wrks?.wrks_bkcolor || '#ccc',
                stateFrColor: h.wrks?.wrks_frcolor || '#333',
                userFullName: (h.usr?.usr_name || h.usr?.usr_surname)
                    ? `${h.usr.usr_name || ''} ${h.usr.usr_surname || ''}`.trim()
                    : h.usr?.usr_nick || 'Sistema',
                comment: h.wrkh_comment || '',
                createdAt: h.wrkh_createdat
            }));

            // 3. Métricas dinámicas agrupadas
            const details: any = await SequelizeWorkDetail.findAll({
                where: {
                    cmp_uuid: cmp_uuid,
                    wrkd_isdashboard: true,
                    wrkd_metrictype: { [Op.ne]: null as any }
                } as any,
                include: [
                    {
                        model: SequelizeMetricType,
                        as: 'mety',
                        attributes: ['mety_cod', 'mety_name']
                    }
                ]
            });

            const metricsGroups: { [key: string]: { name: string, code: string, values: number[] } } = {};

            for (const detail of details) {
                const metyCod = (detail as any).mety?.mety_cod;
                if (!metyCod) continue;

                const key = detail.wrkd_key || 'key';
                const valueNum = parseFloat(detail.wrkd_value || '0');
                if (isNaN(valueNum)) continue;

                if (!metricsGroups[key]) {
                    metricsGroups[key] = {
                        name: detail.wrkd_name || key,
                        code: metyCod,
                        values: []
                    };
                }
                metricsGroups[key].values.push(valueNum);
            }

            const dynamicMetrics = Object.keys(metricsGroups).map(key => {
                const group = metricsGroups[key];
                let value = 0;
                if (group.values.length > 0) {
                    if (group.code === 'SUM') {
                        value = group.values.reduce((acc, v) => acc + v, 0);
                    } else if (group.code === 'AVG') {
                        const sum = group.values.reduce((acc, v) => acc + v, 0);
                        value = parseFloat((sum / group.values.length).toFixed(2));
                    } else if (group.code === 'COUNT') {
                        value = group.values.length;
                    } else if (group.code === 'MIN') {
                        value = Math.min(...group.values);
                    } else if (group.code === 'MAX') {
                        value = Math.max(...group.values);
                    }
                }
                return {
                    key,
                    name: group.name,
                    metricCode: group.code,
                    value
                };
            });

            return {
                workStates,
                workTrends,
                recentActivity,
                dynamicMetrics
            };
        } catch (error: any) {
            console.error('Error en getDashboardAnalytics:', error.message);
            throw error;
        }
    }
}