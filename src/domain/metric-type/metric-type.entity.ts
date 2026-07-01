export interface MetricTypeEntity {
    mety_uuid: string,
    mety_cod: string,
    mety_name: string,
    mety_description: string,
    mety_active: boolean,
    mety_createdat: Date,
    mety_updatedat: Date
}

//Update
export type MetricTypeUpdateMetric = Pick<MetricTypeEntity, 'mety_cod' | 'mety_name' | 'mety_description' | 'mety_active'>