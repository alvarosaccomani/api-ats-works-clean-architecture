import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';

export class SequelizeCustomerRoute extends Model {
  declare cmp_uuid: string;
  declare cus_uuid: string;
  declare rou_uuid: string;
  declare cusrou_obs: string | null;
  declare cusrou_order: number | null;
  declare cusrou_active: boolean;
  declare cusrou_createdat: Date;
  declare cusrou_updatedat: Date;
}

SequelizeCustomerRoute.init({
  cmp_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true
  },
  cus_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true
  },
  rou_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true
  },
  cusrou_obs: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cusrou_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cusrou_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  cusrou_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cusrou_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cusrou_createdat',
  updatedAt: 'cusrou_updatedat',
  tableName: 'cusrou_customerroutes'
});
