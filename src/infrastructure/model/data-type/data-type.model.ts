import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { DataTypeEntity } from "../../../domain/data-type/data-type.entity";

export class SequelizeDataType extends Model<DataTypeEntity/*, Omit<DataTypeEntity, 'id'>*/> {
  declare dtp_uuid: string;
  declare dtp_cod: string;
  declare dtp_name: string;
  declare dtp_description: string;
  declare dtp_active: boolean;
  declare dtp_createdat: Date;
  declare dtp_updatedat: Date;
}

SequelizeDataType.init({
  dtp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  }, 
  dtp_cod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dtp_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dtp_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dtp_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  dtp_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dtp_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize,
  timestamps: true,
  createdAt: 'dtp_createdat',
  updatedAt: 'dtp_updatedat',
  tableName: 'dtp_datatypes'
});

SequelizeDataType.sync();