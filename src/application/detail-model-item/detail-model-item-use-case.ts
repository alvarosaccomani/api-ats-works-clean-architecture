import { DetailModelItemRepository } from "../../domain/detail-model-item/detail-model-item.repository";
import { DetailModelItemValue } from "../../domain/detail-model-item/detail-model-item.value";

export class DetailModelItemUseCase {
    constructor(
        private readonly detailModelItemRepository: DetailModelItemRepository
    ) {
        this.getDetailModelItems = this.getDetailModelItems.bind(this);
        this.getDetailDetailModelItem = this.getDetailDetailModelItem.bind(this);
        this.createDetailModelItem = this.createDetailModelItem.bind(this);
        this.updateDetailModelItem = this.updateDetailModelItem.bind(this);
        this.deleteDetailModelItem = this.deleteDetailModelItem.bind(this);
    }

    public async getDetailModelItems(cmp_uuid: string) {
        try {
            const detailModelItems = this.detailModelItemRepository.getDetailModelItems(cmp_uuid);
            if(!detailModelItems) {
                throw new Error('No hay detail model items.');
            }
            return detailModelItems;
        } catch (error: any) {
            console.error('Error en getDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string) {
        try {
            const detailModelItems = this.detailModelItemRepository.findDetailModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid);
            if(!detailModelItems) {
                throw new Error(`No hay detail model items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}, ${mitm_uuid}, ${dmitm_uuid}`);
            }
            return detailModelItems;
        } catch (error: any) {
            console.error('Error en getDetailDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createDetailModelItem({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid, dmitm_key,	dmitm_name, dmitm_description, dtp_uuid, dmitm_arrayvalues, dmitm_defaultvalue, dmitm_order, dmitm_active, dmitm_createdat, dmitm_updatedat } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string, dmitm_key: string, dmitm_name: string, dmitm_description: string, dtp_uuid: string, dmitm_arrayvalues: string, dmitm_defaultvalue: string, dmitm_order: number, dmitm_active: boolean, dmitm_createdat: Date, dmitm_updatedat: Date }) {
        try {
            const detailModelItemsValue = new DetailModelItemValue({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid, dmitm_key,	dmitm_name, dmitm_description, dtp_uuid, dmitm_arrayvalues, dmitm_defaultvalue, dmitm_order, dmitm_active, dmitm_createdat, dmitm_updatedat });
            const detailModelItemsCreated = await this.detailModelItemRepository.createDetailModelItem(detailModelItemsValue);
            if(!detailModelItemsCreated) {
                throw new Error(`No se pudo insertar el detail model item.`);
            }
            return detailModelItemsCreated;
        } catch (error: any) {
            console.error('Error en createDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string, { dmitm_key, dmitm_name, dmitm_description, dtp_uuid, dmitm_arrayvalues, dmitm_defaultvalue, dmitm_order, dmitm_active, dmitm_createdat, dmitm_updatedat } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string, dmitm_key: string, dmitm_name: string, dmitm_description: string, dtp_uuid: string, dmitm_arrayvalues: string, dmitm_defaultvalue: string, dmitm_order: number, dmitm_active: boolean, dmitm_createdat: Date, dmitm_updatedat: Date }) {
        try {
            const detailModelItemsUpdated = await this.detailModelItemRepository.updateDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid, { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid, dmitm_key, dmitm_name, dmitm_description, dtp_uuid, dmitm_arrayvalues, dmitm_defaultvalue, dmitm_order, dmitm_active, dmitm_createdat, dmitm_updatedat });
            if(!detailModelItemsUpdated) {
                throw new Error(`No se pudo actualizar el detail model item.`);
            }
            return detailModelItemsUpdated;
        } catch (error: any) {
            console.error('Error en updateDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string) {
        try {
            const detailModelItemsDeleted = await this.detailModelItemRepository.deleteDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid);
            if(!detailModelItemsDeleted) {
                throw new Error(`No se pudo eliminar el detail model item.`);
            }
            return detailModelItemsDeleted;
        } catch (error: any) {
            console.error('Error en deleteDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string) {
        try {
            const detailModelItem = this.detailModelItemRepository.existDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid);
            return detailModelItem;
        } catch (error: any) {
            console.error('Error en existDetailModelItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}