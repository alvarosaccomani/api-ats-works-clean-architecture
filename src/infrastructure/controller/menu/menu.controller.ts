import { Request, Response } from "express";
import { MenuUseCase } from "../../../application/menu/menu-use-case";
import { paginator } from "../../services/paginator.service";
import { getStringFromQuery } from "../../utils/util";

export class MenuController {
    constructor(private menuUseCase: MenuUseCase) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getDetailCtrl = this.getDetailCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getMenuItemsCtrl = this.getMenuItemsCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { mnu_title, page, perPage, field_order, mnu_orderby } = req.query;
            const menus = await this.menuUseCase.getMenus(
                getStringFromQuery(mnu_title),
                getStringFromQuery(field_order),
                getStringFromQuery(mnu_orderby)
            );
            if (page && perPage) {
                res.status(200).send({
                    success: true,
                    message: 'Menús retornados.',
                    ...paginator(menus, page.toString(), perPage.toString())
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: 'Menús retornados.',
                    data: menus
                });
            }
        } catch (e: any) {
            console.error('Error en getAllCtrl (controller):', e.message);
            res.status(400).send({
                success: false,
                message: 'No se pudo recuperar los menús.',
                error: e.message
            });
        }
    }

    public async getDetailCtrl({ params }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.getDetailMenu(params.mnu_uuid);
            res.status(200).send({
                success: true,
                message: 'Menú retornado.',
                data
            });
        } catch (e: any) {
            console.error('Error en getDetailCtrl (controller):', e.message);
            res.status(400).send({
                success: false,
                message: 'No se pudo recuperar el menú.',
                error: e.message
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.createMenu(body);
            res.status(201).send({
                success: true,
                message: 'Menú insertado.',
                data
            });
        } catch (e: any) {
            console.error('Error en insertCtrl (controller):', e.message);
            res.status(400).send({
                success: false,
                message: 'No se pudo insertar el menú.',
                error: e.message
            });
        }
    }

    public async updateCtrl({ params, body }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.updateMenu(params.mnu_uuid, body);
            res.status(200).send({
                success: true,
                message: 'Menú actualizado.',
                data
            });
        } catch (e: any) {
            console.error('Error en updateCtrl (controller):', e.message);
            res.status(400).send({
                success: false,
                message: 'No se pudo actualizar el menú.',
                error: e.message
            });
        }
    }

    public async deleteCtrl({ params }: Request, res: Response) {
        try {
            const data = await this.menuUseCase.deleteMenu(params.mnu_uuid);
            res.status(200).send({
                success: true,
                message: 'Menú eliminado.',
                data
            });
        } catch (e: any) {
            console.error('Error en deleteCtrl (controller):', e.message);
            res.status(400).send({
                success: false,
                message: 'No se pudo eliminar el menú.',
                error: e.message
            });
        }
    }
    
    public async getMenuItemsCtrl(req: Request, res: Response) {
        try {
            const data = await this.menuUseCase.getMenuItems();
            res.status(200).send({
                success: true,
                message: 'Items de menú retornados (Árbol).',
                data
            });
        } catch (e: any) {
            console.error('Error en getMenuItemsCtrl (controller):', e.message);
            res.status(400).send({
                success: false,
                message: 'No se pudo recuperar el árbol de menús.',
                error: e.message
            });
        }
    }
}
