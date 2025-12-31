import { CustomerEntity, CustomerUpdateData } from "../../../domain/customer/customer.entity";
import { CustomerRepository } from "../../../domain/customer/customer.repository";
import { SequelizeCustomer } from "../../model/customer/customer.model";
import { Sequelize, Op } from "sequelize";
import { SequelizeRoute } from "../../model/route/route.model";
import { SequelizeAddress } from "../../model/address/address.model";

export class SequelizeRepository implements CustomerRepository {
    async getCustomers(cmp_uuid: string, cus_fullname: string | undefined, cus_email: string | undefined, field_order: string, cus_order: string): Promise<CustomerEntity[] | null> {
        try {
            // Base del where
            const where: any = {
                cmp_uuid: cmp_uuid
            };

            // Condiciones opcionales para OR
            const orConditions: any[] = [];
            if (cus_fullname) {
                orConditions.push({ cus_fullname: { [Op.iLike]: `%${cus_fullname}%` } });
            }

            if (cus_email) {
                orConditions.push({ cus_email: { [Op.iLike]: `%${cus_email}%` } });
            }

            // Si hay condiciones OR, las agregamos
            if (orConditions.length > 0) {
                where[Op.and] = {
                    [Op.or]: orConditions
                };
            }
            
            const customersDb = await SequelizeCustomer.findAll({
                where,
                attributes: {
                    include: [
                    [
                        Sequelize.fn(
                        'STRING_AGG',
                        Sequelize.fn(
                            'NULLIF',
                            Sequelize.fn(
                            'ARRAY_TO_STRING',
                            Sequelize.fn(
                                'ARRAY_REMOVE',
                                Sequelize.literal(`ARRAY[
                                NULLIF("adrs"."adr_address", ''),
                                NULLIF("adrs"."adr_city", ''),
                                NULLIF("adrs"."adr_province", ''),
                                NULLIF("adrs"."adr_postalcode", '')
                                ]::text[]`),
                                null
                            ),
                            ', '
                            ),
                            ''
                        ),
                        ' | '
                        ),
                        'cus_addresses'
                    ]
                    ]
                },
                include: [
                    {
                        as: 'rou',
                        model: SequelizeRoute,
                        attributes: ['rou_uuid', 'rou_name', 'rou_description']
                    },
                    {
                        as: 'adrs',
                        model: SequelizeAddress,
                        attributes: []
                    }
                ],
                group: [
                    'SequelizeCustomer.cmp_uuid',
                    'SequelizeCustomer.cus_uuid',
                    'SequelizeCustomer.cus_fullname',
                    'SequelizeCustomer.cus_email',
                    'SequelizeCustomer.cus_phone',
                    'SequelizeCustomer.cus_dateofbirth',
                    'SequelizeCustomer.rou_uuid',
                    'SequelizeCustomer.pmt_uuid',
                    'SequelizeCustomer.usr_uuid',
                    'SequelizeCustomer.cus_subscriptionplanbycustomer',
                    'SequelizeCustomer.subp_uuid',
                    'SequelizeCustomer.cus_active',
                    'SequelizeCustomer.cus_createdat',
                    'SequelizeCustomer.cus_updatedat',
                    'rou.cmp_uuid',
                    'rou.rou_uuid',
                    'rou.rou_name',
                    'rou.rou_description'
                ],
                order: [[Sequelize.col(field_order || 'cus_fullname'), cus_order || 'ASC']]
            });
            if(!customersDb) {
                throw new Error(`No hay customers`)
            };

            const customers: CustomerEntity[] = customersDb.map(customer => {
                const customerPlain = customer.get({ plain: true });

                return {
                    cmp_uuid: customerPlain.cmp_uuid,
                    cus_uuid: customerPlain.cus_uuid,
                    cus_fullname: customerPlain.cus_fullname,
                    cus_email: customerPlain.cus_email,
                    cus_phone: customerPlain.cus_phone,
                    cus_dateofbirth: customerPlain.cus_dateofbirth,
                    cus_addresses: customerPlain.cus_addresses ?? undefined, // importante: incluir addresses
                    rou_uuid: customerPlain.rou_uuid,
                    rou: customerPlain.rou,
                    pmt_uuid: customerPlain.pmt_uuid,
                    usr_uuid: customerPlain.usr_uuid,
                    cus_subscriptionplanbycustomer: customerPlain.cus_subscriptionplanbycustomer,
                    subp_uuid: customerPlain.subp_uuid,
                    subp: customerPlain.subp,
                    cus_active: customerPlain.cus_active,
                    cus_createdat: customerPlain.cus_createdat,
                    cus_updatedat: customerPlain.cus_updatedat
                };
            });
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
            let { cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, rou_uuid, pmt_uuid, usr_uuid, cus_subscriptionplanbycustomer, subp_uuid, cus_active, cus_createdat, cus_updatedat } = customer
            const result = await SequelizeCustomer.create({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, rou_uuid, pmt_uuid, usr_uuid, cus_subscriptionplanbycustomer, subp_uuid, cus_active, cus_createdat, cus_updatedat });
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
    async updateCustomer(cmp_uuid: string, cus_uuid: string, customer: CustomerUpdateData): Promise<CustomerEntity | null> {
        try {
            const [updatedCount, [UpdatedCustomer]] = await SequelizeCustomer.update(
                { 
                    cus_fullname: customer.cus_fullname,
                    cus_email: customer.cus_email,
                    cus_phone: customer.cus_phone,
                    cus_dateofbirth: customer.cus_dateofbirth,
                    rou_uuid: customer.rou_uuid,
                    pmt_uuid: customer.pmt_uuid,
                    usr_uuid: customer.usr_uuid,
                    cus_subscriptionplanbycustomer: customer.cus_subscriptionplanbycustomer,
                    subp_uuid: customer.subp_uuid,
                    cus_active: customer.cus_active,
                },
                { 
                    where: { cmp_uuid, cus_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el customer`);
            };
            return UpdatedCustomer.get({ plain: true }) as CustomerEntity;
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