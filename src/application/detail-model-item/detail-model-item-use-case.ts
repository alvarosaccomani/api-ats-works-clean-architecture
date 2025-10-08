import { DetailModelItemRepository } from "../../domain/detail-model-item/detail-model-item.repository";
import { DetailModelItemValue } from "../../domain/detail-model-item/detail-model-item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

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
            const detailModelItems = await this.detailModelItemRepository.getDetailModelItems(cmp_uuid);
            if(!detailModelItems) {
                throw new Error('No hay detail model items.');
            }
            return detailModelItems.map((detailModelItem) => ({
                cmp_uuid: detailModelItem.cmp_uuid,
                itm_uuid: detailModelItem.itm_uuid,
                cmpitm_uuid: detailModelItem.cmpitm_uuid,
                mitm_uuid: detailModelItem.mitm_uuid,
                dmitm_uuid: detailModelItem.dmitm_uuid,
                dmitm_key: detailModelItem.dmitm_key,
                dmitm_name: detailModelItem.dmitm_name,
                dmitm_description: detailModelItem.dmitm_description,
                dtp_uuid: detailModelItem.dtp_uuid,
                dmitm_arrayvalues: detailModelItem.dmitm_arrayvalues,
                dmitm_defaultvalue: detailModelItem.dmitm_defaultvalue,
                dmitm_order: detailModelItem.dmitm_order,
                dmitm_active: detailModelItem.dmitm_active,
                dmitm_createdat: TimezoneConverter.toIsoStringInTimezone(detailModelItem.dmitm_createdat, 'America/Argentina/Buenos_Aires'),
                dmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(detailModelItem.dmitm_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string) {
        try {
            const detailModelItems = await this.detailModelItemRepository.findDetailModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid);
            if(!detailModelItems) {
                throw new Error(`No hay detail model items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}, ${mitm_uuid}, ${dmitm_uuid}`);
            }
            return {
                cmp_uuid: detailModelItems.cmp_uuid,
                itm_uuid: detailModelItems.itm_uuid,
                cmpitm_uuid: detailModelItems.cmpitm_uuid,
                mitm_uuid: detailModelItems.mitm_uuid,
                dmitm_uuid: detailModelItems.dmitm_uuid,
                dmitm_key: detailModelItems.dmitm_key,
                dmitm_name: detailModelItems.dmitm_name,
                dmitm_description: detailModelItems.dmitm_description,
                dtp_uuid: detailModelItems.dtp_uuid,
                dmitm_arrayvalues: detailModelItems.dmitm_arrayvalues,
                dmitm_defaultvalue: detailModelItems.dmitm_defaultvalue,
                dmitm_order: detailModelItems.dmitm_order,
                dmitm_active: detailModelItems.dmitm_active,
                dmitm_createdat: TimezoneConverter.toIsoStringInTimezone(detailModelItems.dmitm_createdat, 'America/Argentina/Buenos_Aires'),
                dmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(detailModelItems.dmitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: detailModelItemsCreated.cmp_uuid,
                itm_uuid: detailModelItemsCreated.itm_uuid,
                cmpitm_uuid: detailModelItemsCreated.cmpitm_uuid,
                mitm_uuid: detailModelItemsCreated.mitm_uuid,
                dmitm_uuid: detailModelItemsCreated.dmitm_uuid,
                dmitm_key: detailModelItemsCreated.dmitm_key,
                dmitm_name: detailModelItemsCreated.dmitm_name,
                dmitm_description: detailModelItemsCreated.dmitm_description,
                dtp_uuid: detailModelItemsCreated.dtp_uuid,
                dmitm_arrayvalues: detailModelItemsCreated.dmitm_arrayvalues,
                dmitm_defaultvalue: detailModelItemsCreated.dmitm_defaultvalue,
                dmitm_order: detailModelItemsCreated.dmitm_order,
                dmitm_active: detailModelItemsCreated.dmitm_active,
                dmitm_createdat: TimezoneConverter.toIsoStringInTimezone(detailModelItemsCreated.dmitm_createdat, 'America/Argentina/Buenos_Aires'),
                dmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(detailModelItemsCreated.dmitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: detailModelItemsUpdated.cmp_uuid,
                itm_uuid: detailModelItemsUpdated.itm_uuid,
                cmpitm_uuid: detailModelItemsUpdated.cmpitm_uuid,
                mitm_uuid: detailModelItemsUpdated.mitm_uuid,
                dmitm_uuid: detailModelItemsUpdated.dmitm_uuid,
                dmitm_key: detailModelItemsUpdated.dmitm_key,
                dmitm_name: detailModelItemsUpdated.dmitm_name,
                dmitm_description: detailModelItemsUpdated.dmitm_description,
                dtp_uuid: detailModelItemsUpdated.dtp_uuid,
                dmitm_arrayvalues: detailModelItemsUpdated.dmitm_arrayvalues,
                dmitm_defaultvalue: detailModelItemsUpdated.dmitm_defaultvalue,
                dmitm_order: detailModelItemsUpdated.dmitm_order,
                dmitm_active: detailModelItemsUpdated.dmitm_active,
                dmitm_createdat: TimezoneConverter.toIsoStringInTimezone(detailModelItemsUpdated.dmitm_createdat, 'America/Argentina/Buenos_Aires'),
                dmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(detailModelItemsUpdated.dmitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
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
            return {
                cmp_uuid: detailModelItemsDeleted.cmp_uuid,
                itm_uuid: detailModelItemsDeleted.itm_uuid,
                cmpitm_uuid: detailModelItemsDeleted.cmpitm_uuid,
                mitm_uuid: detailModelItemsDeleted.mitm_uuid,
                dmitm_uuid: detailModelItemsDeleted.dmitm_uuid,
                dmitm_key: detailModelItemsDeleted.dmitm_key,
                dmitm_name: detailModelItemsDeleted.dmitm_name,
                dmitm_description: detailModelItemsDeleted.dmitm_description,
                dtp_uuid: detailModelItemsDeleted.dtp_uuid,
                dmitm_arrayvalues: detailModelItemsDeleted.dmitm_arrayvalues,
                dmitm_defaultvalue: detailModelItemsDeleted.dmitm_defaultvalue,
                dmitm_order: detailModelItemsDeleted.dmitm_order,
                dmitm_active: detailModelItemsDeleted.dmitm_active,
                dmitm_createdat: TimezoneConverter.toIsoStringInTimezone(detailModelItemsDeleted.dmitm_createdat, 'America/Argentina/Buenos_Aires'),
                dmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(detailModelItemsDeleted.dmitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
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