import { WorkAttachmentRepository } from "../../domain/work-attachment/work-attachment.repository";
import { WorkAttachmentValue } from "../../domain/work-attachment/work-attachment.value";

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

    public async getWorkAttachments() {
        try {
            const workAttachments = this.workAttachmentRepository.getWorkAttachments();
            if(!workAttachments) {
                throw new Error('No hay work attachments.');
            }
            return workAttachments;
        } catch (error: any) {
            console.error('Error en getWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getAttachmentWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string) {
        try {
            const workAttachments = this.workAttachmentRepository.findWorkAttachmentById(cmp_uuid, wrk_uuid, wrka_uuid);
            if(!workAttachments) {
                throw new Error(`No hay work attachments con el Id: ${cmp_uuid}, ${wrk_uuid}, ${wrka_uuid}`);
            }
            return workAttachments;
        } catch (error: any) {
            console.error('Error en getAttachmentWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createWorkAttachment({ cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath, wrka_createdat, wrka_updatedat } : { cmp_uuid: string, wrk_uuid: string, wrka_uuid: string, wrka_attachmenttype: string, wrka_filepath: string, wrka_createdat: Date, wrka_updatedat: Date }) {
        try {
            const workAttachmentsValue = new WorkAttachmentValue({ cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath, wrka_createdat, wrka_updatedat });
            const workAttachmentsCreated = await this.workAttachmentRepository.createWorkAttachment(workAttachmentsValue);
            if(!workAttachmentsCreated) {
                throw new Error(`No se pudo insertar el work attachment.`);
            }
            return workAttachmentsCreated;
        } catch (error: any) {
            console.error('Error en createWorkAttachments (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string, { wrka_attachmenttype, wrka_filepath, wrka_createdat, wrka_updatedat } : { wrka_attachmenttype: string, wrka_filepath: string, wrka_createdat: Date, wrka_updatedat: Date }) {
        try {
            const workAttachmentsUpdated = await this.workAttachmentRepository.updateWorkAttachment(cmp_uuid, wrk_uuid, wrka_uuid, { cmp_uuid, wrk_uuid, wrka_uuid, wrka_attachmenttype, wrka_filepath, wrka_createdat, wrka_updatedat });
            if(!workAttachmentsUpdated) {
                throw new Error(`No se pudo actualizar el workd etail.`);
            }
            return workAttachmentsUpdated;
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
            return workAttachmentsDeleted;
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