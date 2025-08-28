import { WorkAttachmentEntity } from "./work-attachment.entity";

export interface WorkAttachmentRepository {
    getWorkAttachments(): Promise<WorkAttachmentEntity[] | null>;
    findWorkAttachmentById(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string): Promise<WorkAttachmentEntity | null>;
    createWorkAttachment(workattachment: WorkAttachmentEntity): Promise<WorkAttachmentEntity | null>;
    updateWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string, workattachment: WorkAttachmentEntity): Promise<WorkAttachmentEntity | null>;
    deleteWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string): Promise<WorkAttachmentEntity | null>;
    existWorkAttachment(cmp_uuid: string, wrk_uuid: string, wrka_uuid: string): Promise<WorkAttachmentEntity | null>;
}