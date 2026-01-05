import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { TypeWorkEntity } from "../../../domain/type-work/type-work.entity";

export class SequelizeTypeWork extends Model<TypeWorkEntity, Omit<TypeWorkEntity, 'id'>> {
  declare cmp_uuid: string;
  declare twrk_uuid: string;
  declare twrk_name: string;
  declare twrk_description: string;
  declare twrk_createdat: Date;
  declare twrk_updatedat: Date;
}

SequelizeTypeWork.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  twrk_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  twrk_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  twrk_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  twrk_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  twrk_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'twrk_createdat',
  updatedAt: 'twrk_updatedat',
  tableName: 'twrk_typeworks'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeTypeWork.sync();
}