import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WorkDetailEntity } from "../../../domain/work-detail/work-detail.entity";
import { SequelizeDataType } from '../data-type/data-type.model';

export class SequelizeWorkDetail extends Model<WorkDetailEntity, Omit<WorkDetailEntity, 'id'>> {
  declare cmp_uuid: string;
  declare wrk_uuid: string;
  declare wrkd_uuid: string;
  declare wrkd_key: string;
	declare wrkd_name: string;
  declare wrkd_description: string;
  declare dtp_uuid: string;
  declare wrkd_order: string;
	declare wrkd_value: string;
	declare wrkd_createdat: Date;
  declare wrkd_updatedat: Date;
}

SequelizeWorkDetail.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  wrk_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  wrkd_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrkd_key: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrkd_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
	wrkd_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dtp_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
	wrkd_value: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrkd_order: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrkd_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  wrkd_updatedat: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'wrkd_worksdetails'
});
SequelizeWorkDetail.belongsTo(SequelizeDataType, {
    foreignKey: 'dtp_uuid',
    as: 'dtp'
});
SequelizeWorkDetail.sync();