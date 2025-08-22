import { ItemRepository } from "../../domain/item/item.repository";
import { ItemValue } from "../../domain/item/item.value";

export class ItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepository
    ) {
        this.getItems = this.getItems.bind(this);
        this.getDetailItem = this.getDetailItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.findItemByName = this.findItemByName.bind(this);
    }

    public async getItems() {
        try {
            const typeItems = this.itemRepository.getItems();
            if(!typeItems) {
                throw new Error('No hay items.');
            }
            return typeItems;
        } catch (error: any) {
            console.error('Error en getItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailItem(itm_uuid: string) {
        try {
            const item = this.itemRepository.findItemById(itm_uuid);
            if(!item) {
                throw new Error(`No hay item con el Id: ${itm_uuid}`);
            }
            return item;
        } catch (error: any) {
            console.error('Error en getDetailItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createItem({ itm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat } : { itm_uuid: string, itm_name: string, itm_description: string, itm_createdat: Date, itm_updatedat: Date }) {
        try {
            const itemValue = new ItemValue({ itm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat });
            const itemCreated = await this.itemRepository.createItem(itemValue);
            if(!itemCreated) {
                throw new Error(`No se pudo insertar el item.`);
            }
            return itemCreated;
        } catch (error: any) {
            console.error('Error en createItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateItem(itm_uuid: string, { itm_name, itm_description, itm_createdat, itm_updatedat } : { itm_name: string, itm_description: string, itm_createdat: Date, itm_updatedat: Date }) {
        try {
            const itemUpdated = await this.itemRepository.updateItem(itm_uuid, { itm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat });
            if(!itemUpdated) {
                throw new Error(`No se pudo actualizar el item.`);
            }
            return itemUpdated;
        } catch (error: any) {
            console.error('Error en updateItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteItem(itm_uuid: string) {
        try {
            const itemDeleted = await this.itemRepository.deleteItem(itm_uuid);
            if(!itemDeleted) {
                throw new Error(`No se pudo eliminar el item.`);
            }
            return itemDeleted;
        } catch (error: any) {
            console.error('Error en deleteItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findItemByName(itm_name: string, excludeUuid?: string) {
        try {
            const item = await this.itemRepository.findItemByName(itm_name, excludeUuid)
            if(item) {
                throw new Error(`Ya existe un item con el nombre ${itm_name}.`);
            }
            return item
        } catch (error: any) {
            console.error('Error en findItemByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}