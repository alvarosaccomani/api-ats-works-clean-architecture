import { ItemEntity } from "../../../domain/item/item.entity";
import { ItemRepository } from "../../../domain/item/item.repository";
import { SequelizeItem } from "../../model/item/item.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ItemRepository {
    async getItems(): Promise<ItemEntity[] | null> {
        try {
            const items = await SequelizeItem.findAll();
            if(!items) {
                throw new Error(`No hay items`)
            };
            return items;
        } catch (error: any) {
            console.error('Error en getItems:', error.message);
            throw error;
        }
    }
    async findItemById(itm_uuid: string): Promise<ItemEntity | null> {
        try {
            const item = await SequelizeItem.findOne({ 
                where: { 
                    itm_uuid: itm_uuid ?? null
                } 
            });
            if(!item) {
                throw new Error(`No hay item con el Id: ${itm_uuid}`);
            };
            return item.dataValues;
        } catch (error: any) {
            console.error('Error en findItemById:', error.message);
            throw error;
        }
    }
    async createItem(item: ItemEntity): Promise<ItemEntity | null> {
        try {
            let { itm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat } = item
            const result = await SequelizeItem.create({ itm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el item`);
            }
            let newItem = result.dataValues as SequelizeItem
            return newItem;
        } catch (error: any) {
            console.error('Error en createItem:', error.message);
            throw error;
        }
    }
    async updateItem(itm_uuid: string, item: ItemEntity): Promise<ItemEntity | null> {
        try {
            let { itm_description, itm_createdat, itm_updatedat } = item
            const result = await SequelizeItem.update({ itm_description, itm_createdat, itm_updatedat }, { where: { itm_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el item`);
            };
            return item;
        } catch (error: any) {
            console.error('Error en updateItem:', error.message);
            throw error;
        }
    }
    async deleteItem(itm_uuid: string): Promise<ItemEntity | null> {
        try {
            const item = await this.findItemById(itm_uuid);
            const result = await SequelizeItem.destroy({ where: { itm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el item`);
            };
            return item;
        } catch (error: any) {
            console.error('Error en deleteItem:', error.message);
            throw error;
        }
    }
    async findItemByName(itm_name: string, excludeUuid?: string): Promise<ItemEntity | null> {
        try {
            const whereCondition: any = { itm_name: itm_name ?? null };
            if (excludeUuid) {
                whereCondition.itm_uuid = { [Op.ne]: excludeUuid };
            }
            const item = await SequelizeItem.findOne({ 
                where: whereCondition
            });
            return item;
        } catch (error: any) {
            console.error('Error en findItemByName:', error.message);
            throw error;
        }
    }
    
}