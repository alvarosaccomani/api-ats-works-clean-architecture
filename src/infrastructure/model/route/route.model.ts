import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { RouteEntity } from "../../../domain/route/route.entity";

export class SequelizeRoute extends Model<RouteEntity, Omit<RouteEntity, 'id'>> {
  declare cmp_uuid: string;
  declare rou_uuid: string;
  declare rou_name: string;
  declare rou_order: number;
  declare rou_description: string;
  declare rou_bkcolor: string;
  declare rou_frcolor: string;
  declare rou_active: boolean;
  declare rou_createdat: Date;
  declare rou_updatedat: Date;
}

SequelizeRoute.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  rou_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  rou_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rou_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  rou_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rou_bkcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rou_frcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rou_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  rou_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rou_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'rou_createdat',
  updatedAt: 'rou_updatedat',
  tableName: 'rou_routes'
});