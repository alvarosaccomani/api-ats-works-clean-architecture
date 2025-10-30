import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ModelItemEntity } from "../../../domain/model-item/model-item.entity";
import { SequelizeDetailModelItem } from "../detail-model-item/detail-model-item.model";

export class SequelizeModelItem extends Model<ModelItemEntity, Omit<ModelItemEntity, 'id'>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare mitm_uuid: string;
	declare mitm_name: string;
	declare mitm_description: string;
	declare mitm_active: boolean;
  declare mitm_createdat: Date;
  declare mitm_updatedat: Date;
}

SequelizeModelItem.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  itm_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  cmpitm_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  mitm_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  mitm_name: {
    type: DataTypes.STRING,
    primaryKey: true
  },
	mitm_description: {
    type: DataTypes.STRING,
    primaryKey: true
  },
	mitm_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  mitm_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  mitm_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'mitm_createdat',
  updatedAt: 'mitm_updatedat',
  tableName: 'mitm_modelsitems'
});
SequelizeModelItem.hasMany(SequelizeDetailModelItem, {
    foreignKey: 'mitm_uuid',
    sourceKey: 'mitm_uuid',
    as: 'detailModelItems'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeModelItem.sync();
}