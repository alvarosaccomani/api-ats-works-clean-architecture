import { CompanyItemEntity } from "./company-item.entity";

export interface CompanyItemRepository {
    getCompanyItems(): Promise<CompanyItemEntity[] | null>;
    findCompanyItemById(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string): Promise<CompanyItemEntity | null>;
    createCompanyItem(companyItem: CompanyItemEntity): Promise<CompanyItemEntity | null>;
    updateCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string, companyItem: CompanyItemEntity): Promise<CompanyItemEntity | null>;
    deleteCompanyItem(cmp_uuid: string, itm_uuid: string, cmpitm_uuid: string): Promise<CompanyItemEntity | null>;
    existCompanyItem(cmp_uuid: string, itm_uuid: string): Promise<CompanyItemEntity | null>;
}