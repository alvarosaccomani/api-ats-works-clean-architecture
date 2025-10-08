import { ModelItemRepository } from "../../domain/model-item/model-item.repository";
import { ModelItemValue } from "../../domain/model-item/model-item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ModelItemUseCase {
    constructor(
        private readonly modelItemRepository: ModelItemRepository
    ) {
        this.getModelItems = this.getModelItems.bind(this);
        this.getDetailModelItem = this.getDetailModelItem.bind(this);
        this.createModelItem = this.createModelItem.bind(this);
        this.updateModelItem = this.updateModelItem.bind(this);
        this.deleteModelItem = this.deleteModelItem.bind(this);
    }

    public async getModelItems(cmp_uuid: string) {
        try {
            const modelItems = await this.modelItemRepository.getModelItems(cmp_uuid);
            if(!modelItems) {
                throw new Error('No hay model items.');
            }
            return modelItems.map((modelItem) => ({
                cmp_uuid: modelItem.cmp_uuid,
                itm_uuid: modelItem.itm_uuid,
                cmpitm_uuid: modelItem.cmpitm_uuid,
                mitm_uuid: modelItem.mitm_uuid,
                mitm_name: modelItem.mitm_name,
                mitm_description: modelItem.mitm_description,
                mitm_active: modelItem.mitm_active,
                mitm_createdat: TimezoneConverter.toIsoStringInTimezone(modelItem.mitm_createdat, 'America/Argentina/Buenos_Aires'),
                mitm_updatedat: TimezoneConverter.toIsoStringInTimezone(modelItem.mitm_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string) {
        try {
            const modelItems = await this.modelItemRepository.findModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid);
            if(!modelItems) {
                throw new Error(`No hay model items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}, ${mitm_uuid}`);
            }
            return {
                cmp_uuid: modelItems.cmp_uuid,
                itm_uuid: modelItems.itm_uuid,
                cmpitm_uuid: modelItems.cmpitm_uuid,
                mitm_uuid: modelItems.mitm_uuid,
                mitm_name: modelItems.mitm_name,
                mitm_description: modelItems.mitm_description,
                mitm_active: modelItems.mitm_active,
                mitm_createdat: TimezoneConverter.toIsoStringInTimezone(modelItems.mitm_createdat, 'America/Argentina/Buenos_Aires'),
                mitm_updatedat: TimezoneConverter.toIsoStringInTimezone(modelItems.mitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createModelItem({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, mitm_name, mitm_description,	mitm_active, mitm_createdat, mitm_updatedat } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, mitm_name: string, mitm_description: string, mitm_active: boolean, mitm_createdat: Date, mitm_updatedat: Date }) {
        try {
            const modelItemsValue = new ModelItemValue({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, mitm_name, mitm_description,	mitm_active, mitm_createdat, mitm_updatedat });
            const modelItemsCreated = await this.modelItemRepository.createModelItem(modelItemsValue);
            if(!modelItemsCreated) {
                throw new Error(`No se pudo insertar el model item.`);
            }
            return {
                cmp_uuid: modelItemsCreated.cmp_uuid,
                itm_uuid: modelItemsCreated.itm_uuid,
                cmpitm_uuid: modelItemsCreated.cmpitm_uuid,
                mitm_uuid: modelItemsCreated.mitm_uuid,
                mitm_name: modelItemsCreated.mitm_name,
                mitm_description: modelItemsCreated.mitm_description,
                mitm_active: modelItemsCreated.mitm_active,
                mitm_createdat: TimezoneConverter.toIsoStringInTimezone(modelItemsCreated.mitm_createdat, 'America/Argentina/Buenos_Aires'),
                mitm_updatedat: TimezoneConverter.toIsoStringInTimezone(modelItemsCreated.mitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, { mitm_name, mitm_description,	mitm_active, mitm_createdat, mitm_updatedat } : { cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, mitm_name: string, mitm_description: string,	mitm_active: boolean, mitm_createdat: Date, mitm_updatedat: Date }) {
        try {
            const modelItemsUpdated = await this.modelItemRepository.updateModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, mitm_name, mitm_description,	mitm_active, mitm_createdat, mitm_updatedat });
            if(!modelItemsUpdated) {
                throw new Error(`No se pudo actualizar el model item.`);
            }
            return {
                cmp_uuid: modelItemsUpdated.cmp_uuid,
                itm_uuid: modelItemsUpdated.itm_uuid,
                cmpitm_uuid: modelItemsUpdated.cmpitm_uuid,
                mitm_uuid: modelItemsUpdated.mitm_uuid,
                mitm_name: modelItemsUpdated.mitm_name,
                mitm_description: modelItemsUpdated.mitm_description,
                mitm_active: modelItemsUpdated.mitm_active,
                mitm_createdat: TimezoneConverter.toIsoStringInTimezone(modelItemsUpdated.mitm_createdat, 'America/Argentina/Buenos_Aires'),
                mitm_updatedat: TimezoneConverter.toIsoStringInTimezone(modelItemsUpdated.mitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string) {
        try {
            const modelItemsDeleted = await this.modelItemRepository.deleteModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid);
            if(!modelItemsDeleted) {
                throw new Error(`No se pudo eliminar el model item.`);
            }
            return {
                cmp_uuid: modelItemsDeleted.cmp_uuid,
                itm_uuid: modelItemsDeleted.itm_uuid,
                cmpitm_uuid: modelItemsDeleted.cmpitm_uuid,
                mitm_uuid: modelItemsDeleted.mitm_uuid,
                mitm_name: modelItemsDeleted.mitm_name,
                mitm_description: modelItemsDeleted.mitm_description,
                mitm_active: modelItemsDeleted.mitm_active,
                mitm_createdat: TimezoneConverter.toIsoStringInTimezone(modelItemsDeleted.mitm_createdat, 'America/Argentina/Buenos_Aires'),
                mitm_updatedat: TimezoneConverter.toIsoStringInTimezone(modelItemsDeleted.mitm_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string) {
        try {
            const modelItem = this.modelItemRepository.existModelItem(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid);
            return modelItem;
        } catch (error: any) {
            console.error('Error en existModelItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}