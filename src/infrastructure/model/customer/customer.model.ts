import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CustomerEntity } from "../../../domain/customer/customer.entity";

export class SequelizeCustomer extends Model<CustomerEntity, Omit<CustomerEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cus_uuid: string;
  declare cus_fullname: string;
  declare cus_email: string;
  declare cus_phone: string;
  declare cus_dateofbirth: Date;
  declare rou_uuid: string;
  declare pmt_uuid: string; 
  declare usr_uuid: string;
  declare cus_subscriptionplanbycustomer: boolean;
  declare subp_uuid: string;
  declare cus_active: boolean;
  declare cus_createdat: Date;
  declare cus_updatedat: Date;
}

SequelizeCustomer.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cus_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cus_fullname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cus_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cus_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cus_dateofbirth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rou_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pmt_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cus_subscriptionplanbycustomer: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  subp_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cus_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  cus_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cus_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cus_createdat',
  updatedAt: 'cus_updatedat',
  tableName: 'cus_customers'
});