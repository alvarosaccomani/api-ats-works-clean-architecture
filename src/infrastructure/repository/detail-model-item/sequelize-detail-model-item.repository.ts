import { DetailModelItemEntity, DetailModelItemUpdateData } from "../../../domain/detail-model-item/detail-model-item.entity";
import { DetailModelItemRepository } from "../../../domain/detail-model-item/detail-model-item.repository";
import { SequelizeDataType } from "../../model/data-type/data-type.model";
import { SequelizeDetailModelItem } from "../../model/detail-model-item/detail-model-item.model";
import { SequelizeGroupDetailModelItem } from "../../model/group-detail-model-item/group-detail-model-item.model";

export class SequelizeRepository implements DetailModelItemRepository {
    async getDetailModelItems(cmp_uuid: string): Promise<DetailModelItemEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const detailModelItems = await SequelizeDetailModelItem.findAll(config);
            if(!detailModelItems) {
                throw new Error(`No hay detail model items`)
            };
            return detailModelItems;
        } catch (error: any) {
            console.error('Error en getDetailModelItems:', error.message);
            throw error;
        }
    }
    async findDetailModelItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string): Promise<DetailModelItemEntity | null> {
        try {
            const detailModelItem = await SequelizeDetailModelItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null,
                    mitm_uuid: mitm_uuid ?? null,
                    dmitm_uuid: dmitm_uuid ?? null
                },
                include: [
                    {
                        as: 'dtp',
                        model: SequelizeDataType
                    },
                    {
                        as: 'gdmitm',
                        model: SequelizeGroupDetailModelItem
                    },
                ]
            });
            if(!detailModelItem) {
                throw new Error(`No hay detail model item con el Id: ${cmp_uuid}`);
            };
            return detailModelItem.dataValues;
        } catch (error: any) {
            console.error('Error en findDetailModelItemById:', error.message);
            throw error;
        }
    }
    async createDetailModelItem(detailModelItem: DetailModelItemEntity): Promise<DetailModelItemEntity | null> {
        try {
            let { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid, dmitm_key, dmitm_name, dmitm_description, dtp_uuid, dmitm_arrayvalues, dmitm_defaultvalue, dmitm_order, gdmitm_uuid, dmitm_active, dmitm_createdat, dmitm_updatedat } = detailModelItem
            const result = await SequelizeDetailModelItem.create({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid, dmitm_key, dmitm_name, dmitm_description, dtp_uuid, dmitm_arrayvalues, dmitm_defaultvalue, dmitm_order, gdmitm_uuid, dmitm_active, dmitm_createdat, dmitm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el detail model item`);
            }
            let newDetailModelItem = result.dataValues as SequelizeDetailModelItem
            return newDetailModelItem;
        } catch (error: any) {
            console.error('Error en createDetailModelItem:', error.message);
            throw error;
        }
    }
    async updateDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string, detailModelItem: DetailModelItemUpdateData): Promise<DetailModelItemEntity | null> {
        try {
            const [updatedCount, [UpdatedDetailModelItem]] = await SequelizeDetailModelItem.update(
                { 
                    dmitm_key: detailModelItem.dmitm_key,
                    dmitm_name: detailModelItem.dmitm_name,
                    dmitm_description: detailModelItem.dmitm_description,
                    dtp_uuid: detailModelItem.dtp_uuid,
                    dmitm_arrayvalues: detailModelItem.dmitm_arrayvalues,
                    dmitm_defaultvalue: detailModelItem.dmitm_defaultvalue,
                    dmitm_order: detailModelItem.dmitm_order,
                    gdmitm_uuid: detailModelItem.gdmitm_uuid,
                    dmitm_active: detailModelItem.dmitm_active
                }, 
                { 
                    where: { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el detailmodelitem`);
            };
            return UpdatedDetailModelItem.get({ plain: true }) as DetailModelItemEntity;
        } catch (error: any) {
            console.error('Error en updateDetailModelItem:', error.message);
            throw error;
        }
    }
    async deleteDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string): Promise<DetailModelItemEntity | null> {
        try {
            const detailModelItem = await this.findDetailModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid);
            const result = await SequelizeDetailModelItem.destroy({ where: { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, dmitm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el detailmodelitem`);
            };
            return detailModelItem;
        } catch (error: any) {
            console.error('Error en deleteDetailModelItem:', error.message);
            throw error;
        }
    }
    async existDetailModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, dmitm_uuid: string): Promise<DetailModelItemEntity | null> {
        try {
            const detailModelItem = await SequelizeDetailModelItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null,
                    mitm_uuid: mitm_uuid ?? null,
                    dmitm_uuid: dmitm_uuid ?? null
                } 
            });
            return detailModelItem;
        } catch (error: any) {
            console.error('Error en deleteDetailModelItem:', error.message);
            throw error;
        }
    }
    
}