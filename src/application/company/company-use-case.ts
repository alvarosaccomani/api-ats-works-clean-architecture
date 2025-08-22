import { CompanyRepository } from "../../domain/company/company.repository";
import { CompanyValue } from "../../domain/company/company.value";

export class CompanyUseCase {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {
        this.getCompanies = this.getCompanies.bind(this);
        this.getDetailCompany = this.getDetailCompany.bind(this);
        this.createCompany = this.createCompany.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.findCompanyByName = this.findCompanyByName.bind(this);
    }

    public async getCompanies() {
        try {
            const typeCompanies = this.companyRepository.getCompanies();
            if(!typeCompanies) {
                throw new Error('No hay companies.');
            }
            return typeCompanies;
        } catch (error: any) {
            console.error('Error en getCompanies (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCompany(cmp_uuid: string) {
        try {
            const company = this.companyRepository.findCompanyById(cmp_uuid);
            if(!company) {
                throw new Error(`No hay company con el Id: ${cmp_uuid}`);
            }
            return company;
        } catch (error: any) {
            console.error('Error en getDetailCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCompany({ cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_createdat, cmp_updatedat } : { cmp_uuid: string, cmp_name: string, cmp_address: string, cmp_phone: string, cmp_email: string, cmp_createdat: Date, cmp_updatedat: Date }) {
        try {
            const companyValue = new CompanyValue({ cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_createdat, cmp_updatedat });
            const companyCreated = await this.companyRepository.createCompany(companyValue);
            if(!companyCreated) {
                throw new Error(`No se pudo insertar el company.`);
            }
            return companyCreated;
        } catch (error: any) {
            console.error('Error en createCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCompany(cmp_uuid: string, { cmp_name, cmp_address, cmp_phone, cmp_email, cmp_createdat, cmp_updatedat } : { cmp_name: string, cmp_address: string, cmp_phone: string, cmp_email: string, cmp_createdat: Date, cmp_updatedat: Date }) {
        try {
            const companyUpdated = await this.companyRepository.updateCompany(cmp_uuid, { cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_createdat, cmp_updatedat });
            if(!companyUpdated) {
                throw new Error(`No se pudo actualizar el company.`);
            }
            return companyUpdated;
        } catch (error: any) {
            console.error('Error en updateCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCompany(cmp_uuid: string) {
        try {
            const companyDeleted = await this.companyRepository.deleteCompany(cmp_uuid);
            if(!companyDeleted) {
                throw new Error(`No se pudo eliminar el company.`);
            }
            return companyDeleted;
        } catch (error: any) {
            console.error('Error en deleteCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCompanyByName(cmp_name: string, excludeUuid?: string) {
        try {
            const company = await this.companyRepository.findCompanyByName(cmp_name, excludeUuid)
            if(company) {
                throw new Error(`Ya existe un company con el nombre ${cmp_name}.`);
            }
            return company
        } catch (error: any) {
            console.error('Error en findCompanyByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}