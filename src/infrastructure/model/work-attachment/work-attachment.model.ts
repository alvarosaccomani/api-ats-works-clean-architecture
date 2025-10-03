import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WorkAttachmentEntity } from "../../../domain/work-attachment/work-attachment.entity";

export class SequelizeWorkAttachment extends Model<WorkAttachmentEntity, Omit<WorkAttachmentEntity, 'id'>> {
  declare cmp_uuid: string;
  declare wrk_uuid: string;
  declare wrka_uuid: string;
  declare wrka_attachmenttype: string;	
	declare wrka_filepath: string;
  declare wrka_createdat: Date;
  declare wrka_updatedat: Date;
}

SequelizeWorkAttachment.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  wrk_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  wrka_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  wrka_attachmenttype: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrka_filepath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wrka_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  wrka_updatedat: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'wrka_workattachments'
});
SequelizeWorkAttachment.sync();