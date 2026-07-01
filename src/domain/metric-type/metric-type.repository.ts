import { MetricTypeEntity, MetricTypeUpdateMetric } from "./metric-type.entity";

export interface MetricTypeRepository {
    getMetricTypes(filter?: string | null): Promise<MetricTypeEntity[] | null>;
    findMetricTypeById(mety_uuid: string): Promise<MetricTypeEntity | null>;
    createMetricType(metricType: MetricTypeEntity): Promise<MetricTypeEntity | null>;
    updateMetricType(mety_uuid: string, metricType: MetricTypeUpdateMetric): Promise<MetricTypeEntity | null>;
    deleteMetricType(mety_uuid: string): Promise<MetricTypeEntity | null>;
    findMetricTypeByName(mety_name: string, excludeUuid?: string | null): Promise<MetricTypeEntity | null>;
}