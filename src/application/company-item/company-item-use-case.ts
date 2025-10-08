import { CompanyItemRepository } from "../../domain/company-item/company-item.repository";
import { CompanyItemValue } from "../../domain/company-item/company-item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CompanyItemUseCase {
    constructor(
        private readonly companyItemRepository: CompanyItemRepository
    ) {
        this.getCompanyItems = this.getCompanyItems.bind(this);
        this.getDetailCompanyItem = this.getDetailCompanyItem.bind(this);
        this.createCompanyItem = this.createCompanyItem.bind(this);
        this.updateCompanyItem = this.updateCompanyItem.bind(this);
        this.deleteCompanyItem = this.deleteCompanyItem.bind(this);
    }

    public async getCompanyItems(cmp_uuid: string) {
        try {
            const companyItems = await this.companyItemRepository.getCompanyItems(cmp_uuid);
            if(!companyItems) {
                throw new Error('No hay companies.');
            }
            return companyItems.map((companyItem) => ({
                cmp_uuid: companyItem.cmp_uuid,
                itm_uuid: companyItem.itm_uuid,
                itm: companyItem.itm,
                cmpitm_uuid: companyItem.cmpitm_uuid,
                cmpitm_createdat: TimezoneConverter.toIsoStringInTimezone(companyItem.cmpitm_createdat, 'America/Buenos_Aires'),
                cmpitm_updatedat: TimezoneConverter.toIsoStringInTimezone(companyItem.cmpitm_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCompanyItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string) {
        try {
            const companyItem = await this.companyItemRepository.findCompanyItemById(cmp_uuid, itm_uuid, cmpitm_uuid);
            if(!companyItem) {
                throw new Error(`No hay company items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}`);
            }
            return {
                cmp_uuid: companyItem.cmp_uuid,
                itm_uuid: companyItem.itm_uuid,
                itm: companyItem.itm,
                cmpitm_uuid: companyItem.cmpitm_uuid,
                cmpitm_createdat: TimezoneConverter.toIsoStringInTimezone(companyItem.cmpitm_createdat, 'America/Buenos_Aires'),
                cmpitm_updatedat: TimezoneConverter.toIsoStringInTimezone(companyItem.cmpitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCompanyItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCompanyItem({ cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, cmpitm_createdat: Date, cmpitm_updatedat: Date }) {
        try {
            const companyItemsValue = new CompanyItemValue({ cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat });
            const companyItemsCreated = await this.companyItemRepository.createCompanyItem(companyItemsValue);
            if(!companyItemsCreated) {
                throw new Error(`No se pudo insertar el company item.`);
            }
            return {
                cmp_uuid: companyItemsCreated.cmp_uuid,
                itm_uuid: companyItemsCreated.itm_uuid,
                cmpitm_uuid: companyItemsCreated.cmpitm_uuid,
                cmpitm_createdat: TimezoneConverter.toIsoStringInTimezone(companyItemsCreated.cmpitm_createdat, 'America/Buenos_Aires'),
                cmpitm_updatedat: TimezoneConverter.toIsoStringInTimezone(companyItemsCreated.cmpitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCompanyItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, { cmpitm_createdat, cmpitm_updatedat } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, cmpitm_createdat: Date, cmpitm_updatedat: Date }) {
        try {
            const companyItemsUpdated = await this.companyItemRepository.updateCompanyItem(cmp_uuid, itm_uuid, cmpitm_uuid, { cmp_uuid, itm_uuid, cmpitm_uuid, cmpitm_createdat, cmpitm_updatedat });
            if(!companyItemsUpdated) {
                throw new Error(`No se pudo actualizar el company item.`);
            }
            return {
                cmp_uuid: companyItemsUpdated.cmp_uuid,
                itm_uuid: companyItemsUpdated.itm_uuid,
                cmpitm_uuid: companyItemsUpdated.cmpitm_uuid,
                cmpitm_createdat: TimezoneConverter.toIsoStringInTimezone(companyItemsUpdated.cmpitm_createdat, 'America/Buenos_Aires'),
                cmpitm_updatedat: TimezoneConverter.toIsoStringInTimezone(companyItemsUpdated.cmpitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCompanyItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string) {
        try {
            const companyItemsDeleted = await this.companyItemRepository.deleteCompanyItem(cmp_uuid, itm_uuid, cmpitm_uuid);
            if(!companyItemsDeleted) {
                throw new Error(`No se pudo eliminar el company item.`);
            }
            return {
                cmp_uuid: companyItemsDeleted.cmp_uuid,
                itm_uuid: companyItemsDeleted.itm_uuid,
                cmpitm_uuid: companyItemsDeleted.cmpitm_uuid,
                cmpitm_createdat: TimezoneConverter.toIsoStringInTimezone(companyItemsDeleted.cmpitm_createdat, 'America/Buenos_Aires'),
                cmpitm_updatedat: TimezoneConverter.toIsoStringInTimezone(companyItemsDeleted.cmpitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteCompanyItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existCompanyItem(cmp_uuid: string, itm_uuid: string) {
        try {
            const companyItem = this.companyItemRepository.existCompanyItem(cmp_uuid, itm_uuid);
            return companyItem;
        } catch (error: any) {
            console.error('Error en existCompanyItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}