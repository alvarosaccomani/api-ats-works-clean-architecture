import { CustomerEntity } from "../../../domain/customer/customer.entity";
import { CustomerRepository } from "../../../domain/customer/customer.repository";
import { SequelizeCustomer } from "../../model/customer/customer.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CustomerRepository {
    async getCustomers(): Promise<CustomerEntity[] | null> {
        try {
            const customers = await SequelizeCustomer.findAll();
            if(!customers) {
                throw new Error(`No hay customers`)
            };
            return customers;
        } catch (error: any) {
            console.error('Error en getCustomers:', error.message);
            throw error;
        }
    }
    async findCustomerById(cmp_uuid: string, cus_uuid: string): Promise<CustomerEntity | null> {
        try {
            const customer = await SequelizeCustomer.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cus_uuid: cus_uuid ?? null
                } 
            });
            if(!customer) {
                throw new Error(`No hay customer con el Id: ${cmp_uuid}, ${cus_uuid}`);
            };
            return customer.dataValues;
        } catch (error: any) {
            console.error('Error en findCustomerById:', error.message);
            throw error;
        }
    }
    async createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null> {
        try {
            let { cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat } = customer
            const result = await SequelizeCustomer.create({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el customer`);
            }
            let newCustomer = result.dataValues as SequelizeCustomer
            return newCustomer;
        } catch (error: any) {
            console.error('Error en createCustomer:', error.message);
            throw error;
        }
    }
    async updateCustomer(cmp_uuid: string, cus_uuid: string, customer: CustomerEntity): Promise<CustomerEntity | null> {
        try {
            let { cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat } = customer
            const result = await SequelizeCustomer.update({ cus_fullname, cus_email, cus_phone, usr_uuid, cus_createdat, cus_updatedat }, { where: { cmp_uuid, cus_uuid } });
            if(result[0] < 1) {
                throw new Error(`No se ha actualizado el customer`);
            };
            return customer;
        } catch (error: any) {
            console.error('Error en updateCustomer:', error.message);
            throw error;
        }
    }
    async deleteCustomer(cmp_uuid: string, cus_uuid: string): Promise<CustomerEntity | null> {
        try {
            const customer = await this.findCustomerById(cmp_uuid, cus_uuid);
            const result = await SequelizeCustomer.destroy({ where: { cmp_uuid, cus_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el customer`);
            };
            return customer;
        } catch (error: any) {
            console.error('Error en deleteCustomer:', error.message);
            throw error;
        }
    }
    async findCustomerByName(cmp_uuid: string, cus_uuid: string, excludeUuid?: string): Promise<CustomerEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                cus_uuid: cus_uuid ?? null
             };
            if (excludeUuid) {
                whereCondition.itm_uuid = { [Op.ne]: excludeUuid };
            }
            const customer = await SequelizeCustomer.findOne({ 
                where: whereCondition
            });
            return customer;
        } catch (error: any) {
            console.error('Error en findCustomerByName:', error.message);
            throw error;
        }
    }
    
}