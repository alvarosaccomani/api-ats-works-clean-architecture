import { RouteEntity } from "../route/route.entity"

export interface CustomerEntity {
    cmp_uuid: string,
    cus_uuid: string,
    cus_fullname: string,
    cus_email: string,
    cus_phone: string,
    cus_dateofbirth: Date,
    rou_uuid: string,
    rou?: RouteEntity
    pmt_uuid: string,
    usr_uuid: string,
    cus_createdat: Date,
    cus_updatedat: Date
}

//Update
export type CustomerUpdateData = Pick<CustomerEntity, 'cus_fullname' | 'cus_email' | 'cus_phone' | 'cus_dateofbirth' | 'rou_uuid' | 'pmt_uuid' | 'usr_uuid'>