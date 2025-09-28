import { DashboardEntity } from "../../../domain/dashboard/dashboard.entity";
import { DashboardRepository } from "../../../domain/dashboard/dashboard.repository";
import { SequelizeCompany } from "../../model/company/company.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeItem } from "../../model/item/item.model";
import { SequelizeModelItem } from "../../model/model-item/model-item.model";
import { SequelizeWork } from "../../model/work/work.model";
import { SequelizeCustomer } from "../../model/customer/customer.model";

export class SequelizeRepository implements DashboardRepository {
    async getDashboards(cmp_uuid: string): Promise<DashboardEntity | null> {
        try {
            
            let dashboard: DashboardEntity;
            if(!cmp_uuid) {
                dashboard = {
                    cmp_uuid: cmp_uuid,
                    companiesCount: (await SequelizeCompany.count()).toString(),
                    usersCount: (await SequelizeUser.count()).toString(),
                    itemsCount: (await SequelizeItem.count()).toString(),
                    modelsItemsCount: (await SequelizeModelItem.count()).toString(),
                    worksCount: (await SequelizeWork.count()).toString(),
                    customersCount: (await SequelizeCustomer.count()).toString()
                }
            } else {
                dashboard = {
                    cmp_uuid: cmp_uuid,
                    companiesCount: (await SequelizeCompany.count({
                                        where: {
                                            cmp_uuid: cmp_uuid
                                        }
                                    })).toString(),
                    usersCount: (await SequelizeUser.count()).toString(),
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
                                            cmp_uuid: cmp_uuid
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
}