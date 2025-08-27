import { CustomerRepository } from "../../domain/customer/customer.repository";
import { CustomerValue } from "../../domain/customer/customer.value";

export class CustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository
    ) {
        this.getCustomers = this.getCustomers.bind(this);
        this.getDetailCustomer = this.getDetailCustomer.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.findCustomerByName = this.findCustomerByName.bind(this);
    }

    public async getCustomers() {
        try {
            const typeCustomers = this.customerRepository.getCustomers();
            if(!typeCustomers) {
                throw new Error('No hay customers.');
            }
            return typeCustomers;
        } catch (error: any) {
            console.error('Error en getCustomers (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCustomer(cmp_uuid: string, cus_uuid: string) {
        try {
            const customer = this.customerRepository.findCustomerById(cmp_uuid, cus_uuid);
            if(!customer) {
                throw new Error(`No hay customer con el Id: ${cmp_uuid}, ${cus_uuid}`);
            }
            return customer;
        } catch (error: any) {
            console.error('Error en getDetailCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCustomer({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat } : { cmp_uuid: string, cus_uuid: string, cus_fullname: string, cus_email: string, cus_phone: string, usr_uuid: string, cus_createdat: Date, cus_updatedat: Date }) {
        try {
            const customerValue = new CustomerValue({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat });
            const customerCreated = await this.customerRepository.createCustomer(customerValue);
            if(!customerCreated) {
                throw new Error(`No se pudo insertar el customer.`);
            }
            return customerCreated;
        } catch (error: any) {
            console.error('Error en createCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCustomer(cmp_uuid: string, cus_uuid: string, { cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat } : { cus_fullname: string, cus_email: string, cus_phone: string, usr_uuid: string, cus_createdat: Date, cus_updatedat: Date }) {
        try {
            const customerUpdated = await this.customerRepository.updateCustomer(cmp_uuid, cus_uuid, { cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat });
            if(!customerUpdated) {
                throw new Error(`No se pudo actualizar el customer.`);
            }
            return customerUpdated;
        } catch (error: any) {
            console.error('Error en updateCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCustomer(cmp_uuid: string, cus_uuid: string) {
        try {
            const customerDeleted = await this.customerRepository.deleteCustomer(cmp_uuid, cus_uuid);
            if(!customerDeleted) {
                throw new Error(`No se pudo eliminar el customer.`);
            }
            return customerDeleted;
        } catch (error: any) {
            console.error('Error en deleteCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCustomerByName(cmp_uuid: string, cus_fullname: string, excludeUuid?: string) {
        try {
            const customer = await this.customerRepository.findCustomerByName(cmp_uuid, cus_fullname, excludeUuid)
            if(customer) {
                throw new Error(`Ya existe un customer con el nombre ${cus_fullname}.`);
            }
            return customer
        } catch (error: any) {
            console.error('Error en findCustomerByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}