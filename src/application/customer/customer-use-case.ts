import { CustomerRepository } from "../../domain/customer/customer.repository";
import { CustomerValue } from "../../domain/customer/customer.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

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

    public async getCustomers(cmp_uuid: string) {
        try {
            const typeCustomers = await this.customerRepository.getCustomers(cmp_uuid);
            if(!typeCustomers) {
                throw new Error('No hay customers.');
            }
            return typeCustomers.map((customer) => ({
                cmp_uuid: customer.cmp_uuid,
                cus_uuid: customer.cus_uuid,
                cus_fullname: customer.cus_fullname,
                cus_email: customer.cus_email,
                cus_phone: customer.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customer.cus_dateofbirth, 'America/Buenos_Aires'),
                cfrm_uuid: customer.cfrm_uuid,
                usr_uuid: customer.usr_uuid,
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customer.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customer.cus_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCustomers (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCustomer(cmp_uuid: string, cus_uuid: string) {
        try {
            const customer = await this.customerRepository.findCustomerById(cmp_uuid, cus_uuid);
            if(!customer) {
                throw new Error(`No hay customer con el Id: ${cmp_uuid}, ${cus_uuid}`);
            }
            return {
                cmp_uuid: customer.cmp_uuid,
                cus_uuid: customer.cus_uuid,
                cus_fullname: customer.cus_fullname,
                cus_email: customer.cus_email,
                cus_phone: customer.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customer.cus_dateofbirth, 'America/Buenos_Aires'),
                cfrm_uuid: customer.cfrm_uuid,
                usr_uuid: customer.usr_uuid,
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customer.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customer.cus_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCustomer({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, cfrm_uuid, usr_uuid, cus_createdat, cus_updatedat } : { cmp_uuid: string, cus_uuid: string, cus_fullname: string, cus_email: string, cus_phone: string, cus_dateofbirth: Date, cfrm_uuid: string, usr_uuid: string, cus_createdat: Date, cus_updatedat: Date }) {
        try {
            const customerValue = new CustomerValue({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, cfrm_uuid, usr_uuid, cus_createdat, cus_updatedat });
            const customerCreated = await this.customerRepository.createCustomer(customerValue);
            if(!customerCreated) {
                throw new Error(`No se pudo insertar el customer.`);
            }
            return {
                cmp_uuid: customerCreated.cmp_uuid,
                cus_uuid: customerCreated.cus_uuid,
                cus_fullname: customerCreated.cus_fullname,
                cus_email: customerCreated.cus_email,
                cus_phone: customerCreated.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customerCreated.cus_dateofbirth, 'America/Buenos_Aires'),
                cfrm_uuid: customerCreated.cfrm_uuid,
                usr_uuid: customerCreated.usr_uuid,
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customerCreated.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customerCreated.cus_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCustomer(cmp_uuid: string, cus_uuid: string, { cus_fullname, cus_email, cus_phone, cus_dateofbirth, cfrm_uuid, usr_uuid, cus_createdat, cus_updatedat } : { cus_fullname: string, cus_email: string, cus_phone: string, cus_dateofbirth: Date, cfrm_uuid: string, usr_uuid: string, cus_createdat: Date, cus_updatedat: Date }) {
        try {
            const customerUpdated = await this.customerRepository.updateCustomer(cmp_uuid, cus_uuid, { cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, cfrm_uuid, usr_uuid, cus_createdat, cus_updatedat });
            if(!customerUpdated) {
                throw new Error(`No se pudo actualizar el customer.`);
            }
            return {
                cmp_uuid: customerUpdated.cmp_uuid,
                cus_uuid: customerUpdated.cus_uuid,
                cus_fullname: customerUpdated.cus_fullname,
                cus_email: customerUpdated.cus_email,
                cus_phone: customerUpdated.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customerUpdated.cus_dateofbirth, 'America/Buenos_Aires'),
                cfrm_uuid: customerUpdated.cfrm_uuid,
                usr_uuid: customerUpdated.usr_uuid,
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customerUpdated.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customerUpdated.cus_updatedat, 'America/Buenos_Aires')
            };
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
            return {
                cmp_uuid: customerDeleted.cmp_uuid,
                cus_uuid: customerDeleted.cus_uuid,
                cus_fullname: customerDeleted.cus_fullname,
                cus_email: customerDeleted.cus_email,
                cus_phone: customerDeleted.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customerDeleted.cus_dateofbirth, 'America/Buenos_Aires'),
                cfrm_uuid: customerDeleted.cfrm_uuid,
                usr_uuid: customerDeleted.usr_uuid,
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customerDeleted.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customerDeleted.cus_updatedat, 'America/Buenos_Aires')
            };
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