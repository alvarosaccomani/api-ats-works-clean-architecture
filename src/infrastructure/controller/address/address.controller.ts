import { Request, Response } from "express";
import { AddressUseCase } from "../../../application/address/address-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class AddressController {
    constructor(private addressUseCase: AddressUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cus_uuid = req.params.cus_uuid; 
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los addresses.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los addresses.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            }
            if (page && perPage) {
                const address = await this.addressUseCase.getAddresses(cmp_uuid, cus_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Addresses retornados.',
                    ...paginator(address, page.toString(), perPage.toString())
                });
            } else {
                const address = await this.addressUseCase.getAddresses(cmp_uuid, cus_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Addresses retornados.',
                    data: address
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los addresses.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cus_uuid = req.params.cus_uuid;
            const adr_uuid = req.params.adr_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el address.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el address.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            }
            if(!adr_uuid || adr_uuid.toLowerCase() === 'null' || adr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el address.',
                    error: 'Debe proporcionar un Id de address.'
                });
            }
            const address = await this.addressUseCase.getDetailAddress(`${cmp_uuid}`,`${cus_uuid}`,`${adr_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Address retornado.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el address.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const cus_uuid = body.cus_uuid;
            const adr_address = body.adr_address;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el address.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el address.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            }
            if(!adr_address) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el address.',
                    error: 'Debe proporcionar un Nombre para el address.'
                })
            };
            // const addressByName = await this.addressUseCase.findAddressByName(cmp_uuid, cus_uuid, adr_address);
            // if(addressByName) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'No se pudo insertar el address.',
            //         error: `El nombre ${adr_address} de address ya existe.`
            //     });
            // }
            const address = await this.addressUseCase.createAddress(body)
            return res.status(200).json({
                success: true,
                message: 'Address insertado.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el address.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cus_uuid = req.params.cus_uuid;
            const adr_uuid = req.params.adr_uuid;
            const update = req.body;
            const address = await this.addressUseCase.updateAddress(cmp_uuid, cus_uuid, adr_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Address actualizado.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el address.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cus_uuid = req.params.cus_uuid;
            const adr_uuid = req.params.adr_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!cus_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            };
            if(!adr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de address.'
                });
            };
            const address = await this.addressUseCase.deleteAddress(cmp_uuid, cus_uuid, adr_uuid)
            return res.status(200).json({
                success: true,
                message: 'Address eliminada.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el address.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}