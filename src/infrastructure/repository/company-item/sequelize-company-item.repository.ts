import { CompanyItemEntity } from "../../../domain/company-item/company-item.entity";
import { CompanyItemRepository } from "../../../domain/company-item/company-item.repository";
import { SequelizeCompanyItem } from "../../model/company-item/company-item.model";
import { SequelizeItem } from "../../model/item/item.model";

export class SequelizeRepository implements CompanyItemRepository {
    async getCompanyItems(cmp_uuid: string): Promise<CompanyItemEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                },
                include: [
                    { as: 'itm', model: SequelizeItem }
                ]
            }
            const companyItems = await SequelizeCompanyItem.findAll(config);
            if(!companyItems) {
                throw new Error(`No hay company items`)
            };
            return companyItems;
        } catch (error: any) {
            console.error('Error en getCompanyItems:', error.message);
            throw error;
        }
    }
    async findCompanyItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string): Promise<CompanyItemEntity | null> {
        try {
            const companyItem = await SequelizeCompanyItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null
                } 
            });
            if(!companyItem) {
                throw new Error(`No hay company item con el Id: ${cmp_uuid}`);
            };
            return companyItem.dataValues;
        } catch (error: any) {
            console.error('Error en findCompanyItemById:', error.message);
            throw error;
        }
    }
    async createCompanyItem(companyItem: CompanyItemEntity): Promise<CompanyItemEntity | null> {
        try {
            let { cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat } = companyItem
            const result = await SequelizeCompanyItem.create({ cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el company item`);
            }
            let newCompanyItem = result.dataValues as SequelizeCompanyItem
            return newCompanyItem;
        } catch (error: any) {
            console.error('Error en createCompanyItem:', error.message);
            throw error;
        }
    }
    async updateCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, companyItem: CompanyItemEntity): Promise<CompanyItemEntity | null> {
        try {
            let { cmpitm_createdat, cmpitm_updatedat } = companyItem
            const result = await SequelizeCompanyItem.update({ cmpitm_createdat, cmpitm_updatedat }, { where: { cmp_uuid, itm_uuid, cmpitm_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el companyitem`);
            };
            return companyItem;
        } catch (error: any) {
            console.error('Error en updateCompanyItem:', error.message);
            throw error;
        }
    }
    async deleteCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string): Promise<CompanyItemEntity | null> {
        try {
            const companyItem = await this.findCompanyItemById(cmp_uuid, itm_uuid, cmpitm_uuid);
            const result = await SequelizeCompanyItem.destroy({ where: { cmp_uuid, itm_uuid, cmpitm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el companyitem`);
            };
            return companyItem;
        } catch (error: any) {
            console.error('Error en deleteCompanyItem:', error.message);
            throw error;
        }
    }
    async existCompanyItem(cmp_uuid: string, itm_uuid: string): Promise<CompanyItemEntity | null> {
        try {
            const companyItem = await SequelizeCompanyItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null
                } 
            });
            return companyItem;
        } catch (error: any) {
            console.error('Error en deleteCompanyItem:', error.message);
            throw error;
        }
    }
    
}