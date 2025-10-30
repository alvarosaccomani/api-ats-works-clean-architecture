import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanyEntity } from "../../../domain/company/company.entity";

export class SequelizeCompany extends Model<CompanyEntity, Omit<CompanyEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cmp_name: string;
  declare cmp_address: string;
  declare cmp_phone: string;
  declare cmp_email: string;
  declare cmp_createdat: Date;
  declare cmp_updatedat: Date;
}

SequelizeCompany.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cmp_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cmp_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmp_createdat',
  updatedAt: 'cmp_updatedat',
  tableName: 'cmp_companies'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCompany.sync();
}