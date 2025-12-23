import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { DetailModelItemEntity } from "../../../domain/detail-model-item/detail-model-item.entity";
import { SequelizeDataType } from '../data-type/data-type.model';
import { SequelizeGroupDetailModelItem } from '../group-detail-model-item/group-detail-model-item.model';


export class SequelizeDetailModelItem extends Model<DetailModelItemEntity, Omit<DetailModelItemEntity, 'id'>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare mitm_uuid: string;
  declare dmitm_uuid: string;
  declare dmitm_key: string;
	declare dmitm_name: string;
	declare dmitm_description: string;
  declare dtp_uuid: string;
  declare dmitm_arrayvalues: string;
  declare dmitm_defaultvalue: string;
	declare dmitm_active: boolean;
  declare dmitm_order: number;
  declare gdmitm_uuid: string;
  declare dmitm_createdat: Date;
  declare dmitm_updatedat: Date;
}

SequelizeDetailModelItem.init({
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
  dmitm_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
	dmitm_key: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dmitm_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
	dmitm_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dtp_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dmitm_arrayvalues: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dmitm_defaultvalue: {
    type: DataTypes.STRING,
    allowNull: true
  },
	dmitm_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  dmitm_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gdmitm_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dmitm_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dmitm_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'dmitm_createdat',
  updatedAt: 'dmitm_updatedat',
  tableName: 'dmitm_detailsmodelsitems'
});
SequelizeDetailModelItem.belongsTo(SequelizeDataType, {
    foreignKey: 'dtp_uuid',
    as: 'dtp'
});

//Sequelize Group detail model item Foreign Key
SequelizeDetailModelItem.belongsTo(SequelizeGroupDetailModelItem, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeDetailModelItem.belongsTo(SequelizeGroupDetailModelItem, {
    foreignKey: 'gdmitm_uuid',
    targetKey: "gdmitm_uuid",
    as: 'gdmitm'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeDetailModelItem.sync();
}