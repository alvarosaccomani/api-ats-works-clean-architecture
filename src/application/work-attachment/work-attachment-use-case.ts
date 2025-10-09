import { WorkAttachmentRepository } from "../../domain/work-attachment/work-attachment.repository";
import { WorkAttachmentValue } from "../../domain/work-attachment/work-attachment.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class WorkAttachmentUseCase {
    constructor(
        private readonly workAttachmentRepository: WorkAttachmentRepository
    ) {
        this.getWorkAttachments = this.getWorkAttachments.bind(this);
        this.getAttachmentWorkAttachment = this.getAttachmentWorkAttachment.bind(this);
        this.createWorkAttachment = this.createWorkAttachment.bind(this);
        this.updateWorkAttachment = this.updateWorkAttachment.bind(this);
        this.deleteWorkAttachment = this.deleteWorkAttachment.bind(this);
    }

    public async getWorkAttachments(cmp_uuid: string) {
        try {
            const workAttachments = await this.workAttachmentRepository.getWorkAttachments(cmp_uuid);
            if(!workAttachments) {
                throw new Error('No hay work attachments.');
            }
            return workAttachments.map((workAttachment) => ({
                cmp_uuid: workAttachment.cmp_uuid,
                wrk_uuid: workAttachment.wrk_uuid,
                wrka_uuid: workAttachment.wrka_uuid,
                wrka_attachmenttype: workAttachment.wrka_attachmenttype,
                wrka_filepath: workAttachment.wrka_filepath,
                wrka_createdat: TimezoneConverter.toIsoStringInTimezone(workAttachment.wrka_createdat, 'America/Argentina/Buenos_Aires'),
                wrka_updatedat: TimezoneConverter.toIsoStringInTimezone(workAttachment.wrka_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getAttachmentWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string) {
        try {
            const workAttachments = await this.workAttachmentRepository.findWorkAttachmentById(cmp_uuid, wrk_uuid, wrka_uuid);
            if(!workAttachments) {
                throw new Error(`No hay work attachments con el Id: ${cmp_uuid}, ${wrk_uuid}, ${wrka_uuid}`);
            }
            return {
                cmp_uuid: workAttachments.cmp_uuid,
                wrk_uuid: workAttachments.wrk_uuid,
                wrka_uuid: workAttachments.wrka_uuid,
                wrka_attachmenttype: workAttachments.wrka_attachmenttype,
                wrka_filepath: workAttachments.wrka_filepath,
                wrka_createdat: TimezoneConverter.toIsoStringInTimezone(workAttachments.wrka_createdat, 'America/Argentina/Buenos_Aires'),
                wrka_updatedat: TimezoneConverter.toIsoStringInTimezone(workAttachments.wrka_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getAttachmentWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWorkAttachment({ cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath } : { cmp_uuid: string, wrk_uuid: string, wrka_uuid: string, wrka_attachmenttype: string, wrka_filepath: string }) {
        try {
            const workAttachmentsValue = new WorkAttachmentValue({ cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath });
            const workAttachmentsCreated = await this.workAttachmentRepository.createWorkAttachment(workAttachmentsValue);
            if(!workAttachmentsCreated) {
                throw new Error(`No se pudo insertar el work attachment.`);
            }
            return {
                cmp_uuid: workAttachmentsCreated.cmp_uuid,
                wrk_uuid: workAttachmentsCreated.wrk_uuid,
                wrka_uuid: workAttachmentsCreated.wrka_uuid,
                wrka_attachmenttype: workAttachmentsCreated.wrka_attachmenttype,
                wrka_filepath: workAttachmentsCreated.wrka_filepath,
                wrka_createdat: TimezoneConverter.toIsoStringInTimezone(workAttachmentsCreated.wrka_createdat, 'America/Argentina/Buenos_Aires'),
                wrka_updatedat: TimezoneConverter.toIsoStringInTimezone(workAttachmentsCreated.wrka_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string, { wrka_attachmenttype, wrka_filepath } : { wrka_attachmenttype: string, wrka_filepath: string }) {
        try {
            const workAttachmentsUpdated = await this.workAttachmentRepository.updateWorkAttachment(cmp_uuid, wrk_uuid, wrka_uuid, { wrka_attachmenttype, wrka_filepath });
            if(!workAttachmentsUpdated) {
                throw new Error(`No se pudo actualizar el workd etail.`);
            }
            return {
                cmp_uuid: workAttachmentsUpdated.cmp_uuid,
                wrk_uuid: workAttachmentsUpdated.wrk_uuid,
                wrka_uuid: workAttachmentsUpdated.wrka_uuid,
                wrka_attachmenttype: workAttachmentsUpdated.wrka_attachmenttype,
                wrka_filepath: workAttachmentsUpdated.wrka_filepath,
                wrka_createdat: TimezoneConverter.toIsoStringInTimezone(workAttachmentsUpdated.wrka_createdat, 'America/Argentina/Buenos_Aires'),
                wrka_updatedat: TimezoneConverter.toIsoStringInTimezone(workAttachmentsUpdated.wrka_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string) {
        try {
            const workAttachmentsDeleted = await this.workAttachmentRepository.deleteWorkAttachment(cmp_uuid, wrk_uuid, wrka_uuid);
            if(!workAttachmentsDeleted) {
                throw new Error(`No se pudo eliminar el work attachment.`);
            }
            return {
                cmp_uuid: workAttachmentsDeleted.cmp_uuid,
                wrk_uuid: workAttachmentsDeleted.wrk_uuid,
                wrka_uuid: workAttachmentsDeleted.wrka_uuid,
                wrka_attachmenttype: workAttachmentsDeleted.wrka_attachmenttype,
                wrka_filepath: workAttachmentsDeleted.wrka_filepath,
                wrka_createdat: TimezoneConverter.toIsoStringInTimezone(workAttachmentsDeleted.wrka_createdat, 'America/Argentina/Buenos_Aires'),
                wrka_updatedat: TimezoneConverter.toIsoStringInTimezone(workAttachmentsDeleted.wrka_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string) {
        try {
            const workAttachment = this.workAttachmentRepository.existWorkAttachment(cmp_uuid, wrk_uuid, wrka_uuid);
            return workAttachment;
        } catch (error: any) {
            console.error('Error en existWorkAttachment (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}