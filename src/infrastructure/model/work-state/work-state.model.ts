import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WorkStateEntity } from "../../../domain/work-state/work-state.entity";

export class SequelizeWorkState extends Model<WorkStateEntity, Omit<WorkStateEntity, 'id'>> {
  declare cmp_uuid: string;
  declare wrks_uuid: string;
  declare wrks_name: string;
  declare wrks_description: string;
  declare wrks_bkcolor: string;
  declare wrks_frcolor: string;
  declare wrks_createdat: Date;
  declare wrks_updatedat: Date;
}

SequelizeWorkState.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  wrks_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  wrks_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrks_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrks_bkcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrks_frcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrks_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  wrks_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'wrks_createdat',
  updatedAt: 'wrks_updatedat',
  tableName: 'wrks_workstates'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeWorkState.sync();
}