import { DataTypeRepository } from "../../domain/data-type/data-type.repository";
import { DataTypeValue } from "../../domain/data-type/data-type.value";

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
            const dataTypes = this.dataTypeRepository.getDataTypes();
            if(!dataTypes) {
                throw new Error('No hay data types.');
            }
            return dataTypes;
        } catch (error: any) {
            console.error('Error en getDataTypes (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailDataType(dtp_uuid: string) {
        try {
            const dataType = this.dataTypeRepository.findDataTypeById(dtp_uuid);
            if(!dataType) {
                throw new Error(`No hay data type con el Id: ${dtp_uuid}`);
            }
            return dataType;
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
            return dataTypeCreated;
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
            return dataTypeUpdated;
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
            return dataTypeDeleted;
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