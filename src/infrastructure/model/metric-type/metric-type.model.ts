import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { MetricTypeEntity } from "../../../domain/metric-type/metric-type.entity";

export class SequelizeMetricType extends Model<MetricTypeEntity> {
  declare mety_uuid: string;
  declare mety_cod: string;
  declare mety_name: string;
  declare mety_description: string;
  declare mety_active: boolean;
  declare mety_createdat: Date;
  declare mety_updatedat: Date;
}

SequelizeMetricType.init({
  mety_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  }, 
  mety_cod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mety_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mety_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mety_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  mety_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  mety_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize,
  timestamps: true,
  createdAt: 'mety_createdat',
  updatedAt: 'mety_updatedat',
  tableName: 'mety_metricstypes'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeMetricType.sync();
}
