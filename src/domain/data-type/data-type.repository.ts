import { DataTypeEntity } from "./data-type.entity";

export interface DataTypeRepository {
    getDataTypes(): Promise<DataTypeEntity[] | null>;
    findDataTypeById(dtp_uuid: string): Promise<DataTypeEntity | null>;
    createDataType(dataType: DataTypeEntity): Promise<DataTypeEntity | null>;
    updateDataType(dtp_uuid: string, dataType: DataTypeEntity): Promise<DataTypeEntity | null>;
    deleteDataType(dtp_uuid: string): Promise<DataTypeEntity | null>;
    findDataTypeByName(dtp_name: string, excludeUuid?: string | null): Promise<DataTypeEntity | null>;
}