import { ModelItemEntity } from "./model-item.entity";

export interface ModelItemRepository {
    getModelItems(cmp_uuid: string): Promise<ModelItemEntity[] | null>;
    findModelItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string): Promise<ModelItemEntity | null>;
    createModelItem(modelItem: ModelItemEntity): Promise<ModelItemEntity | null>;
    updateModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, modelItem: ModelItemEntity): Promise<ModelItemEntity | null>;
    deleteModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string): Promise<ModelItemEntity | null>;
    existModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string): Promise<ModelItemEntity | null>;
}