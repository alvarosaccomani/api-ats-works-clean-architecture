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
    wrk_operator_uuid1: string,
    wrk_operator1?: UserEntity,
    wrk_operator_uuid2: string,
    wrk_operator2?: UserEntity,
    wrk_operator_uuid3: string,
    wrk_operator3?: UserEntity,
    wrk_operator_uuid4: string,
    wrk_operator4?: UserEntity,
    wrk_customer: string,
    wrk_address: string,
    wrk_coordinates: string,
    wrk_phone: string,
    wrk_route: string,
    twrk_uuid: string,
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
export type WorkUpdateData = Pick<WorkEntity, 'wrk_description' | 'wrk_workdate' | 'wrk_workdateinit' | 'wrk_workdatefinish' | 'wrks_uuid' | 'wrk_user_uuid' | 'wrk_operator_uuid1' | 'wrk_operator_uuid2' | 'wrk_operator_uuid3' | 'wrk_operator_uuid4' | 'wrk_customer' | 'wrk_address' | 'wrk_coordinates' | 'wrk_phone' | 'wrk_route' | 'twrk_uuid' | 'itm_uuid' | 'cmpitm_uuid' | 'mitm_uuid'>