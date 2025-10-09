import { AddressEntity } from "../address/address.entity";
import { ModelItemEntity } from "../model-item/model-item.entity";
import { UserEntity } from "../user/user.entity";
import { WorkAttachmentEntity } from "../work-attachment/work-attachment.entity";
import { WorkDetailEntity } from "../work-detail/work-detail.entity";
import { WorkStateEntity } from "../work-state/work-state.entity";

export interface WorkEntity {
    cmp_uuid: string,
    wrk_uuid: string,
    adr_uuid: string,
    adr?: AddressEntity,
    wrk_description: string,	
	wrk_workdate: Date,
    wrk_workdateinit: Date,
    wrk_workdatefinish: Date,
	wrks_uuid: string,
    wrks?: WorkStateEntity,
    wrk_user_uuid: string,
    wrk_user?: UserEntity,
    wrk_operator_uuid: string,
    wrk_operator?: UserEntity,
    itm_uuid: string,
    cmpitm_uuid: string,
    mitm_uuid: string,
    mitm?: ModelItemEntity,
    workDetails?: WorkDetailEntity[],
    workAttachments?: WorkAttachmentEntity[],
	wrk_createdat: Date,
    wrk_updatedat: Date
}

//Update
export type WorkUpdateData = Pick<WorkEntity, 'wrk_description' | 'wrk_workdate' | 'wrk_workdateinit' | 'wrk_workdatefinish' | 'wrks_uuid' | 'wrk_user_uuid' | 'wrk_operator_uuid' | 'itm_uuid' | 'cmpitm_uuid' | 'mitm_uuid'>