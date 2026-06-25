import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WorkHistoryEntity } from "../../../domain/work-history/work-history.entity";
import { SequelizeWork } from '../work/work.model';
import { SequelizeWorkState } from '../work-state/work-state.model';
import { SequelizeUser } from '../user/user.model';

export class SequelizeWorkHistory extends Model<WorkHistoryEntity, Omit<WorkHistoryEntity, 'id'>> {
  declare cmp_uuid: string;
  declare wrk_uuid: string;
  declare wrkh_uuid: string;
  declare wrks_uuid: string;
  declare usr_uuid: string;
  declare wrkh_comment: string;
  declare wrkh_createdat: Date;
}

SequelizeWorkHistory.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  wrk_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  wrkh_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  wrks_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wrkh_comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  wrkh_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'wrkh_createdat',
  updatedAt: false,
  tableName: 'wrkh_workshistory'
});

// Sequelize Work Foreign Key
SequelizeWorkHistory.belongsTo(SequelizeWork, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeWorkHistory.belongsTo(SequelizeWork, {
    foreignKey: "wrk_uuid",
    targetKey: "wrk_uuid",
    as: "wrk"
});

// Sequelize Work State Foreign Key
SequelizeWorkHistory.belongsTo(SequelizeWorkState, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeWorkHistory.belongsTo(SequelizeWorkState, {
    foreignKey: "wrks_uuid",
    targetKey: "wrks_uuid",
    as: "wrks"
});

// Sequelize User Foreign Key
SequelizeWorkHistory.belongsTo(SequelizeUser, {
    foreignKey: "usr_uuid",
    targetKey: "usr_uuid",
    as: "usr"
});

// Sequelize Work Histories Association on SequelizeWork
SequelizeWork.hasMany(SequelizeWorkHistory, {
    foreignKey: 'cmp_uuid',
    sourceKey: 'cmp_uuid'
});
SequelizeWork.hasMany(SequelizeWorkHistory, {
    foreignKey: 'wrk_uuid',
    sourceKey: 'wrk_uuid',
    as: 'workHistories'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeWorkHistory.sync();
}

