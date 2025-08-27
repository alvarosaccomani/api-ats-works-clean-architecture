import { DetailModelItemEntity } from "./detail-model-item.entity";

export interface DetailModelItemRepository {
    getDetailModelItems(): Promise<DetailModelItemEntity[] | null>;
    findDetailModelItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string): Promise<DetailModelItemEntity | null>;
    createDetailModelItem(modelItem: DetailModelItemEntity): Promise<DetailModelItemEntity | null>;
    updateDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string, modelItem: DetailModelItemEntity): Promise<DetailModelItemEntity | null>;
    deleteDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string): Promise<DetailModelItemEntity | null>;
    existDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string): Promise<DetailModelItemEntity | null>;
}