import { MetricTypeEntity, MetricTypeUpdateMetric } from "../../../domain/metric-type/metric-type.entity";
import { MetricTypeRepository } from "../../../domain/metric-type/metric-type.repository";
import { SequelizeMetricType } from "../../model/metric-type/metric-type.model";
import { Op } from "sequelize";
import { sequelize } from '../../db/sequelize';
import { DbErrorHandler } from '../../utils/db-error-handler';

export class SequelizeRepository implements MetricTypeRepository {
    async getMetricTypes(filter?: string | null): Promise<MetricTypeEntity[] | null> {
        try {
            const where: any = {};
            if (filter && filter !== 'null' && filter.trim() !== '') {
                const search = `%${filter.toLowerCase()}%`;
                where[Op.or] = [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('mety_name')), 'LIKE', search),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('mety_description')), 'LIKE', search)
                ];
            }
            const metricTypes = await SequelizeMetricType.findAll({ where });
            if(!metricTypes) {
                throw new Error(`No hay metric types`);
            };
            return metricTypes;
        } catch (error: any) {
            console.error('Error en getMetricTypes:', error.message);
            throw error;
        }
    }
    async findMetricTypeById(mety_uuid: string): Promise<MetricTypeEntity | null> {
        try {
            const metricType = await SequelizeMetricType.findOne({ 
                where: { 
                    mety_uuid: mety_uuid ?? null
                } 
            });
            if(!metricType) {
                throw new Error(`No hay metric type con el Id: ${mety_uuid}`);
            };
            return metricType.dataValues;
        } catch (error: any) {
            console.error('Error en findMetricTypeById:', error.message);
            throw error;
        }
    }
    async createMetricType(metricType: MetricTypeEntity): Promise<MetricTypeEntity | null> {
        try {
            let { mety_uuid, mety_cod, mety_name, mety_description, mety_active, mety_createdat, mety_updatedat } = metricType
            const result = await SequelizeMetricType.create({ mety_uuid, mety_cod, mety_name, mety_description, mety_active, mety_createdat, mety_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el metric type`);
            };
            let newMetricType = result.dataValues as SequelizeMetricType;
            return newMetricType;
        } catch (error: any) {
            console.error('Error en createMetricType:', error.message);
            throw error;
        }
    }
    async updateMetricType(mety_uuid: string, metricType: MetricTypeUpdateMetric): Promise<MetricTypeEntity | null> {
        try {
            const [updatedCount, [UpdatedMetricType]] = await SequelizeMetricType.update(
                { 
                    mety_cod: metricType.mety_cod, 
                    mety_name: metricType.mety_name, 
                    mety_description: metricType.mety_description, 
                    mety_active: metricType.mety_active
                }, 
                { 
                    where: { mety_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
           if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el metric type`);
            };
            return UpdatedMetricType.get({ plain: true }) as MetricTypeEntity;
        } catch (error: any) {
            console.error('Error en updateMetricType:', error.message);
            throw error;
        }
    }
    async deleteMetricType(mety_uuid: string): Promise<MetricTypeEntity | null> {
        try {
            const metricType = await this.findMetricTypeById(mety_uuid);
            const result = await SequelizeMetricType.destroy({ where: { mety_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el metric type`);
            };
            return metricType;
        } catch (error: any) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new Error(DbErrorHandler.handle(error));
            }

            console.error('Error en deleteMetricType:', error.message);
            throw error;
        }
    }
    async findMetricTypeByName(mety_name: string, excludeUuid?: string | null): Promise<MetricTypeEntity | null> {
        try {
            const whereCondition: any = { mety_name: mety_name ?? null };
            if (excludeUuid) {
                whereCondition.mety_uuid = { [Op.ne]: excludeUuid };
            }
            const metricType = await SequelizeMetricType.findOne({ 
                where: whereCondition
            });
            return metricType;
        } catch (error: any) {
            console.error('Error en findMetricTypeByName:', error.message);
            throw error;
        }
    }
    
}
