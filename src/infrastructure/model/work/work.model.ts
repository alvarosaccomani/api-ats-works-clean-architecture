import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WorkEntity } from "../../../domain/work/work.entity";
import { SequelizeWorkDetail } from "../work-detail/work-detail.model";

export class SequelizeWork extends Model<WorkEntity, Omit<WorkEntity, 'id'>> {
  declare cmp_uuid: string;
  declare wrk_uuid: string;
  declare adr_uuid: string;
  declare wrk_description: string;	
	declare wrk_workdate: Date;
  declare wrk_workdateinit: Date;
  declare wrk_workdatefinish: Date;
	declare wrks_uuid: string;
  declare wrk_user_uuid: string;
  declare wrk_operator_uuid: string;
  declare itm_uuid: string;
  declare cmpitm_uuid: string;
  declare mitm_uuid: string;
	declare wrk_createdat: Date;
  declare wrk_updatedat: Date;
}

SequelizeWork.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  wrk_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  adr_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrk_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrk_workdate: {
    type: DataTypes.DATE,
    allowNull: true
  },
	wrk_workdateinit: {
    type: DataTypes.DATE,
    allowNull: true
  },
  wrk_workdatefinish: {
    type: DataTypes.DATE,
    allowNull: true
  },
	wrks_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrk_user_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrk_operator_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  itm_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmpitm_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mitm_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrk_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  wrk_updatedat: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'wrk_works'
});
SequelizeWork.hasMany(SequelizeWorkDetail, {
    foreignKey: 'wrk_uuid',
    sourceKey: 'wrk_uuid',
    as: 'detailWorks'
});
SequelizeWork.sync();