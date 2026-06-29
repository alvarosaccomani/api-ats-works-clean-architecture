import { Op } from "sequelize";
import { MenuEntity, MenuUpdateData } from "../../../domain/menu/menu.entity";
import { MenuRepository } from "../../../domain/menu/menu.repository";
import { SequelizeMenu } from "../../model/menu/menu.model";
import { SequelizePermission } from "../../model/permission/permission.model";
import { SequelizeRolPermission } from "../../model/rol-permission/rol-permission.model";
import { SequelizeRol } from "../../model/rol/rol.model";

const includePermissions = [
    {
        model: SequelizePermission,
        as: 'permission',
        include: [
            {
                model: SequelizeRolPermission,
                as: 'rolPermissions',
                include: [
                    {
                        model: SequelizeRol,
                        as: 'rol'
                    }
                ]
            }
        ]
    }
];

export class SequelizeRepository implements MenuRepository {
    async getMenus(mnu_title?: string, field_order?: string, mnu_orderby?: string): Promise<MenuEntity[] | null> {
        try {
            const where: any = {};
            if (mnu_title) {
                where.mnu_title = { [Op.iLike]: `%${mnu_title}%` };
            }
            const orderField = field_order || 'mnu_order';
            const orderDirection = mnu_orderby || 'ASC';
            return await SequelizeMenu.findAll({ 
                where,
                order: [[orderField, orderDirection]]
            });
        } catch (error: any) {
            console.error('Error en getMenus:', error.message);
            throw error;
        }
    }

    async findMenuById(mnu_uuid: string): Promise<MenuEntity | null> {
        try {
            return await SequelizeMenu.findByPk(mnu_uuid, {
                include: includePermissions
            });
        } catch (error: any) {
            console.error('Error en findMenuById:', error.message);
            throw error;
        }
    }

    async createMenu(menu: MenuEntity): Promise<MenuEntity | null> {
        try {
            const result = await SequelizeMenu.create(menu as any);
            if (!result) throw new Error(`No se pudo insertar el menú.`);
            return this.findMenuById(result.dataValues.mnu_uuid);
        } catch (error: any) {
            console.error('Error en createMenu:', error.message);
            throw error;
        }
    }

    async updateMenu(mnu_uuid: string, menu: MenuUpdateData): Promise<MenuEntity | null> {
        try {
            await SequelizeMenu.update(menu, { where: { mnu_uuid } });
            return this.findMenuById(mnu_uuid);
        } catch (error: any) {
            console.error('Error en updateMenu:', error.message);
            throw error;
        }
    }

    async deleteMenu(mnu_uuid: string): Promise<MenuEntity | null> {
        try {
            const menu = await this.findMenuById(mnu_uuid);
            await SequelizeMenu.destroy({ where: { mnu_uuid } });
            return menu;
        } catch (error: any) {
            console.error('Error en deleteMenu:', error.message);
            throw error;
        }
    }

    async findMenuByTitle(mnu_title: string): Promise<MenuEntity | null> {
        try {
            return await SequelizeMenu.findOne({ 
                where: { mnu_title }
            });
        } catch (error: any) {
            console.error('Error en findMenuByTitle:', error.message);
            throw error;
        }
    }

    async getMenuItems(): Promise<MenuEntity[] | null> {
        try {
            return await SequelizeMenu.findAll({ 
                where: { mnu_itemactive: true, mnu_active: true },
                order: [['mnu_order', 'ASC']],
                include: includePermissions
            });
        } catch (error: any) {
            console.error('Error en getMenuItems:', error.message);
            throw error;
        }
    }

    async getDashboardMenuItems(): Promise<MenuEntity[] | null> {
        try {
            return await SequelizeMenu.findAll({ 
                where: { mnu_showondashboard: true, mnu_active: true },
                order: [['mnu_order', 'ASC']],
                include: includePermissions
            });
        } catch (error: any) {
            console.error('Error en getDashboardMenuItems:', error.message);
            throw error;
        }
    }
}
