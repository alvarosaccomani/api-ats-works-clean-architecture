import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { GroupDetailModelItemEntity } from "../../../domain/group-detail-model-item/group-detail-model-item.entity";

export class SequelizeGroupDetailModelItem extends Model<GroupDetailModelItemEntity, Omit<GroupDetailModelItemEntity, 'id'>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare mitm_uuid: string;	
	declare dmitm_uuid: string;
  declare gdmitm_uuid: string;
	declare gdmitm_key: string;
  declare gdmitm_name: string;
	declare gdmitm_description: string;
	declare gdmitm_order: number;
	declare gdmitm_active: boolean;
	declare gdmitm_createdat: Date;
  declare gdmitm_updatedat: Date;
}

SequelizeGroupDetailModelItem.init({
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
  gdmitm_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
	gdmitm_key: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gdmitm_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
	gdmitm_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gdmitm_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gdmitm_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },  
  gdmitm_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gdmitm_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'gdmitm_createdat',
  updatedAt: 'gdmitm_updatedat',
  tableName: 'gdmitm_groupdetailsmodelsitems'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeGroupDetailModelItem.sync();
}