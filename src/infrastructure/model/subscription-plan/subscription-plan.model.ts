import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { SubscriptionPlanEntity } from "../../../domain/subscription-plan/subscription-plan.entity";

export class SequelizeSubscriptionPlan extends Model<SubscriptionPlanEntity, Omit<SubscriptionPlanEntity, 'id'>> {
  declare cmp_uuid: string;
  declare subp_uuid: string;
  declare subp_name: string;
  declare subp_description: string;
  declare subp_active: boolean;
  declare subp_createdat: Date;
  declare subp_updatedat: Date;
}

SequelizeSubscriptionPlan.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  subp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  subp_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subp_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subp_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  subp_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  subp_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'subp_createdat',
  updatedAt: 'subp_updatedat',
  tableName: 'subp_subscriptionplans'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeSubscriptionPlan.sync();
}