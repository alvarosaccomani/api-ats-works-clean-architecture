import { MetricTypeRepository } from "../../domain/metric-type/metric-type.repository";
import { MetricTypeValue } from "../../domain/metric-type/metric-type.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class MetricTypeUseCase {
    constructor(
        private readonly metricTypeRepository: MetricTypeRepository
    ) {
        this.getMetricTypes = this.getMetricTypes.bind(this);
        this.getDetailMetricType = this.getDetailMetricType.bind(this);
        this.createMetricType = this.createMetricType.bind(this);
        this.updateMetricType = this.updateMetricType.bind(this);
        this.deleteMetricType = this.deleteMetricType.bind(this);
        this.findMetricTypeByName = this.findMetricTypeByName.bind(this);
    }

    public async getMetricTypes(filter?: string | null) {
        try {
            const metricTypes = await this.metricTypeRepository.getMetricTypes(filter);
            if(!metricTypes) {
                throw new Error('No hay metric types.');
            }
            return metricTypes.map((metricType) => ({
                mety_uuid: metricType.mety_uuid,
                mety_cod: metricType.mety_cod,
                mety_name: metricType.mety_name,
                mety_description: metricType.mety_description,
                mety_active: metricType.mety_active,
                mety_createdat: TimezoneConverter.toIsoStringInTimezone(metricType.mety_createdat, 'America/Argentina/Buenos_Aires'),
                mety_updatedat: TimezoneConverter.toIsoStringInTimezone(metricType.mety_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getMetricTypes (use case):', error.message);
            throw error;
        }
    }

    public async getDetailMetricType(mety_uuid: string) {
        try {
            const metricType = await this.metricTypeRepository.findMetricTypeById(mety_uuid);
            if(!metricType) {
                throw new Error(`No hay metric type con el Id: ${mety_uuid}`);
            }
            return {
                mety_uuid: metricType.mety_uuid,
                mety_cod: metricType.mety_cod,
                mety_name: metricType.mety_name,
                mety_description: metricType.mety_description,
                mety_active: metricType.mety_active,
                mety_createdat: TimezoneConverter.toIsoStringInTimezone(metricType.mety_createdat, 'America/Argentina/Buenos_Aires'),
                mety_updatedat: TimezoneConverter.toIsoStringInTimezone(metricType.mety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailMetricType (use case):', error.message);
            throw error;
        }
    }
    
    public async createMetricType({ mety_uuid, mety_cod, mety_name, mety_description, mety_active } : { mety_uuid: string, mety_cod: string, mety_name: string, mety_description: string, mety_active: boolean }) {
        try {
            const metricTypeValue = new MetricTypeValue({ mety_uuid, mety_cod, mety_name, mety_description, mety_active });
            const metricTypeCreated = await this.metricTypeRepository.createMetricType(metricTypeValue);
            if(!metricTypeCreated) {
                throw new Error(`No se pudo insertar el metric type.`);
            }
            return {
                mety_uuid: metricTypeCreated.mety_uuid,
                mety_cod: metricTypeCreated.mety_cod,
                mety_name: metricTypeCreated.mety_name,
                mety_description: metricTypeCreated.mety_description,
                mety_active: metricTypeCreated.mety_active,
                mety_createdat: TimezoneConverter.toIsoStringInTimezone(metricTypeCreated.mety_createdat, 'America/Argentina/Buenos_Aires'),
                mety_updatedat: TimezoneConverter.toIsoStringInTimezone(metricTypeCreated.mety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createMetricType (use case):', error.message);
            throw error;
        }
    }

    public async updateMetricType(mety_uuid: string, { mety_cod, mety_name, mety_description, mety_active } : { mety_cod: string, mety_name: string, mety_description: string, mety_active: boolean }) {
        try {
            const metricTypeUpdated = await this.metricTypeRepository.updateMetricType(mety_uuid, { mety_cod, mety_name, mety_description, mety_active });
            if(!metricTypeUpdated) {
                throw new Error(`No se pudo actualizar el metric type.`);
            }
            return {
                mety_uuid: metricTypeUpdated.mety_uuid,
                mety_cod: metricTypeUpdated.mety_cod,
                mety_name: metricTypeUpdated.mety_name,
                mety_description: metricTypeUpdated.mety_description,
                mety_active: metricTypeUpdated.mety_active,
                mety_createdat: TimezoneConverter.toIsoStringInTimezone(metricTypeUpdated.mety_createdat, 'America/Argentina/Buenos_Aires'),
                mety_updatedat: TimezoneConverter.toIsoStringInTimezone(metricTypeUpdated.mety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateMetricType (use case):', error.message);
            throw error;
        }
    }

    public async deleteMetricType(mety_uuid: string) {
        try {
            const metricTypeDeleted = await this.metricTypeRepository.deleteMetricType(mety_uuid);
            if(!metricTypeDeleted) {
                throw new Error(`No se pudo eliminar el metric type.`);
            }
            return {
                mety_uuid: metricTypeDeleted.mety_uuid,
                mety_cod: metricTypeDeleted.mety_cod,
                mety_name: metricTypeDeleted.mety_name,
                mety_description: metricTypeDeleted.mety_description,
                mety_active: metricTypeDeleted.mety_active,
                mety_createdat: TimezoneConverter.toIsoStringInTimezone(metricTypeDeleted.mety_createdat, 'America/Argentina/Buenos_Aires'),
                mety_updatedat: TimezoneConverter.toIsoStringInTimezone(metricTypeDeleted.mety_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteMetricType (use case):', error.message);
            throw error;
        }
    }

    public async findMetricTypeByName(mety_name: string, excludeUuid?: string | null) {
        try {
            const metricType = await this.metricTypeRepository.findMetricTypeByName(mety_name, excludeUuid)
            if(metricType) {
                throw new Error(`Ya existe un metric type con el nombre ${mety_name}.`);
            }
            return metricType
        } catch (error: any) {
            console.error('Error en findMetricTypeByName (use case):', error.message);
            throw error;
        }
    }

}
