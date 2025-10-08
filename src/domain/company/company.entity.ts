export interface CompanyEntity {
    cmp_uuid: string,
    cmp_name: string,
    cmp_address: string,
    cmp_phone: string,
    cmp_email: string,
    cmp_createdat: Date,
    cmp_updatedat: Date
}

//Update
export type CompanyUpdateData = Pick<CompanyEntity, 'cmp_address' | 'cmp_phone' | 'cmp_email'>