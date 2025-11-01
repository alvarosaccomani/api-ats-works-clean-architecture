import { GroupDetailModelItemEntity, GroupDetailModelItemUpdateData } from "./group-detail-model-item.entity";

export interface GroupDetailModelItemRepository {
    getGroupDetailModelItems(cmp_uuid: string): Promise<GroupDetailModelItemEntity[] | null>;
    findGroupDetailModelItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string): Promise<GroupDetailModelItemEntity | null>;
    createGroupDetailModelItem(modelItem: GroupDetailModelItemEntity): Promise<GroupDetailModelItemEntity | null>;
    updateGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string, modelItem: GroupDetailModelItemUpdateData): Promise<GroupDetailModelItemEntity | null>;
    deleteGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string): Promise<GroupDetailModelItemEntity | null>;
    existGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string): Promise<GroupDetailModelItemEntity | null>;
}