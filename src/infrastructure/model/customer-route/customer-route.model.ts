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
    primaryKey: true,
    field: 'cmp_Uuid'
  },
  cus_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    field: 'cus_Uuid'
  },
  rou_uuid: {
    type: DataTypes.STRING(40),
    primaryKey: true,
    field: 'rou_Uuid'
  },
  cusrou_obs: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'cusrou_Obs'
  },
  cusrou_order: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'cusrou_Order'
  },
  cusrou_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'cusrou_Active'
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cusrou_CreatedAt',
  updatedAt: 'cusrou_UpdatedAt',
  tableName: 'cusrou_CustomerRoutes'
});
