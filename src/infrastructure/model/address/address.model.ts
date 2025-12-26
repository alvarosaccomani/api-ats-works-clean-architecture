import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { AddressEntity } from "../../../domain/address/address.entity";
import { SequelizeCustomer } from '../customer/customer.model';

export class SequelizeAddress extends Model<AddressEntity, Omit<AddressEntity, 'id'>> {
  declare cmp_uuid: string;
  declare adr_uuid: string;
  declare cus_uuid: string;
  declare adr_address: string;
  declare adr_city: string;
  declare adr_province: string;    
  declare adr_postalcode: string;
  declare adr_dimensions: string;
  declare subp_uuid: string;
  declare adr_active: boolean;
  declare adr_createdat: Date;
  declare adr_updatedat: Date;
}

SequelizeAddress.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  adr_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cus_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  adr_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_province: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_postalcode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_dimensions: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subp_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  adr_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  adr_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'adr_createdat',
  updatedAt: 'adr_updatedat',
  tableName: 'adr_addresses'
});