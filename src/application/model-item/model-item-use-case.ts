import { ModelItemRepository } from "../../domain/model-item/model-item.repository";
import { ModelItemValue } from "../../domain/model-item/model-item.value";

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

    public async getModelItems() {
        try {
            const modelItems = this.modelItemRepository.getModelItems();
            if(!modelItems) {
                throw new Error('No hay model items.');
            }
            return modelItems;
        } catch (error: any) {
            console.error('Error en getModelItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string) {
        try {
            const modelItems = this.modelItemRepository.findModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid);
            if(!modelItems) {
                throw new Error(`No hay model items con el Id: ${cmp_uuid}, ${itm_uuid}, ${cmpitm_uuid}, ${mitm_uuid}`);
            }
            return modelItems;
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
            return modelItemsCreated;
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
            return modelItemsUpdated;
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
            return modelItemsDeleted;
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