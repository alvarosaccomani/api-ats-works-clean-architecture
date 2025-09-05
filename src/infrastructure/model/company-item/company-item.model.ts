import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanyItemEntity } from "../../../domain/company-item/company-item.entity";
import { SequelizeItem } from '../item/item.model';

export class SequelizeCompanyItem extends Model<CompanyItemEntity, Omit<CompanyItemEntity, 'id'>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare cmpitm_createdat: Date;
  declare cmpitm_updatedat: Date;
}

SequelizeCompanyItem.init({
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
  cmpitm_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cmpitm_updatedat: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'cmpitm_companyitems'
});
SequelizeCompanyItem.belongsTo(SequelizeItem, {
  as: 'itm',
  foreignKey: 'itm_uuid'
});
SequelizeCompanyItem.sync();