import { CompanyItemRepository } from "../../domain/company-item/company-item.repository";
import { CompanyItemValue } from "../../domain/company-item/company-item.value";

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
            const companyItems = this.companyItemRepository.getCompanyItems(cmp_uuid);
            if(!companyItems) {
                throw new Error('No hay companies.');
            }
            return companyItems;
        } catch (error: any) {
            console.error('Error en getCompanyItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string) {
        try {
            const companyItems = this.companyItemRepository.findCompanyItemById(cmp_uuid, itm_uuid, cmpitm_uuid);
            if(!companyItems) {
                throw new Error(`No hay company items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}`);
            }
            return companyItems;
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
            return companyItemsCreated;
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
            return companyItemsUpdated;
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
            return companyItemsDeleted;
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