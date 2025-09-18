import { Sequelize } from 'sequelize';
import { ModelItemEntity } from "../../../domain/model-item/model-item.entity";
import { ModelItemRepository } from "../../../domain/model-item/model-item.repository";
import { SequelizeModelItem } from "../../model/model-item/model-item.model";
import { SequelizeDetailModelItem } from "../../model/detail-model-item/detail-model-item.model";
import { SequelizeDataType } from "../../model/data-type/data-type.model";

export class SequelizeRepository implements ModelItemRepository {
    async getModelItems(cmp_uuid: string): Promise<ModelItemEntity[] | null> {
        try {

            const modelItems = await SequelizeModelItem.findAll({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!modelItems) {
                throw new Error(`No hay model items`)
            };
            return modelItems;
        } catch (error: any) {
            console.error('Error en getModelItems:', error.message);
            throw error;
        }
    }
    async findModelItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string): Promise<ModelItemEntity | null> {
        try {
            const modelItem = await SequelizeModelItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cmpitm_uuid: cmpitm_uuid ?? null,
                    mitm_uuid: mitm_uuid ?? null
                },
                include: [
                    { 
                        as: 'detailModelItems', 
                        model: SequelizeDetailModelItem,
                        include: [
                            { 
                                as: 'dtp', 
                                model: SequelizeDataType
                            }
                        ]
                    }
                ],
                order: [
                    [Sequelize.col('detailModelItems.dmitm_order'), 'ASC'], // Ordenar usando Sequelize.col
                ]
            });
            if(!modelItem) {
                throw new Error(`No hay model item con el Id: ${cmp_uuid}`);
            };
            return modelItem.dataValues;
        } catch (error: any) {
            console.error('Error en findModelItemById:', error.message);
            throw error;
        }
    }
    async createModelItem(modelItem: ModelItemEntity): Promise<ModelItemEntity | null> {
        try {
            let { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, mitm_name, mitm_description, mitm_active, mitm_createdat, mitm_updatedat } = modelItem
            const result = await SequelizeModelItem.create({ cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid, mitm_name, mitm_description, mitm_active, mitm_createdat, mitm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el model item`);
            }
            let newModelItem = result.dataValues as SequelizeModelItem
            return newModelItem;
        } catch (error: any) {
            console.error('Error en createModelItem:', error.message);
            throw error;
        }
    }
    async updateModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string, modelItem: ModelItemEntity): Promise<ModelItemEntity | null> {
        try {
            let { mitm_name, mitm_description, mitm_active, mitm_createdat, mitm_updatedat } = modelItem
            const result = await SequelizeModelItem.update({ mitm_name, mitm_description, mitm_active, mitm_createdat, mitm_updatedat }, { where: { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el modelitem`);
            };
            return modelItem;
        } catch (error: any) {
            console.error('Error en updateModelItem:', error.message);
            throw error;
        }
    }
    async deleteModelItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, mitm_uuid: string): Promise<ModelItemEntity | null> {
        try {
            const modelItem = await this.findModelItemById(cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid);
            const result = await SequelizeModelItem.destroy({ where: { cmp_uuid, itm_uuid, cmpitm_uuid, mitm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el modelitem`);
            };
            return modelItem;
        } catch (error: any) {
            console.error('Error en deleteModelItem:', error.message);
            throw error;
        }
    }
    async existModelItem(cmp_uuid: string, itm_uuid: string): Promise<ModelItemEntity | null> {
        try {
            const modelItem = await SequelizeModelItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null
                } 
            });
            return modelItem;
        } catch (error: any) {
            console.error('Error en deleteModelItem:', error.message);
            throw error;
        }
    }
    
}