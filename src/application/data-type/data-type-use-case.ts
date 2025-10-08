import { DataTypeRepository } from "../../domain/data-type/data-type.repository";
import { DataTypeValue } from "../../domain/data-type/data-type.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class DataTypeUseCase {
    constructor(
        private readonly dataTypeRepository: DataTypeRepository
    ) {
        this.getDataTypes = this.getDataTypes.bind(this);
        this.getDetailDataType = this.getDetailDataType.bind(this);
        this.createDataType = this.createDataType.bind(this);
        this.updateDataType = this.updateDataType.bind(this);
        this.deleteDataType = this.deleteDataType.bind(this);
        this.findDataTypeByName = this.findDataTypeByName.bind(this);
    }

    public async getDataTypes() {
        try {
            const dataTypes = await this.dataTypeRepository.getDataTypes();
            if(!dataTypes) {
                throw new Error('No hay data types.');
            }
            return dataTypes.map((dataType) => ({
                dtp_uuid: dataType.dtp_uuid,
                dtp_cod: dataType.dtp_cod,
                dtp_name: dataType.dtp_name,
                dtp_description: dataType.dtp_description,
                dtp_active: dataType.dtp_active,
                dtp_createdat: TimezoneConverter.toIsoStringInTimezone(dataType.dtp_createdat, 'America/Argentina/Buenos_Aires'),
                dtp_updatedat: TimezoneConverter.toIsoStringInTimezone(dataType.dtp_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getDataTypes (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailDataType(dtp_uuid: string) {
        try {
            const dataType = await this.dataTypeRepository.findDataTypeById(dtp_uuid);
            if(!dataType) {
                throw new Error(`No hay data type con el Id: ${dtp_uuid}`);
            }
            return {
                dtp_uuid: dataType.dtp_uuid,
                dtp_cod: dataType.dtp_cod,
                dtp_name: dataType.dtp_name,
                dtp_description: dataType.dtp_description,
                dtp_active: dataType.dtp_active,
                dtp_createdat: TimezoneConverter.toIsoStringInTimezone(dataType.dtp_createdat, 'America/Argentina/Buenos_Aires'),
                dtp_updatedat: TimezoneConverter.toIsoStringInTimezone(dataType.dtp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailDataType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createDataType({ dtp_uuid, dtp_cod, dtp_name, dtp_description, dtp_active, dtp_createdat, dtp_updatedat } : { dtp_uuid: string, dtp_cod: string, dtp_name: string, dtp_description: string, dtp_active: boolean, dtp_createdat: Date, dtp_updatedat: Date }) {
        try {
            const dataTypeValue = new DataTypeValue({ dtp_uuid, dtp_cod, dtp_name, dtp_description, dtp_active, dtp_createdat, dtp_updatedat });
            const dataTypeCreated = await this.dataTypeRepository.createDataType(dataTypeValue);
            if(!dataTypeCreated) {
                throw new Error(`No se pudo insertar el data type.`);
            }
            return {
                dtp_uuid: dataTypeCreated.dtp_uuid,
                dtp_cod: dataTypeCreated.dtp_cod,
                dtp_name: dataTypeCreated.dtp_name,
                dtp_description: dataTypeCreated.dtp_description,
                dtp_active: dataTypeCreated.dtp_active,
                dtp_createdat: TimezoneConverter.toIsoStringInTimezone(dataTypeCreated.dtp_createdat, 'America/Argentina/Buenos_Aires'),
                dtp_updatedat: TimezoneConverter.toIsoStringInTimezone(dataTypeCreated.dtp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createDataType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateDataType(dtp_uuid: string, { dtp_cod, dtp_name, dtp_description, dtp_active, dtp_createdat, dtp_updatedat } : { dtp_cod: string, dtp_name: string, dtp_description: string, dtp_active: boolean, dtp_createdat: Date, dtp_updatedat: Date }) {
        try {
            const dataTypeUpdated = await this.dataTypeRepository.updateDataType(dtp_uuid, { dtp_uuid, dtp_cod, dtp_name, dtp_description, dtp_active, dtp_createdat, dtp_updatedat });
            if(!dataTypeUpdated) {
                throw new Error(`No se pudo actualizar el data type.`);
            }
            return {
                dtp_uuid: dataTypeUpdated.dtp_uuid,
                dtp_cod: dataTypeUpdated.dtp_cod,
                dtp_name: dataTypeUpdated.dtp_name,
                dtp_description: dataTypeUpdated.dtp_description,
                dtp_active: dataTypeUpdated.dtp_active,
                dtp_createdat: TimezoneConverter.toIsoStringInTimezone(dataTypeUpdated.dtp_createdat, 'America/Argentina/Buenos_Aires'),
                dtp_updatedat: TimezoneConverter.toIsoStringInTimezone(dataTypeUpdated.dtp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateDataType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteDataType(dtp_uuid: string) {
        try {
            const dataTypeDeleted = await this.dataTypeRepository.deleteDataType(dtp_uuid);
            if(!dataTypeDeleted) {
                throw new Error(`No se pudo eliminar el data type.`);
            }
            return {
                dtp_uuid: dataTypeDeleted.dtp_uuid,
                dtp_cod: dataTypeDeleted.dtp_cod,
                dtp_name: dataTypeDeleted.dtp_name,
                dtp_description: dataTypeDeleted.dtp_description,
                dtp_active: dataTypeDeleted.dtp_active,
                dtp_createdat: TimezoneConverter.toIsoStringInTimezone(dataTypeDeleted.dtp_createdat, 'America/Argentina/Buenos_Aires'),
                dtp_updatedat: TimezoneConverter.toIsoStringInTimezone(dataTypeDeleted.dtp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteDataType (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findDataTypeByName(dtp_name: string, excludeUuid?: string) {
        try {
            const dataType = await this.dataTypeRepository.findDataTypeByName(dtp_name, excludeUuid)
            if(dataType) {
                throw new Error(`Ya existe un data type con el nombre ${dtp_name}.`);
            }
            return dataType
        } catch (error: any) {
            console.error('Error en findDataTypeByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}