import { CompanyEntity } from "./company.entity";

export interface CompanyRepository {
    getCompanies(): Promise<CompanyEntity[] | null>;
    findCompanyById(cmp_uuid: string): Promise<CompanyEntity | null>;
    createCompany(company: CompanyEntity): Promise<CompanyEntity | null>;
    updateCompany(cmp_uuid: string, company: CompanyEntity): Promise<CompanyEntity | null>;
    deleteCompany(cmp_uuid: string): Promise<CompanyEntity | null>;
    findCompanyByName(cmp_name: string, excludeUuid?: string | null): Promise<CompanyEntity | null>;
}