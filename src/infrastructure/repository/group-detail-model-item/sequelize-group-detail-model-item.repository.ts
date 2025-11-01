import { GroupDetailModelItemEntity, GroupDetailModelItemUpdateData } from "../../../domain/group-detail-model-item/group-detail-model-item.entity";
import { GroupDetailModelItemRepository } from "../../../domain/group-detail-model-item/group-detail-model-item.repository";
import { SequelizeGroupDetailModelItem } from "../../model/group-detail-model-item/group-detail-model-item.model";

export class SequelizeRepository implements GroupDetailModelItemRepository {
    async getGroupDetailModelItems(cmp_uuid: string): Promise<GroupDetailModelItemEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const groupDetailModelItems = await SequelizeGroupDetailModelItem.findAll(config);
            if(!groupDetailModelItems) {
                throw new Error(`No hay detail model items`)
            };
            return groupDetailModelItems;
        } catch (error: any) {
            console.error('Error en getGroupDetailModelItems:', error.message);
            throw error;
        }
    }
    async findGroupDetailModelItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string): Promise<GroupDetailModelItemEntity | null> {
        try {
            const groupDetailModelItem = await SequelizeGroupDetailModelItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null,
                    mitm_uuid: mitm_uuid ?? null,
                    gdmitm_uuid: gdmitm_uuid ?? null
                } 
            });
            if(!groupDetailModelItem) {
                throw new Error(`No hay group detail model item con el Id: ${cmp_uuid}`);
            };
            return groupDetailModelItem.dataValues;
        } catch (error: any) {
            console.error('Error en findGroupDetailModelItemById:', error.message);
            throw error;
        }
    }
    async createGroupDetailModelItem(groupDetailModelItem: GroupDetailModelItemEntity): Promise<GroupDetailModelItemEntity | null> {
        try {
            let { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid, gdmitm_key, gdmitm_name, gdmitm_description, gdmitm_order, gdmitm_active, gdmitm_createdat, gdmitm_updatedat } = groupDetailModelItem
            const result = await SequelizeGroupDetailModelItem.create({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid, gdmitm_key, gdmitm_name, gdmitm_description, gdmitm_order, gdmitm_active, gdmitm_createdat, gdmitm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el group detail model item`);
            }
            let newGroupDetailModelItem = result.dataValues as SequelizeGroupDetailModelItem
            return newGroupDetailModelItem;
        } catch (error: any) {
            console.error('Error en createGroupDetailModelItem:', error.message);
            throw error;
        }
    }
    async updateGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string, groupDetailModelItem: GroupDetailModelItemUpdateData): Promise<GroupDetailModelItemEntity | null> {
        try {
            const [updatedCount, [UpdatedGroupDetailModelItem]] = await SequelizeGroupDetailModelItem.update(
                { 
                    gdmitm_key: groupDetailModelItem.gdmitm_key,
                    gdmitm_name: groupDetailModelItem.gdmitm_name,
                    gdmitm_description: groupDetailModelItem.gdmitm_description,
                    gdmitm_order: groupDetailModelItem.gdmitm_order,
                    gdmitm_active: groupDetailModelItem.gdmitm_active
                }, 
                { 
                    where: { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el group detail model item`);
            };
            return UpdatedGroupDetailModelItem.get({ plain: true }) as GroupDetailModelItemEntity;
        } catch (error: any) {
            console.error('Error en updateGroupDetailModelItem:', error.message);
            throw error;
        }
    }
    async deleteGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string): Promise<GroupDetailModelItemEntity | null> {
        try {
            const groupDetailModelItem = await this.findGroupDetailModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid);
            const result = await SequelizeGroupDetailModelItem.destroy({ where: { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, gdmitm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el groupdetailmodelitem`);
            };
            return groupDetailModelItem;
        } catch (error: any) {
            console.error('Error en deleteGroupDetailModelItem:', error.message);
            throw error;
        }
    }
    async existGroupDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, gdmitm_uuid: string): Promise<GroupDetailModelItemEntity | null> {
        try {
            const groupDetailModelItem = await SequelizeGroupDetailModelItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null,
                    mitm_uuid: mitm_uuid ?? null,
                    gdmitm_uuid: gdmitm_uuid ?? null
                } 
            });
            return groupDetailModelItem;
        } catch (error: any) {
            console.error('Error en deleteGroupDetailModelItem:', error.message);
            throw error;
        }
    }
    
}