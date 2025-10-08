import { ItemEntity, ItemUpdateData } from "./item.entity";

export interface ItemRepository {
    getItems(): Promise<ItemEntity[] | null>;
    findItemById(itm_uuid: string): Promise<ItemEntity | null>;
    createItem(item: ItemEntity): Promise<ItemEntity | null>;
    updateItem(itm_uuid: string, item: ItemUpdateData): Promise<ItemEntity | null>;
    deleteItem(itm_uuid: string): Promise<ItemEntity | null>;
    findItemByName(itm_name: string, excludeUuid?: string | null): Promise<ItemEntity | null>;
}