import { DataTypeEntity, DataTypeUpdateData } from "../../../domain/data-type/data-type.entity";
import { DataTypeRepository } from "../../../domain/data-type/data-type.repository";
import { SequelizeDataType } from "../../model/data-type/data-type.model";
import { Op } from "sequelize";

export class SequelizeRepository implements DataTypeRepository {
    async getDataTypes(): Promise<DataTypeEntity[] | null> {
        try {
            const dataTypes = await SequelizeDataType.findAll();
            if(!dataTypes) {
                throw new Error(`No hay data types`);
            };
            return dataTypes;
        } catch (error: any) {
            console.error('Error en getDataTypes:', error.message);
            throw error;
        }
    }
    async findDataTypeById(dtp_uuid: string): Promise<DataTypeEntity | null> {
        try {
            const dataType = await SequelizeDataType.findOne({ 
                where: { 
                    dtp_uuid: dtp_uuid ?? null
                } 
            });
            if(!dataType) {
                throw new Error(`No hay data type con el Id: ${dtp_uuid}`);
            };
            return dataType.dataValues;
        } catch (error: any) {
            console.error('Error en findDataTypeById:', error.message);
            throw error;
        }
    }
    async createDataType(dataType: DataTypeEntity): Promise<DataTypeEntity | null> {
        try {
            let { dtp_uuid, dtp_cod, dtp_name, dtp_description, dtp_active, dtp_createdat, dtp_updatedat } = dataType
            const result = await SequelizeDataType.create({ dtp_uuid, dtp_cod, dtp_name, dtp_description, dtp_active, dtp_createdat, dtp_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el data type`);
            };
            let newDataType = result.dataValues as SequelizeDataType;
            return newDataType;
        } catch (error: any) {
            console.error('Error en createDataType:', error.message);
            throw error;
        }
    }
    async updateDataType(dtp_uuid: string, dataType: DataTypeUpdateData): Promise<DataTypeEntity | null> {
        try {
            const [updatedCount, [UpdatedDataType]] = await SequelizeDataType.update(
                { 
                    dtp_cod: dataType.dtp_cod, 
                    dtp_name: dataType.dtp_name, 
                    dtp_description: dataType.dtp_description, 
                    dtp_active: dataType.dtp_active
                }, 
                { 
                    where: { dtp_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
           if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el data type`);
            };
            return UpdatedDataType.get({ plain: true }) as DataTypeEntity;
        } catch (error: any) {
            console.error('Error en updateDataType:', error.message);
            throw error;
        }
    }
    async deleteDataType(dtp_uuid: string): Promise<DataTypeEntity | null> {
        try {
            const dataType = await this.findDataTypeById(dtp_uuid);
            const result = await SequelizeDataType.destroy({ where: { dtp_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el data type`);
            };
            return dataType;
        } catch (error: any) {
            console.error('Error en deleteDataType:', error.message);
            throw error;
        }
    }
    async findDataTypeByName(dtp_name: string, excludeUuid?: string): Promise<DataTypeEntity | null> {
        try {
            const whereCondition: any = { dtp_name: dtp_name ?? null };
            if (excludeUuid) {
                whereCondition.dtp_uuid = { [Op.ne]: excludeUuid };
            }
            const dataType = await SequelizeDataType.findOne({ 
                where: whereCondition
            });
            return dataType;
        } catch (error: any) {
            console.error('Error en findDataTypeByName:', error.message);
            throw error;
        }
    }
    
}