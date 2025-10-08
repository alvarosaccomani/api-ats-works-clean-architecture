import { CompanyEntity, CompanyUpdateData } from "../../../domain/company/company.entity";
import { CompanyRepository } from "../../../domain/company/company.repository";
import { SequelizeCompany } from "../../model/company/company.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CompanyRepository {
    async getCompanies(): Promise<CompanyEntity[] | null> {
        try {
            const companies = await SequelizeCompany.findAll();
            if(!companies) {
                throw new Error(`No hay companies`)
            };
            return companies;
        } catch (error: any) {
            console.error('Error en getCompanies:', error.message);
            throw error;
        }
    }
    async findCompanyById(cmp_uuid: string): Promise<CompanyEntity | null> {
        try {
            const company = await SequelizeCompany.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                } 
            });
            if(!company) {
                throw new Error(`No hay company con el Id: ${cmp_uuid}`);
            };
            return company.dataValues;
        } catch (error: any) {
            console.error('Error en findCompanyById:', error.message);
            throw error;
        }
    }
    async createCompany(company: CompanyEntity): Promise<CompanyEntity | null> {
        try {
            let { cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_createdat, cmp_updatedat } = company
            const result = await SequelizeCompany.create({ cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_createdat, cmp_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el company`);
            }
            let newCompany = result.dataValues as SequelizeCompany
            return newCompany;
        } catch (error: any) {
            console.error('Error en createCompany:', error.message);
            throw error;
        }
    }
    async updateCompany(cmp_uuid: string, company: CompanyUpdateData): Promise<CompanyEntity | null> {
        try {
            const [updatedCount, [updatedCompany]] = await SequelizeCompany.update(
                { 
                    cmp_address: company.cmp_address, 
                    cmp_phone: company.cmp_phone, 
                    cmp_email: company.cmp_email
                },
                { 
                    where: { cmp_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el company`);
            };
            return updatedCompany.get({ plain: true }) as CompanyEntity;
        } catch (error: any) {
            console.error('Error en updateCompany:', error.message);
            throw error;
        }
    }
    async deleteCompany(cmp_uuid: string): Promise<CompanyEntity | null> {
        try {
            const company = await this.findCompanyById(cmp_uuid);
            const result = await SequelizeCompany.destroy({ where: { cmp_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el company`);
            };
            return company;
        } catch (error: any) {
            console.error('Error en deleteCompany:', error.message);
            throw error;
        }
    }
    async findCompanyByName(cmp_name: string, excludeUuid?: string): Promise<CompanyEntity | null> {
        try {
            const whereCondition: any = { cmp_name: cmp_name ?? null };
            if (excludeUuid) {
                whereCondition.cmp_uuid = { [Op.ne]: excludeUuid };
            }
            const company = await SequelizeCompany.findOne({ 
                where: whereCondition
            });
            return company;
        } catch (error: any) {
            console.error('Error en findCompanyByName:', error.message);
            throw error;
        }
    }
    
}