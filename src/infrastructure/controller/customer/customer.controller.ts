import { Request, Response } from "express";
import { CustomerUseCase } from "../../../application/customer/customer-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CustomerController {
    constructor(private customerUseCase: CustomerUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los customers.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const customers = await this.customerUseCase.getCustomers(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Customers retornados.',
                    ...paginator(customers, page, perPage)
                });
            } else {
                const customers = await this.customerUseCase.getCustomers(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Customers retornados.',
                    data: customers
                });
            }            
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los customers.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cus_uuid = req.params.cus_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el customer.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el customer.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            }
            const customer = await this.customerUseCase.getDetailCustomer(`${cmp_uuid}`,`${cus_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Customer retornado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el customer.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const cus_fullname = body.cus_fullname;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el customer.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cus_fullname) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el customer.',
                    error: 'Debe proporcionar un Nombre para el customer.'
                })
            };
            const customerByName = await this.customerUseCase.findCustomerByName(cmp_uuid, cus_fullname);
            if(customerByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el customer.',
                    error: `El nombre ${cus_fullname} de customer ya existe.`
                });
            }
            const customer = await this.customerUseCase.createCustomer(body)
            return res.status(200).json({
                success: true,
                message: 'Customer insertado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el customer.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cus_uuid = req.params.cus_uuid;
            const update = req.body;
            if(!update.cus_fullname) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el customer.',
                    error: 'Debe proporcionar un Nombre para el customer.'
                })
            };
            const customerByName = await this.customerUseCase.findCustomerByName(update.cmp_uuid, update.cus_fullname);
            if(customerByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el customer.',
                    error: `El nombre ${update.cus_fullname} de customer ya existe.`
                });
            }
            const customer = await this.customerUseCase.updateCustomer(cmp_uuid, cus_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Customer actualizado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el customer.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cus_uuid = req.params.cus_uuid;
            const cmp_uuid = req.params.cmp_uuid;
            if(!cus_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el customer.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!cus_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el customer.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            };
            const customer = await this.customerUseCase.deleteCustomer(cmp_uuid, cus_uuid)
            return res.status(200).json({
                success: true,
                message: 'Customer eliminada.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el customer.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}