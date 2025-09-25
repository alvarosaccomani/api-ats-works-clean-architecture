import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WorkEntity } from "../../../domain/work/work.entity";
import { SequelizeAddress } from '../address/address.model';
import { SequelizeWorkState } from '../work-state/work-state.model';
import { SequelizeUser } from '../user/user.model';
import { SequelizeModelItem } from '../model-item/model-item.model';
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

//Sequelize Address Foreign Key
SequelizeWork.belongsTo(SequelizeAddress, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeWork.belongsTo(SequelizeAddress, {
    foreignKey: 'adr_uuid',
    targetKey: "adr_uuid",
    as: 'adr'
});

//Sequelize Work State Foreign Key
SequelizeWork.belongsTo(SequelizeWorkState, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeWork.belongsTo(SequelizeWorkState, {
    foreignKey: 'wrks_uuid',
    targetKey: "wrks_uuid",
    as: 'wrks'
});

//Sequelize User Work Foreign Key
SequelizeWork.belongsTo(SequelizeUser, {
    foreignKey: 'wrk_user_uuid',
    targetKey: "usr_uuid",
    as: 'wrk_user'
});

//Sequelize Operator Work Foreign Key
SequelizeWork.belongsTo(SequelizeUser, {
    foreignKey: 'wrk_operator_uuid',
    targetKey: "usr_uuid",
    as: 'wrk_operator'
});

//Sequelize Model Item Foreign Key
SequelizeWork.belongsTo(SequelizeModelItem, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeWork.belongsTo(SequelizeModelItem, {
    foreignKey: "itm_uuid",
    targetKey: "itm_uuid"
});
SequelizeWork.belongsTo(SequelizeModelItem, {
    foreignKey: "cmpitm_uuid",
    targetKey: "cmpitm_uuid"
});
SequelizeWork.belongsTo(SequelizeModelItem, {
    foreignKey: "mitm_uuid",
    targetKey: "mitm_uuid",
    as: 'mitm'
});

//Sequelize Work Detail Foreign Key
SequelizeWork.hasMany(SequelizeWorkDetail, {
    foreignKey: 'cmp_uuid',
    sourceKey: 'cmp_uuid'
});
SequelizeWork.hasMany(SequelizeWorkDetail, {
    foreignKey: 'wrk_uuid',
    sourceKey: 'wrk_uuid',
    as: 'workDetails'
});
SequelizeWork.sync();