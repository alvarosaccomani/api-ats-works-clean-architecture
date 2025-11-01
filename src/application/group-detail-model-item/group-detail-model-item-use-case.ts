import { GroupDetailModelItemRepository } from "../../domain/group-detail-model-item/group-detail-model-item.repository";
import { GroupDetailModelItemValue } from "../../domain/group-detail-model-item/group-detail-model-item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class GroupDetailModelItemUseCase {
    constructor(
        private readonly groupDetailModelItemRepository: GroupDetailModelItemRepository
    ) {
        this.getGroupDetailModelItems = this.getGroupDetailModelItems.bind(this);
        this.getDetailGroupDetailModelItem = this.getDetailGroupDetailModelItem.bind(this);
        this.createGroupDetailModelItem = this.createGroupDetailModelItem.bind(this);
        this.updateGroupDetailModelItem = this.updateGroupDetailModelItem.bind(this);
        this.deleteGroupDetailModelItem = this.deleteGroupDetailModelItem.bind(this);
    }

    public async getGroupDetailModelItems(cmp_uuid: string) {
        try {
            const groupDetailModelItems = await this.groupDetailModelItemRepository.getGroupDetailModelItems(cmp_uuid);
            if(!groupDetailModelItems) {
                throw new Error('No hay detail model items.');
            }
            return groupDetailModelItems.map((groupDetailModelItem) => ({
                cmp_uuid: groupDetailModelItem.cmp_uuid,
                itm_uuid: groupDetailModelItem.itm_uuid,
                cmpitm_uuid: groupDetailModelItem.cmpitm_uuid,
                mitm_uuid: groupDetailModelItem.mitm_uuid,
                gdmitm_uuid: groupDetailModelItem.gdmitm_uuid,
                gdmitm_key: groupDetailModelItem.gdmitm_key,
                gdmitm_name: groupDetailModelItem.gdmitm_name,
                gdmitm_description: groupDetailModelItem.gdmitm_description,
                gdmitm_order: groupDetailModelItem.gdmitm_order,
                gdmitm_active: groupDetailModelItem.gdmitm_active,
                gdmitm_createdat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItem.gdmitm_createdat, 'America/Argentina/Buenos_Aires'),
                gdmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItem.gdmitm_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getGroupDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string) {
        try {
            const groupDetailModelItems = await this.groupDetailModelItemRepository.findGroupDetailModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid);
            if(!groupDetailModelItems) {
                throw new Error(`No hay detail model items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}, ${mitm_uuid}, ${gdmitm_uuid}`);
            }
            return {
                cmp_uuid: groupDetailModelItems.cmp_uuid,
                itm_uuid: groupDetailModelItems.itm_uuid,
                cmpitm_uuid: groupDetailModelItems.cmpitm_uuid,
                mitm_uuid: groupDetailModelItems.mitm_uuid,
                gdmitm_uuid: groupDetailModelItems.gdmitm_uuid,
                gdmitm_key: groupDetailModelItems.gdmitm_key,
                gdmitm_name: groupDetailModelItems.gdmitm_name,
                gdmitm_description: groupDetailModelItems.gdmitm_description,
                gdmitm_order: groupDetailModelItems.gdmitm_order,
                gdmitm_active: groupDetailModelItems.gdmitm_active,
                gdmitm_createdat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItems.gdmitm_createdat, 'America/Argentina/Buenos_Aires'),
                gdmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItems.gdmitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailGroupDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createGroupDetailModelItem({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid, gdmitm_key, gdmitm_name, gdmitm_description, gdmitm_order, gdmitm_active } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string, gdmitm_uuid: string, gdmitm_key: string, gdmitm_name: string, gdmitm_description: string, gdmitm_order: number, gdmitm_active: boolean }) {
        try {
            const groupDetailModelItemsValue = new GroupDetailModelItemValue({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid, gdmitm_key, gdmitm_name, gdmitm_description, gdmitm_order, gdmitm_active });
            const groupDetailModelItemsCreated = await this.groupDetailModelItemRepository.createGroupDetailModelItem(groupDetailModelItemsValue);
            if(!groupDetailModelItemsCreated) {
                throw new Error(`No se pudo insertar el detail model item.`);
            }
            return {
                cmp_uuid: groupDetailModelItemsCreated.cmp_uuid,
                itm_uuid: groupDetailModelItemsCreated.itm_uuid,
                cmpitm_uuid: groupDetailModelItemsCreated.cmpitm_uuid,
                mitm_uuid: groupDetailModelItemsCreated.mitm_uuid,
                gdmitm_uuid: groupDetailModelItemsCreated.gdmitm_uuid,
                gdmitm_key: groupDetailModelItemsCreated.gdmitm_key,
                gdmitm_name: groupDetailModelItemsCreated.gdmitm_name,
                gdmitm_description: groupDetailModelItemsCreated.gdmitm_description,
                gdmitm_order: groupDetailModelItemsCreated.gdmitm_order,
                gdmitm_active: groupDetailModelItemsCreated.gdmitm_active,
                gdmitm_createdat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItemsCreated.gdmitm_createdat, 'America/Argentina/Buenos_Aires'),
                gdmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItemsCreated.gdmitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createGroupDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string, { gdmitm_key, gdmitm_name, gdmitm_description, gdmitm_order, gdmitm_active } : { gdmitm_key: string, gdmitm_name: string, gdmitm_description: string, gdmitm_order: number, gdmitm_active: boolean }) {
        try {
            const groupDetailModelItemsUpdated = await this.groupDetailModelItemRepository.updateGroupDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid, { gdmitm_key, gdmitm_name, gdmitm_description, gdmitm_order, gdmitm_active });
            if(!groupDetailModelItemsUpdated) {
                throw new Error(`No se pudo actualizar el detail model item.`);
            }
            return {
                cmp_uuid: groupDetailModelItemsUpdated.cmp_uuid,
                itm_uuid: groupDetailModelItemsUpdated.itm_uuid,
                cmpitm_uuid: groupDetailModelItemsUpdated.cmpitm_uuid,
                mitm_uuid: groupDetailModelItemsUpdated.mitm_uuid,
                gdmitm_uuid: groupDetailModelItemsUpdated.gdmitm_uuid,
                gdmitm_key: groupDetailModelItemsUpdated.gdmitm_key,
                gdmitm_name: groupDetailModelItemsUpdated.gdmitm_name,
                gdmitm_description: groupDetailModelItemsUpdated.gdmitm_description,
                gdmitm_order: groupDetailModelItemsUpdated.gdmitm_order,
                gdmitm_active: groupDetailModelItemsUpdated.gdmitm_active,
                gdmitm_createdat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItemsUpdated.gdmitm_createdat, 'America/Argentina/Buenos_Aires'),
                gdmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItemsUpdated.gdmitm_updatedat, 'America/Argentina/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en updateGroupDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string) {
        try {
            const groupDetailModelItemsDeleted = await this.groupDetailModelItemRepository.deleteGroupDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid);
            if(!groupDetailModelItemsDeleted) {
                throw new Error(`No se pudo eliminar el detail model item.`);
            }
            return {
                cmp_uuid: groupDetailModelItemsDeleted.cmp_uuid,
                itm_uuid: groupDetailModelItemsDeleted.itm_uuid,
                cmpitm_uuid: groupDetailModelItemsDeleted.cmpitm_uuid,
                mitm_uuid: groupDetailModelItemsDeleted.mitm_uuid,
                gdmitm_uuid: groupDetailModelItemsDeleted.gdmitm_uuid,
                gdmitm_key: groupDetailModelItemsDeleted.gdmitm_key,
                gdmitm_name: groupDetailModelItemsDeleted.gdmitm_name,
                gdmitm_description: groupDetailModelItemsDeleted.gdmitm_description,
                gdmitm_order: groupDetailModelItemsDeleted.gdmitm_order,
                gdmitm_active: groupDetailModelItemsDeleted.gdmitm_active,
                gdmitm_createdat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItemsDeleted.gdmitm_createdat, 'America/Argentina/Buenos_Aires'),
                gdmitm_updatedat: TimezoneConverter.toIsoStringInTimezone(groupDetailModelItemsDeleted.gdmitm_updatedat, 'America/Argentina/Buenos_Aires'),
            };
        } catch (error: any) {
            console.error('Error en deleteGroupDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string) {
        try {
            const groupDetailModelItem = this.groupDetailModelItemRepository.existGroupDetailModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid);
            return groupDetailModelItem;
        } catch (error: any) {
            console.error('Error en existGroupDetailModelItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}