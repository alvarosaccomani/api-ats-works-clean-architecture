import { CustomerEntity } from "./customer.entity";

export interface CustomerRepository {
    getCustomers(): Promise<CustomerEntity[] | null>;
    findCustomerById(cmp_uuid: string, cus_uuid: string): Promise<CustomerEntity | null>;
    createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null>;
    updateCustomer(cmp_uuid: string, cus_uuid: string, customer: CustomerEntity): Promise<CustomerEntity | null>;
    deleteCustomer(cmp_uuid: string, cus_uuid: string): Promise<CustomerEntity | null>;
    findCustomerByName(cmp_uuid: string, cus_fullname: string, excludeUuid?: string | null): Promise<CustomerEntity | null>;
}