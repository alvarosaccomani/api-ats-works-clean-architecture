import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { UserRolCompanyEntity } from "../../../domain/user-rol-company/user-rol-company.entity";
import { SequelizeCompany } from '../company/company.model';
import { SequelizeUser } from '../user/user.model';
import { SequelizeRol } from '../rol/rol.model';

export class SequelizeUserRolCompany extends Model<UserRolCompanyEntity, Omit<UserRolCompanyEntity, 'id'>> {
  declare cmp_uuid: string;
  declare usrrolcmp_uuid: string;
  declare usr_uuid: string;
  declare rol_uuid: string;
  declare usrrolcmp_createdat: Date;
  declare usrrolcmp_updatedat: Date;
}

SequelizeUserRolCompany.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  usrrolcmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  rol_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usrrolcmp_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  usrrolcmp_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'usrrolcmp_createdat',
  updatedAt: 'usrrolcmp_updatedat',
  tableName: 'usrrolcmp_usersrolescompanies'
});
SequelizeUserRolCompany.belongsTo(SequelizeCompany, {
  as: 'cmp',
  foreignKey: 'cmp_uuid'
});
SequelizeUserRolCompany.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});
SequelizeUserRolCompany.belongsTo(SequelizeRol, {
  as: 'rol',
  foreignKey: 'rol_uuid'
});
SequelizeUserRolCompany.sync();