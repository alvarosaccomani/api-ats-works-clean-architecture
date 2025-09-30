import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CollectionFormEntity } from "../../../domain/collection-form/collection-form.entity";

export class SequelizeCollectionForm extends Model<CollectionFormEntity/*, Omit<CollectionFormEntity, 'id'>*/> {
  declare cmp_uuid: string;
  declare cfrm_uuid: string;
  declare cfrm_name: string;
  declare cfrm_order: number;
  declare cfrm_bkcolor: string;
  declare cfrm_frcolor: string;
  declare cfrm_active: boolean;
  declare cfrm_createdat: Date;
  declare cfrm_updatedat: Date;
}

SequelizeCollectionForm.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  }, 
  cfrm_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  }, 
  cfrm_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cfrm_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cfrm_bkcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cfrm_frcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cfrm_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  cfrm_createdat: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cfrm_updatedat: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false,
  tableName: 'cfrm_collectionforms'
});

SequelizeCollectionForm.sync();