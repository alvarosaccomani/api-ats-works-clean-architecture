import { WorkAttachmentEntity, WorkAttachmentUpdateData } from "../../../domain/work-attachment/work-attachment.entity";
import { WorkAttachmentRepository } from "../../../domain/work-attachment/work-attachment.repository";
import { SequelizeWorkAttachment } from "../../model/work-attachment/work-attachment.model";

export class SequelizeRepository implements WorkAttachmentRepository {
    async getWorkAttachments(cmp_uuid: string): Promise<WorkAttachmentEntity[] | null> {
        try {
            const workAttachments = await SequelizeWorkAttachment.findAll({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!workAttachments) {
                throw new Error(`No hay work attachments`)
            };
            return workAttachments;
        } catch (error: any) {
            console.error('Error en getWorkAttachments:', error.message);
            throw error;
        }
    }
    async findWorkAttachmentById(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string): Promise<WorkAttachmentEntity | null> {
        try {
            const workAttachment = await SequelizeWorkAttachment.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null,
                    wrka_uuid: wrka_uuid ?? null
                } 
            });
            if(!workAttachment) {
                throw new Error(`No hay work attachment con el Id: ${cmp_uuid}`);
            };
            return workAttachment.dataValues;
        } catch (error: any) {
            console.error('Error en findWorkAttachmentById:', error.message);
            throw error;
        }
    }
    async createWorkAttachment(workAttachment: WorkAttachmentEntity): Promise<WorkAttachmentEntity | null> {
        try {
            let { cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath, wrka_createdat, wrka_updatedat } = workAttachment
            const result = await SequelizeWorkAttachment.create({ cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath, wrka_createdat, wrka_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el work attachment`);
            }
            let newWorkAttachment = result.dataValues as SequelizeWorkAttachment
            return newWorkAttachment;
        } catch (error: any) {
            console.error('Error en createWorkAttachment:', error.message);
            throw error;
        }
    }
    async updateWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string, workAttachment: WorkAttachmentUpdateData): Promise<WorkAttachmentEntity | null> {
        try {
            const [updatedCount, [updatedWorkAttachment]] = await SequelizeWorkAttachment.update(
                { 
                    wrka_attachmenttype: workAttachment.wrka_attachmenttype,
                    wrka_filepath: workAttachment.wrka_filepath
                }, 
                { 
                    where: { cmp_uuid, wrk_uuid, wrka_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el work attachment`);
            };
            return updatedWorkAttachment.get({ plain: true }) as WorkAttachmentEntity;
        } catch (error: any) {
            console.error('Error en updateWorkAttachment:', error.message);
            throw error;
        }
    }
    async deleteWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string): Promise<WorkAttachmentEntity | null> {
        try {
            const workattachment = await this.findWorkAttachmentById(cmp_uuid, wrk_uuid, wrka_uuid);
            const result = await SequelizeWorkAttachment.destroy({ where: { cmp_uuid, wrk_uuid, wrka_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el work attachment`);
            };
            return workattachment;
        } catch (error: any) {
            console.error('Error en deleteWorkAttachment:', error.message);
            throw error;
        }
    }
    async existWorkAttachment(cmp_uuid: string, wrk_uuid: string): Promise<WorkAttachmentEntity | null> {
        try {
            const workattachment = await SequelizeWorkAttachment.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    wrk_uuid: wrk_uuid ?? null
                } 
            });
            return workattachment;
        } catch (error: any) {
            console.error('Error en deleteWorkAttachment:', error.message);
            throw error;
        }
    }
    
}